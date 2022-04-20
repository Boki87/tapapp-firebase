import {Link } from 'react-router-dom'
import { Box, Image } from "@chakra-ui/react";

export default function DeviceCard({ device }) {
  return (
    <Box
      w="full"
      maxW="sm"
      mx="auto"
      h="300px"
      rounded="xl"
      shadow="md"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mb="20px"
      cursor="pointer"
    >
      <Link 
        to={`d/${device.id}`}
        style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      >
      {/* <a href="#"> */}
        <Image
          src={device.device_type.image}
          minW="100%"
          minH="100%"
          objectFit="cover"
        />
      {/* </a> */}
      </Link>
    </Box>
  );
}
