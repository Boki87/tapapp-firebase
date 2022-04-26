import {useEffect, useState} from 'react'
import {Input,FormControl,FormLabel, Button, Box, Center, Spinner, Image, Avatar,Textarea, Spacer, Progress, useToast} from '@chakra-ui/react'
import {useParams, Link} from 'react-router-dom'
import { BurgerMenuBar, BurgerMenuButton } from "./BurgerMenu";
import { getDeviceData, getSocialsForDevice, updateDeviceData, uploadAvatar } from '../lib/firebase';
import {useAuthContext} from '../context'
import {BsUpload} from 'react-icons/bs'
import { useDebounce } from '../lib/hooks';
import ChakraColorPicker from './ChakraColorPicker';
import {compressImage} from '../lib/utils'


const EditDevice = () => {

    let toast = useToast()
    const {id} = useParams()
    const {user} = useAuthContext()
    const [deviceData, setDeviceData] = useState(null)
    const [socials, setSocials] = useState([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(true)

    const debounceName = useDebounce(deviceData?.name, 1000);
    const debounceTitle = useDebounce(deviceData?.title, 1000);
    const debounceDescription = useDebounce(deviceData?.description, 1000);

    const handleColorChange = (color) => {

        setDeviceData({...deviceData, bg_color: color})
        updateData(id, {...deviceData, bg_color: color})
    }


    async function fetchDeviceData() {
        try {
            setLoading(true)
            let deviceData = await getDeviceData(id)
            setDeviceData(deviceData)
            let socials = await getSocialsForDevice(id, user.uid)
            setSocials(socials)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

  

    function deviceDataPropChange(e) {
        setDeviceData({...deviceData, [e.target.name]: e.target.value})
    }


    async function updateData(id, data) {
        try {
            setUpdating(true)
            await updateDeviceData(id, data)
            setUpdating(false)
        } catch(err) {
            setUpdating(false)
            console.log(err);
        }
    }


    async function handleAvatarChange(e) {
        let avatar = e.target.files[0]
        if(!avatar) return

        try {
            setUpdating(true)

            let compressedAvatar = await compressImage(avatar)
            avatar = compressedAvatar

            let res = await uploadAvatar(avatar, id)
            updateData(id, {avatar: res})
            setDeviceData({...deviceData, avatar: res})

            setUpdating(false)
        } catch(err) {
            console.log(err);
            setUpdating(false)
            toast({
                title: 'Warning!',
                description: "Image format not supported",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    } 



    useEffect(() => {
        fetchDeviceData() 
    }, [id])

    useEffect(() => {
        // console.log(deviceData)
        updateData(id, deviceData)
    }, [debounceName, debounceTitle, debounceDescription])


    if(loading || !deviceData) {
        return (<Center position="absolute" top='0px' left='0px' zIndex={10} w="full" h="full" bg="white">
            <Box position="relative">
                <Spinner position="absolute" top="-20px" right="-10px"/>
                <Image w="200px" src="/assets/images/main-logo.png" h="auto" />
            </Box>
        </Center>)
    }


    return (
        <Box w="full" h="full" pt="10px" px="10px" pb="80px" overflow="auto">
            {updating && 
          <Progress size="xs" isIndeterminate position="absolute" top="0" left="0" w="full"/>
            }
            <Box display="flex" flexDirection="column" alignItems="center" w="full" justifyContent="center" bg={deviceData.bg_color ? deviceData.bg_color : 'blue.400'} py="20px" borderRadius="2xl" position="relative" mb="20px">
                <Box position="absolute" px="6px" pl="15px" top="5px" left="0" w="full" zIndex="2" display="flex" alignItems="center" color="gray.100">
                        <div>
                            <Link to='/'>
                                <Image src="/assets/images/main-logo-white.png" h="auto" w="90px" />
                            </Link>
                        </div>
                        <Spacer />
                        <BurgerMenuButton color="white"/>
                </Box>
                    <Avatar border="2px solid white" name={deviceData.name} src={deviceData.avatar} size="2xl" mb="10px"/>       
                    <Box>
                        <Button as="label" htmlFor="avatar_file" mr="10px" leftIcon={<BsUpload />}>Upload avatar</Button>
                        <input onChange={handleAvatarChange} type="file" id="avatar_file" name="avatar_file" style={{display: 'none'}}/>
                        <ChakraColorPicker value={deviceData.bg_color ? deviceData.bg_color : 'blue.500'} onChange={handleColorChange}/> 
                    </Box>
            </Box>

            <Box>
                <FormControl mb="20px">
                    <FormLabel htmlFor="name">Full Name</FormLabel>
                    <Input placeholder="Full Name" variant="filled" name="name" value={deviceData.name} onInput={deviceDataPropChange}/>
                </FormControl>
                <FormControl mb="20px">
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input placeholder="Title" variant="filled" name="title" value={deviceData.title} onInput={deviceDataPropChange}/>
                </FormControl>
                <FormControl mb="20px">
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea placeholder="description" variant="filled" name="description" value={deviceData.description} onInput={deviceDataPropChange}/>
                </FormControl>
            </Box>
        </Box>
    )
}

export default EditDevice