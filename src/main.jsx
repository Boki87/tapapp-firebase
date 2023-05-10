import React from "react";
import { Container } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import App from "./App";
import theme from "./lib/theme";
import Store from "./context";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <Store>
      <ChakraProvider theme={theme}>
        <Container
          h="full"
          maxW="2xl"
          position="relative"
          margin="0px auto"
          p="0px"
          overflowX={"hidden"}
        >
          <App />
        </Container>
      </ChakraProvider>
    </Store>
  </Router>
);
