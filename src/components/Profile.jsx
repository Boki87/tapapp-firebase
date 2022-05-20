import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Avatar,
  Center,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Progress,
  useToast,
  InputGroup,
  InputRightElement,

} from "@chakra-ui/react";
import { BurgerMenuBar } from "./BurgerMenu";
import AppLoading from "./AppLoading";
import { BsUpload } from "react-icons/bs";
import { getUserProfile, uploadProfileAvatar, updateUserProfile, updateUserPassword } from "../lib/firebase";
import { useAuthContext } from "../context";
import { compressImage } from "../lib/utils";

const Profile = () => {
  const toast = useToast()
  const [userProfileData, setUserProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");



  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordShowClick = () => setShowPassword(!showPassword);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const handleNewPasswordShowClick = () => setNewShowPassword(!showNewPassword);


  const { user } = useAuthContext();

  async function getUserProfileData() {
    try {
      const userProfile = await getUserProfile(user.uid);
      setUserProfileData(userProfile);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!user) return;
    getUserProfileData();
  }, [user]);

  function userProfileDataPropChange(e) {
    const { name, value } = e.target;
    setUserProfileData({ ...userProfileData, [name]: value });
  }

  async function handleAvatarChange(e) {
    let avatar = e.target.files[0];
    if (!avatar) return;

    try {
      setUpdating(true);

      let compressedAvatar = await compressImage(avatar);
      avatar = compressedAvatar;

      let avatarUrl = await uploadProfileAvatar(avatar, user.uid);
      setUserProfileData({ ...userProfileData, avatar: avatarUrl });
      await updateUserProfile(userProfileData.uid, {...userProfileData, avatar: avatarUrl});
      // updateData(id, { avatar: res });
      // setDeviceData({ ...deviceData, avatar: res });

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

  async function updateProfile() {
    try {
      setUpdating(true);

      console.log(userProfileData);
      if(newPassword != '' && currentPassword != '') {
        //update password
        await updateUserPassword(userProfileData.uid, userProfileData.email, currentPassword, newPassword);
      }

      await updateUserProfile(userProfileData.uid, userProfileData);

      toast({
        title: "Success!",
        description: "Profile updated successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      setUpdating(false);
    } catch(err) {
      setUpdating(false)
      toast({
        title: "Error!",
        description: "Wrong current password",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
      console.log(err);
    }

  }

  if (!userProfileData || loading) {
    return <AppLoading />;
  }

  return (
    <Box h="full" overflow="auto" pt="60px" bg="gray.50" pb="100px">
      <BurgerMenuBar />
      {updating && (
        <Progress
          size="xs"
          isIndeterminate
          w="full"
        />
      )}
      <Center mb="10px" bg="gray.200" py="20px">
        <Stack>
          <Avatar
            size="xl"
            src={userProfileData?.avatar}
            border="2px solid white"
            name={userProfileData?.name}
            mx="auto"
          />
          <Box>
            <Button
              as="label"
              htmlFor="avatar_file"
              colorScheme="blue"
              size="sm"
              leftIcon={<BsUpload />}
            >
              Upload avatar
            </Button>
            <input
              onChange={handleAvatarChange}
              type="file"
              id="avatar_file"
              name="avatar_file"
              style={{ display: "none" }}
            />
          </Box>
        </Stack>
      </Center>
      <Box p="20px">
        <FormLabel>Email:</FormLabel>
        <Text fontSize="lg" color="gray.600" mb="10px" fontWeight="bold">
          {userProfileData?.email}
        </Text>
        <hr />
        <FormControl mb="20px" mt="20px">
          <FormLabel htmlFor="name">Full Name</FormLabel>
          <Input
            placeholder="Full Name"
            variant="filled"
            name="name"
            defaultValue={userProfileData?.name}
            autoComplete="off"
            onInput={userProfileDataPropChange}
          />
        </FormControl>
        <FormControl mb="20px">
          <FormLabel htmlFor="name">Current Password</FormLabel>
          <InputGroup>
                <Input
                  placeholder="Current Password"
                  variant="filled"
                  name="curr_password"
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onInput={(e) => setCurrentPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem"> 
                    <Button h="1.75rem" size="sm" variant="outline" colorScheme="blue" onClick={handlePasswordShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl mb="20px">
          <FormLabel htmlFor="name">New Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="New Password"
              variant="filled"
              name="new_password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onInput={(e) => setNewPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem"> 
              <Button h="1.75rem" size="sm" variant="outline" colorScheme="blue" onClick={handleNewPasswordShowClick}>
                {showNewPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Center>
          <Button onClick={updateProfile} isLoading={updating} colorScheme="blue">
            Update
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default Profile;
