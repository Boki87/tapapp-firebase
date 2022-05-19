import { Box, Stack, Textarea, Text, Button } from "@chakra-ui/react";
import { BurgerMenuBar } from "./BurgerMenu";
import { BiMailSend } from "react-icons/bi";
import FooterSocials from "./FooterSocials";

const ContactUs = () => {
  return (
    <Box h="full" overflow="auto" pt="60px" bg="gray.50" px="20px" pb="100px">
      <BurgerMenuBar />
      <Box mb="50px">
        <Text fontSize="2xl" color="gray.700" fontWeight="bold" mb="10px">
          Contact us
        </Text>
        <Textarea placeholder="Message:" variant="filled" minH="300px" />
        <Button
          rightIcon={<BiMailSend />}
          colorScheme="blue"
          mt="20px"
          w="full"
        >
          Send
        </Button>
      </Box>
      <FooterSocials />
    </Box>
  );
};

export default ContactUs;
