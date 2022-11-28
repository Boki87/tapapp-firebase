import { useState } from "react";
import {
  Box,
  Stack,
  Textarea,
  Text,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { BurgerMenuBar } from "./BurgerMenu";
import { BiMailSend } from "react-icons/bi";
import FooterSocials from "./FooterSocials";

const contactUsApi =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:5001/tap-app-bc5ba/us-central1/sendMail"
    : "";

console.log(contactUsApi);

const ContactUs = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const message = e.target.elements.message.value;

    if (email === "" || message === "") {
      return toast({
        title: "Warning!",
        description: "Plesae provided an email and message",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    try {
      setLoading(true);
      const res = await fetch(contactUsApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      const resData = await res.json();
      console.log(resData);
      if (!resData.success) throw Error(resData.message);
      toast({
        title: "Success",
        description: "Your message has been sent 😀",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      e.target.elements.email.value = "";
      e.target.elements.message.value = "";
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <Box h="full" overflow="auto" pt="60px" bg="gray.50" px="20px" pb="100px">
      <BurgerMenuBar />
      <Box mb="50px">
        <Text fontSize="2xl" color="gray.700" fontWeight="bold" mb="10px">
          Contact us
        </Text>
        <form onSubmit={submitHandler}>
          <Input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Email:"
            variant="filled"
            mb="10px"
          />
          <Textarea
            required
            name="message"
            id="message"
            placeholder="Message:"
            variant="filled"
            minH="300px"
          />
          <Button
            isLoading={loading}
            rightIcon={<BiMailSend />}
            colorScheme="blue"
            mt="20px"
            w="full"
            type="submit"
          >
            Send
          </Button>
        </form>
      </Box>
      <FooterSocials />
    </Box>
  );
};

export default ContactUs;
