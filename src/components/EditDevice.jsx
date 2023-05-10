import { useEffect, useState } from "react";
import {
  HStack,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Box,
  Center,
  Spinner,
  Image,
  Avatar,
  Textarea,
  Spacer,
  Progress,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { BurgerMenuBar, BurgerMenuButton } from "./BurgerMenu";
import {
  getDeviceData,
  getSocialsForDevice,
  updateDeviceData,
  uploadImage,
  storage,
} from "../lib/firebase";
import { useAuthContext, useSocialsContext } from "../context";
import { BsUpload } from "react-icons/bs";
import { VscAdd } from "react-icons/vsc";
import { useDebounce } from "../lib/hooks";
import ChakraColorPicker from "./ChakraColorPicker";
import { compressImage } from "../lib/utils";
import SocialIconDrawer from "./SocialIconDrawer";
import SocialIconEditDrawer from "./SocialIconEditDrawer";
import SocialIcon from "./SocialIcon";
import VideoEmbedEdit from "./VideoEmbedEdit";
import logoSmall from "../assets/images/logo-small.png";
import AppLoading from "./AppLoading";
import { useUploadImages } from "../lib/hooks";
import { FaTrash, FaUpload } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";

const EditDevice = () => {
  let toast = useToast();
  const { id } = useParams();
  const { user } = useAuthContext();
  const { socials, setSocials, activeEditLink, setActiveEditLink } =
    useSocialsContext();
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(true);
  const [embeddedVideo, setEmbeddedVideo] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const { uploadImages, uploading, urls } = useUploadImages();

  async function handleFilesChange(e) {
    console.log(e.target.files);
    if (e.target.files.length === 0) return;
    const uploadedImages = await uploadImages(
      e.target.files,
      `gallery/${deviceData.id}`
    );
    let oldGallery = [];
    if (deviceData.gallery) {
      oldGallery = deviceData.gallery;
    }
    let newGallery = [...oldGallery, ...uploadedImages];

    setDeviceData((old) => {
      return {
        ...old,
        gallery: newGallery,
      };
    });

    updateData(deviceData.id, { gallery: newGallery });
  }

  async function deleteGalleryImageHandler(url) {
    let r = window.confirm("Sure you want to delete this image?");
    if (!r) return;
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
    setDeviceData((old) => {
      return {
        ...old,
        gallery: old.gallery.filter((img) => img !== url),
      };
    });
    updateData(deviceData.id, {
      gallery: deviceData.gallery.filter((img) => img !== url),
    });
  }

  useEffect(() => {
    if (activeEditLink) {
      setIsEditDrawerOpen(true);
    } else {
      setIsEditDrawerOpen(false);
    }
  }, [activeEditLink]);

  const debounceName = useDebounce(deviceData?.name, 1000);
  const debounceTitle = useDebounce(deviceData?.title, 1000);
  const debounceDescription = useDebounce(deviceData?.description, 1000);
  const debouncePhone = useDebounce(deviceData?.phone, 1000);
  const debounceEmail = useDebounce(deviceData?.email, 1000);
  const debounceWebsite = useDebounce(deviceData?.website, 1000);

  const handleColorChange = (color) => {
    setDeviceData({ ...deviceData, bg_color: color });
    updateData(id, { ...deviceData, bg_color: color });
  };

  async function fetchDeviceData() {
    try {
      setLoading(true);
      let deviceData = await getDeviceData(id);
      setDeviceData(deviceData);
      let socials = await getSocialsForDevice(id, user.uid);
      setSocials(socials);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  function deviceDataPropChange(e) {
    // console.log(e.target.value, e.target.name)
    setDeviceData({ ...deviceData, [e.target.name]: e.target.value });
  }

  async function updateData(id, data) {
    try {
      setUpdating(true);
      await updateDeviceData(id, data);
      setUpdating(false);
    } catch (err) {
      setUpdating(false);
      console.log(err);
    }
  }

  async function handleAvatarChange(e) {
    let avatar = e.target.files[0];
    if (!avatar) return;

    try {
      setUpdating(true);

      let compressedAvatar = await compressImage(avatar);
      avatar = compressedAvatar;

      let res = await uploadImage("avatars", avatar, id);
      updateData(id, { avatar: res });
      setDeviceData({ ...deviceData, avatar: res });

      setUpdating(false);
    } catch (err) {
      console.log(err);
      setUpdating(false);
      toast({
        title: "Warning!",
        description: "Image format not supported",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  function handleBgChange(bg) {
    // console.log(bg)
    setDeviceData({ ...deviceData, bg_image: bg });
  }

  useEffect(() => {
    fetchDeviceData();
  }, [id]);

  useEffect(() => {
    // console.log(deviceData)
    updateData(id, deviceData);
  }, [
    debounceName,
    debounceTitle,
    debounceDescription,
    debouncePhone,
    debounceEmail,
    debounceWebsite,
  ]);

  useEffect(() => {
    //get embedded video
    let video = socials.find((s) => s.provider === "video");
    if (socials.length > 0 && video) {
      setEmbeddedVideo(video);
    } else {
      setEmbeddedVideo(null);
    }
  }, [socials]);

  let showExplainer = false;
  if (socials.length > 0 && !embeddedVideo) {
    showExplainer = true;
  } else if (socials.length == 1 && embeddedVideo) {
    showExplainer = false;
  } else if (socials.length > 0 && !embeddedVideo) {
    showExplainer = true;
  } else if (socials.length > 0 && embeddedVideo) {
    showExplainer = true;
  }

  if (loading || !deviceData) {
    return <AppLoading />;
  }

  return (
    <Box w="full" h="full" pt="10px" px="10px" pb="80px" overflow="auto">
      {updating && (
        <Progress
          size="xs"
          isIndeterminate
          position="absolute"
          top="0"
          left="0"
          w="full"
        />
      )}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        w="full"
        justifyContent="center"
        bg={deviceData.bg_color ? deviceData.bg_color : "blue.400"}
        py="20px"
        borderRadius="2xl"
        position="relative"
        mb="20px"
      >
        {deviceData?.bg_image != "" && (
          <Box
            position="absolute"
            left="0px"
            top="0px"
            w="full"
            h="full"
            borderRadius="2xl"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={deviceData.bg_image}
              minW="100%"
              minH="100%"
              objectFit="cover"
            />
          </Box>
        )}

        <Box
          position="absolute"
          px="6px"
          pl="10px"
          top="10px"
          left="0"
          w="full"
          zIndex="2"
          display="flex"
          alignItems="center"
          color="blackAlpha.800"
        >
          <div>
            <Link to="/">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="50px"
                w="50px"
                borderRadius="8px"
                bgGradient="linear(to-r,teal.400, green.200)"
              >
                <Image src={logoSmall} h="45px" />
              </Box>
              {/* <Image
                src="/assets/images/main-logo-white.png"
                h="auto"
                w="90px"
              /> */}
            </Link>
          </div>
          <Spacer />
          <BurgerMenuButton color="blackAlpha.700" />
        </Box>
        <Avatar
          border="2px solid white"
          name={deviceData.name}
          src={deviceData.avatar}
          size="2xl"
          mb="10px"
        />
        <Box>
          <Button
            as="label"
            htmlFor="avatar_file"
            mr="10px"
            leftIcon={<BsUpload />}
          >
            Upload logo
          </Button>
          <input
            onChange={handleAvatarChange}
            type="file"
            id="avatar_file"
            name="avatar_file"
            style={{ display: "none" }}
          />
          <ChakraColorPicker
            value={deviceData.bg_color ? deviceData.bg_color : "blue.500"}
            id={id}
            onChange={handleColorChange}
            onBgChange={handleBgChange}
          />
        </Box>
      </Box>

      <Box>
        {/* <FormControl mb="20px">
          <FormLabel htmlFor="name">Welcome Title</FormLabel>
          <Input
            placeholder="Full Name"
            variant="filled"
            name="name"
            value={deviceData.name}
            onInput={deviceDataPropChange}
          />
        </FormControl> */}
        <FormControl mb="20px">
          <FormLabel htmlFor="title">Welcome Title</FormLabel>
          <Input
            placeholder="Title"
            variant="filled"
            name="title"
            value={deviceData.title}
            onInput={deviceDataPropChange}
          />
        </FormControl>
        <FormControl mb="20px">
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            placeholder="description"
            variant="filled"
            name="description"
            value={deviceData.description}
            onInput={deviceDataPropChange}
          />
        </FormControl>
        <FormControl mb="20px">
          <FormLabel htmlFor="title">Tel</FormLabel>
          <Input
            placeholder="Telephone"
            variant="filled"
            name="phone"
            value={deviceData.phone}
            onInput={deviceDataPropChange}
          />
        </FormControl>
        <FormControl mb="20px">
          <FormLabel htmlFor="title">Email</FormLabel>
          <Input
            placeholder="Email"
            variant="filled"
            name="email"
            value={deviceData.email}
            onInput={deviceDataPropChange}
          />
        </FormControl>
        <FormControl mb="20px">
          <FormLabel htmlFor="title">Website</FormLabel>
          <Input
            placeholder="Website"
            variant="filled"
            name="website"
            value={deviceData.website}
            onInput={deviceDataPropChange}
          />
        </FormControl>
      </Box>

      <Center mb="30px">
        <Link to={`/d/${deviceData.id}`}>
          <Button
            bg="gray.800"
            color="white"
            _hover={{ bg: "gray.700" }}
            _active={{ bg: "gray.900" }}
          >
            Save & View
          </Button>
        </Link>
      </Center>

      {deviceData.gallery && deviceData.gallery.length && (
        <HStack
          border="1px"
          borderColor="blue.500"
          w="full"
          h="220px"
          mb="10px"
          p="5px"
          borderRadius="lg"
          overflowY="auto"
        >
          {deviceData.gallery.map((img) => (
            <Box
              minW="90%"
              h="full"
              bg="gray.200"
              mr="5px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
              borderRadius="lg"
              key={img}
              position="relative"
            >
              <Button
                position="absolute"
                top="3px"
                right="5px"
                size="sm"
                colorScheme="red"
                onClick={() => deleteGalleryImageHandler(img)}
              >
                <FaTrash />
              </Button>
              <img
                src={img}
                style={{
                  minWidth: "100%",
                  minHeight: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </HStack>
      )}

      <Button
        as="label"
        isLoading={uploading}
        htmlFor="multi-image-upload"
        rightIcon={<FaUpload />}
        w="full"
        mb="20px"
      >
        Upload Images
      </Button>
      <Input
        id="multi-image-upload"
        type="file"
        multiple
        display="none"
        onChange={handleFilesChange}
      />

      {embeddedVideo && <VideoEmbedEdit videoData={embeddedVideo} />}
      {showExplainer && (
        <Center>
          <Text color="gray.600">Tap on any icon below to edit</Text>
        </Center>
      )}
      <Box display="flex" flexWrap="wrap" justifyContent="center" pb="30px">
        {socials.map((social, index) => {
          if (social.provider != "video") {
            return (
              <SocialIcon
                social={social}
                onClick={() => setActiveEditLink(social.id)}
                editMode={true}
                key={social.id}
              />
            );
          }
        })}
      </Box>

      <Center>
        <Button
          rightIcon={<VscAdd />}
          onClick={() => setIsDrawerOpen(true)}
          colorScheme="blue"
          color="white"
        >
          Add Social
        </Button>
      </Center>
      <SocialIconDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        deviceId={id}
      />

      <SocialIconEditDrawer
        isOpen={isEditDrawerOpen}
        onClose={() => setActiveEditLink(null)}
        editSocialId={activeEditLink}
      />
    </Box>
  );
};

export default EditDevice;
