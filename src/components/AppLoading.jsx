import { Center, Box, Spinner, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import newLogo from "../assets/images/new-logo.png";
import bottomImage from "../assets/images/loading-bottom-image.svg";

const AppLoading = () => {
  const bounceValues = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeOut",
  };

  return (
    // <Center
    //   position="absolute"
    //   top="0px"
    //   left="0px"
    //   zIndex={10}
    //   w="full"
    //   h="full"
    //   bg="white"
    // >
    //   <Box position="relative">
    //     <Spinner position="absolute" top="-20px" right="-10px" />
    //     <Image w="200px" src="/assets/images/main-logo.png" h="auto" />
    //   </Box>
    // </Center>

    // <Box
    //   position="absolute"
    //   top="0px"
    //   left="0px"
    //   zIndex={10}
    //   w="full"
    //   h="full"
    //   bgGradient="linear(to-br, blue.300, green.300)"
    //   display="flex"
    //   flexDir="column"
    //   justifyContent="flex-end"
    // >
    //   <Box>
    //     <motion.Center
    //       transition={{ y: bounceValues }}
    //       animate={{ y: ["15px", "-18px"] }}
    //     >
    //       <Image src={newLogo} maxW="300px" w="90%" />
    //     </motion.Center>
    //     <Center mt="40px">
    //       <Image src={bottomImage} w="100%" />
    //     </Center>
    //   </Box>
    // </Box>
    <Center
      position="absolute"
      top="0px"
      left="0px"
      zIndex={10}
      w="full"
      h="full"
      bg="black"
    >
      <Box position="relative">
        <Image w="230px" src={newLogo} h="auto" />
      </Box>
    </Center>
  );
};

export default AppLoading;
