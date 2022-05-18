import { Box } from "@chakra-ui/react";
import { BurgerMenuBar } from "./BurgerMenu";

const Profile = () => {
  return (
    <Box h="full" overflow="auto" pt="60px" bg="gray.50" px="20px" pb="100px">
      <BurgerMenuBar />
      Profile
    </Box>
  );
};

export default Profile;
