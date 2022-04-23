import {useEffect, useState} from 'react'
import {Input,FormControl,FormLabel, Button, Box, Center, Spinner, Image, Avatar,Textarea} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'
import { BurgerMenuBar } from "./BurgerMenu";
import { getDeviceData, getSocialsForDevice, updateDeviceData } from '../lib/firebase';
import {useAuthContext} from '../context'
import {BsUpload} from 'react-icons/bs'
import { useDebounce } from '../lib/hooks';


const EditDevice = () => {

    const {id} = useParams()
    const {user} = useAuthContext()
    const [deviceData, setDeviceData] = useState(null)
    const [socials, setSocials] = useState([])
    const [loading, setLoading] = useState(true)

    const debounceName = useDebounce(deviceData?.name, 1000);
    const debounceTitle = useDebounce(deviceData?.title, 1000);
    const debounceDescription = useDebounce(deviceData?.description, 1000);

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
        await updateDeviceData(id, data)
    }

    useEffect(() => {
        fetchDeviceData() 
    }, [id])

    useEffect(() => {
        console.log(deviceData)
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
        <Box w="full" h="full" pt="60px" pb="80px" overflow="auto">
            <BurgerMenuBar />

            <Box display="flex" alignItems="center" w="full" justifyContent="center" bg="blue.400" py="20px" borderBottomRadius="xl">
                <Avatar border="2px solid white" name={deviceData.name} src={deviceData.avatar} size="2xl" mr="10px"/>       
                <Box>
                    <Button as="label" htmlFor="avatar_file" leftIcon={<BsUpload />}>Upload avatar</Button>
                    <input type="file" id="avatar_file" name="avatar_file" style={{display: 'none'}}/>
                </Box>
            </Box>

            <Box p="20px">
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