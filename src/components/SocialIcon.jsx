import { Box, Center, Image, Text } from "@chakra-ui/react";
import { getLogoForSocialMedia, getLinkForSocialMedia } from "../lib/utils";

const SocialIcon = ({ social, onClick, editMode }) => {
  let imageSrc = getLogoForSocialMedia(social.provider);
  let link = getLinkForSocialMedia(social.type, social.provider, social.url);

  let image = (
    <Image
      src={imageSrc}
      objectFit="contain"
      w="100%"
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    />
  );

  function openLink() {
    if (onClick) {
      onClick();
    } else {
      window.open(link, "_blank");
    }
  }

  if (!editMode && !social.is_public) {
    return null;
  }

  return (
    <Box
      onClick={openLink}
      minW="110px"
      w="110px "
      minH="110px"
      h="110px"
      margin="15px"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="20px"
      overflow="hidden"
      shadow="lg"
    >
      {!social.is_public && editMode && (
        <Box
          position="absolute"
          w="100%"
          h="100%"
          bg="gray.400"
          borderRadius="20px"
          opacity={0.8}
        ></Box>
      )}
      {image}
      {social.name !== "" && (
        <Center
          minH="25px"
          w="100%"
          position="absolute"
          bottom="0px"
          left="0px"
          bg="whiteAlpha.800"
        >
          <Text textAlign="center" fontSize="sm" fontWeight="bolder">
            {social.name}
          </Text>
        </Center>
      )}
    </Box>
  );
};

export default SocialIcon;
