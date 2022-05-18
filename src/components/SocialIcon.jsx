import { Box, Image } from "@chakra-ui/react";
import { getLogoForSocialMedia, getLinkForSocialMedia } from "../lib/utils";

const SocialIcon = ({ social, onClick, editMode }) => {
  let imageSrc = getLogoForSocialMedia(social.provider);
  let link = getLinkForSocialMedia(social.type, social.provider, social.url);

  let image = <Image src={imageSrc} objectFit="contain" w="100%" h="100%" />;

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
      minW="80px"
      w="80px"
      minH="80px"
      h="80px"
      margin="15px"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
      shadow="lg"
      position="relative"
    >
      {!social.is_public && editMode && (
        <Box
          position="absolute"
          w="100%"
          borderRadius="full"
          h="100%"
          bg="gray.400"
          opacity={0.8}
        ></Box>
      )}
      {image}
    </Box>
  );
};

export default SocialIcon;
