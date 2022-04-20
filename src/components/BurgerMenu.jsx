import { useState } from "react";
import { Button, Box, Image } from "@chakra-ui/react";
import { CgMenuRight, CgClose } from "react-icons/cg";
import { useMainMenuContext } from "../context";
import { useAuthContext } from "../context";
import { useNavigate } from "react-router-dom";

export const BurgerMenuButton = () => {
  const { toggleMainMenu } = useMainMenuContext();
  return (
    <Button
      onClick={toggleMainMenu}
      size="xl"
      padding="10px"
      rounded="full"
      variant="ghost"
      fontSize="xl"
    >
      <CgMenuRight />
    </Button>
  );
};

export const BurgerMenuBar = ({ children }) => {
  const { toggleMainMenu } = useMainMenuContext();
  return (
    <Box
      minH="50px"
      w="full"
      position="absolute"
      top="0"
      left="0"
      css={{
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.7)",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        h="50px"
        px="10px"
      >
        <Image src="/assets/images/main-logo.png" h="auto" w="90px" />

        <Button
          onClick={toggleMainMenu}
          size="xl"
          padding="10px"
          rounded="full"
          variant="ghost"
          fontSize="xl"
        >
          <CgMenuRight />
        </Button>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default function BurgerMenu() {
  //const [showMenu, setShowMenu] = useState(false);
  let navigate = useNavigate()
  const { logOut, user } = useAuthContext();
  const { showMainMenu, toggleMainMenu } = useMainMenuContext();

  function logOutHandler() {
    logOut();
    toggleMainMenu();
  }

  function signInHandler() {
    navigate("/login");
    toggleMainMenu();
  }

  return (
    <>
      {showMainMenu && (
        <Box
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="full"
          bg="white"
          zIndex="9"
        >
          <Box
            h="50px"
            px="10px"
            w="full"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              onClick={toggleMainMenu}
              size="xl"
              padding="10px"
              rounded="full"
              variant="ghost"
              fontSize="xl"
            >
              <CgClose />
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            bottom="10px"
            left="0"
            w="full"
          >
            {user ? (
              <Button onClick={logOutHandler} colorScheme="blue">
                Log Out
              </Button>
            ) : (
              <Button onClick={signInHandler}>Sign In</Button>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
