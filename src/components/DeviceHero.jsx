import {Image, Box, Avatar, Text, Spacer, keyframes } from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import { BurgerMenuButton } from './BurgerMenu'

const animationKeyframes = keyframes`
    0% {transform: translateY(30px); opacity: 0; scale: 0.8}
    50% {transform: translateY(-10px); opacity: 1; scale: 1.1}
    100% {transform: translateY(0px); opacity: 1; scale: 1}
`
const avatarAnimation = `${animationKeyframes} 1s ease-in-out`

const DeviceHero = ({device}) => {

    return (
        <Box p="2">
            <Box position="relative">
                <Box position="absolute" px="6px" top="5px" left="0" w="full" zIndex="2" display="flex" alignItems="center" color="gray.100">
                        <div>
                            <Link to='/'>
                                <Image src="/assets/images/main-logo-white.png" h="auto" w="90px" />
                            </Link>
                        </div>
                        <Spacer />
                        <BurgerMenuButton color="white"/>
                </Box>

                <Box w="full" h="200px" bg="blue.500" borderRadius="3xl" position="relative">

                    <Box position="absolute" bottom="0" left="0" w="full" display="flex" justifyContent="center">
                            <Avatar animation={avatarAnimation} name={device.name} src={device.avatar} w="150px" h="150px" mb="-30px" border="3px solid white" shadow="md" />
                    </Box> 
                </Box>
                <Box pt="40px" textAlign="center" mb="15px">
                    <Text fontSize="2xl" fontWeight="bold" color="gray.700">{device.name}</Text>
                    <Text color="gray.600" fontSize="sm" mb="10px">{device.title}</Text>
                    <Text color="gray.600" fontSize="md">{device.description}</Text>
                </Box>
            </Box>
        </Box>
    )
}

export default DeviceHero