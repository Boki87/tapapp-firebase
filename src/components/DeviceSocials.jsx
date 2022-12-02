import { Box } from "@chakra-ui/react";
import SocialIcon from "./SocialIcon";
import { sanitizeVideo } from "../lib/utils";

const DeviceSocials = ({ socials }) => {
  socials.sort((a, b) => {
    return a.order - b.order;
  });

  return (
    <Box mb="30px">
      {socials.map((social) => {
        if (social.is_public && social.type == "video") {
          return (
            <Box key={social.id} p="10px" maxW="md" mx="auto">
              <iframe
                src={sanitizeVideo(social.url)}
                style={{ width: "100%", height: "200px", borderRadius: "10px" }}
              />
            </Box>
          );
        }
      })}

      <Box
        mb="10px"
        w="full"
        p="10px"
        maxW="md"
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        mx="auto"
      >
        {socials.map((social) => {
          if (social.type != "video") {
            return <SocialIcon key={social.id} social={social} />;
          }
        })}
      </Box>
    </Box>
  );
};

export default DeviceSocials;
