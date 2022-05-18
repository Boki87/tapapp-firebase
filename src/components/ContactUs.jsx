import { Box } from "@chakra-ui/react";
import { BurgerMenuBar } from "./BurgerMenu";
const ContactUs = () => {
  return (
    <Box h="full" overflow="auto" pt="60px" bg="gray.50" px="20px" pb="100px">
      <BurgerMenuBar />
      Contact Us
    </Box>
  );
};

export default ContactUs;
