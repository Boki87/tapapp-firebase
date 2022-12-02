import { Image, Box, Avatar, Text, Spacer, keyframes } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BurgerMenuButton } from "./BurgerMenu";
import { useAuthContext } from "../context";
import { FiEdit } from "react-icons/fi";
import logoSmall from "../assets/images/logo-small.png";

const animationKeyframes = keyframes`
    0% {transform: translateY(30px); opacity: 0; scale: 0.8}
    50% {transform: translateY(-10px); opacity: 1; scale: 1.1}
    100% {transform: translateY(0px); opacity: 1; scale: 1}
`;
const avatarAnimation = `${animationKeyframes} 1s ease-in-out`;

const DeviceHero = ({ device }) => {
  const { user } = useAuthContext();

  return (
    <Box>
      <Box position="relative">
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
          color="gray.100"
        >
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
            {/* <Image src="/assets/images/main-logo-white.png" h="auto" w="110px" /> */}
            {/* <Text fontSize="2xl" fontWeight="bold">SmartBox</Text> */}
          </Link>
          <Spacer />
          <BurgerMenuButton color="blackAlpha.700" />
        </Box>

        <Box
          w="full"
          h="220px"
          bg={device.bg_color}
          borderBottomRadius="3xl"
          position="relative"
        >
          {device?.bg_image != "" && (
            <Box
              position="absolute"
              left="0px"
              top="0px"
              w="full"
              h="full"
              borderBottomRadius="3xl"
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={device.bg_image}
                minW="100%"
                minH="100%"
                objectFit="cover"
              />
            </Box>
          )}

          <Box
            position="absolute"
            bottom="0"
            left="0"
            w="full"
            display="flex"
            justifyContent="center"
          >
            <Avatar
              animation={avatarAnimation}
              name={device.name}
              src={device.avatar}
              w="150px"
              h="150px"
              mb="-30px"
              border="3px solid white"
              shadow="md"
            />
          </Box>

          {user && user.uid == device.user_id && (
            <Box
              position="absolute"
              bottom="10px"
              right="15px"
              color="white"
              fontSize="xl"
            >
              <Link to={`/edit/${device.id}`} style={{ cursor: "pointer" }}>
                <FiEdit />
              </Link>
            </Box>
          )}
        </Box>
        <Box pt="40px" px="30px" textAlign="center" mb="15px">
          {/* <Text fontSize="2xl" color="gray.700">
            {device.name}
          </Text> */}
          <Text color="gray.800" fontSize="4xl" fontWeight="bolder" mb="0px">
            {device.title}
          </Text>
          <Text color="gray.700" fontSize="2xl">
            {device.description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default DeviceHero;
