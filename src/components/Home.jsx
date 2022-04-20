import {useEffect} from 'react'
import {Box, Button, Skeleton, Text} from '@chakra-ui/react'
import {useDevicesContext, useAuthContext} from '../context'
import { BurgerMenuBar } from "./BurgerMenu";
import DeviceCard from "../components/DeviceCard";

const Home = () => {

    const {user} = useAuthContext()
    const {devices, loadingDevices, devicesError, getDevices} = useDevicesContext()

    useEffect(() => {
      if(devices.length == 0 && user.uid)  {
        getDevices(user.uid)
      }
    }, [user.uid])


    return (<Box h="full" overflow="auto" pt="140px" bg="gray.50" px="20px" pb="100px">
    <BurgerMenuBar>
      <Text
        as="h1"
        fontWeight="bold"
        fontSize="2xl"
        textAlign="center"
        color="gray.600"
        mb="10px"
      >
        Your Devices
      </Text>
    </BurgerMenuBar>
    {!devicesError && <Box>
      {loadingDevices &&
        Array.from(Array(2).keys()).map((i) => (
          <Skeleton
            w="full"
            maxW="md"
            h="300px"
            rounded="xl"
            mx="auto"
            mb="20px"
            key={i}
          />
        ))}
      {!loadingDevices && devices.length > 0 ? (
        devices.map((device) => (
          <DeviceCard device={device} key={device.id} />
        ))
      ) : (
        <Text fontSize="md" color="gray.400" textAlign="center">
          No devices yet
        </Text>
      )}
    </Box>}

    {devicesError && <Text fontSize="md" color="red.500" textAlign="center">
        Error fetching devices
        </Text>}
  </Box>)
}
export default Home