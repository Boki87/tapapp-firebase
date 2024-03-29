import {
  Box,
  HStack,
  Text,
  Button,
  ButtonGroup,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { getLinkForSocialMedia } from "../lib/utils";
import VCard from "vcard-creator";

const DeviceCTA = ({ deviceData, socialsData }) => {
  function saveToContacts() {
    console.log("save to contacts");
    // console.log(deviceData);
    // console.log(socialsData);

    const myVCard = new VCard();
    let name = deviceData.name;
    let additionalInfo = deviceData.title;
    myVCard.addName(name, "", additionalInfo);

    if (deviceData.avatar != "") {
      myVCard.addPhotoURL(deviceData.avatar);
    }

    if (deviceData.phone !== "") {
      myVCard.addPhoneNumber(deviceData.phone);
    }
    if (deviceData.email !== "") {
      myVCard.addEmail(deviceData.email);
    }

    // socialsData.forEach(social => {
    //     if(social.type == 'social' && social.is_public) {
    //         let url = getLinkForSocialMedia(social.type, social.provider, social.url)
    //         myVCard.addURL(url)
    //     }

    //     if(social.type != 'social') {
    //         if(social.provider == 'email') {
    //             myVCard.addEmail(social.url)
    //         }
    //         if(social.provider == 'website') {
    //             myVCard.addURL(social.url)
    //         }
    //         if(social.provider == 'phone') {
    //             myVCard.addPhoneNumber(social.url)
    //         }
    //     }
    // })

    const blob = new Blob([myVCard.toString()], { type: "text/vcard" });
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = "vcard.vcf";
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);

    // console.log(myVCard.toString())
  }

  async function shareProfile() {
    //TODO: add share profile
  }

  return (
    // <HStack justifyContent="center" mb="10px">
    //     <ButtonGroup isAttached colorScheme={deviceData.bg_color ? deviceData.bg_color.split('.')[0] : 'blue'}>
    //         <Button onClick={saveToContacts} mr='-px' w="200px">Connect</Button>
    //         <IconButton onClick={shareProfile} borderLeft="1px solid white" aria-label='Add to friends' fontSize="xl" w="50px" icon={<BiMailSend />} />
    //     </ButtonGroup>
    // </HStack>
    <VStack px="20px">
      <Button
        bg="gray.800"
        color="white"
        _hover={{ bg: "gray.700" }}
        _active={{ bg: "gray.900" }}
        onClick={saveToContacts}
        w="full"
        mb="10px"
      >
        CONNECT
      </Button>

      {deviceData.email !== "" ? (
        <HStack w="full" bg="gray.100" borderRadius="10px" pl="10px">
          <Text flex={1}>{deviceData.email}</Text>
          <a href={"mailto:" + deviceData.email}>
            <Button
              bg="gray.800"
              color="white"
              _hover={{ bg: "gray.700" }}
              _active={{ bg: "gray.900" }}
            >
              <BiMailSend />
            </Button>
          </a>
        </HStack>
      ) : null}

      {deviceData.phone !== "" ? (
        <HStack w="full" bg="gray.100" borderRadius="10px" pl="10px">
          <Text flex={1}>{deviceData.phone}</Text>
          <a href={"tel:" + deviceData.phone}>
            <Button
              bg="gray.800"
              color="white"
              _hover={{ bg: "gray.700" }}
              _active={{ bg: "gray.900" }}
            >
              <BiPhoneCall />
            </Button>
          </a>
        </HStack>
      ) : null}

      {deviceData.whatsapp !== "" ? (
        <HStack w="full" bg="gray.100" borderRadius="10px" pl="10px">
          <Text flex={1}>{deviceData.whatsapp}</Text>
          <a
            href={`https://api.whatsapp.com/send?phone=${deviceData.whatsapp}`}
          >
            <Button
              bg="green.400"
              color="white"
              _hover={{ bg: "green.500" }}
              _active={{ bg: "green.600" }}
            >
              <BsWhatsapp />
            </Button>
          </a>
        </HStack>
      ) : null}

      {deviceData.viber !== "" ? (
        <HStack w="full" bg="gray.100" borderRadius="10px" pl="10px">
          <Text flex={1}>{deviceData.viber}</Text>
          <a href={`viber://add?number=${deviceData.viber}`}>
            <Button
              bg="purple.400"
              color="white"
              _hover={{ bg: "purple.500" }}
              _active={{ bg: "purple.600" }}
            >
              <BsWhatsapp />
            </Button>
          </a>
        </HStack>
      ) : null}
    </VStack>
  );
};

export default DeviceCTA;
