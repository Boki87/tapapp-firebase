import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {isDeviceRegistered} from '../lib/firebase'
import { Box, useToast, Center, Image, Spinner} from '@chakra-ui/react'
import { useDevicesContext } from '../context'
import { BsCloudFogFill } from 'react-icons/bs'


const Device = () => {

    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    const {id} = useParams()
    const toast = useToast()
    const {checkIfDeviceIsRegistered} = useDevicesContext()

    async function int() {

        try {
            setLoading(true)
            let isRegistered = await checkIfDeviceIsRegistered(id)
            if(isRegistered) {
                console.log('fetch device data');
            }
            setLoading(false)
        } catch(err) {
            console.log(err);
            setLoading(false)
        }
    }

    useEffect(() => {
        int()
    }, [])

    if(loading) {
        return (<Center position="absolute" top='0px' left='0px' zIndex={10} w="full" h="full" bg="white">
            <Box position="relative">
                <Spinner position="absolute" top="-20px" right="-10px"/>
                <Image w="200px" src="/assets/images/main-logo.png" h="auto" />
            </Box>
        </Center>)
    }

    return (<div>
        Device {id}
    </div>)
}


export default Device