import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Login from "./Login";
import Register from "./Register";
import Device from "./Device";
import BurgerMenu from "./BurgerMenu";
import FAQ from "./FAQ";
import TermsAndConditions from "./TermsAndConditions";
import ContactUs from "./ContactUs";

const Auth = () => {
  return (
    <Box w="full" h="full" overflow="hidden">
      <BurgerMenu />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup/:id" element={<Register />} />
        <Route path="/d/:id" element={<Device />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
};

export default Auth;
