import { useState, useContext, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth, isDeviceRegistered} from '../lib/firebase'
import { getDevicesForUser } from '../lib/firebase'
import {useAuthContext} from './user'
import { useNavigate } from "react-router-dom";

const DevicesContext = createContext({devices: []});

export const useDevicesContext = () => useContext(DevicesContext);

const DevicesContextProvider = ({ children }) => {

    let navigate = useNavigate() 
    let {user} = useAuthContext()
    const [devices, setDevices] = useState([]);
    const [loadingDevices, setLoadingDevices] = useState(true)
    const [devicesError, setDevicesError] = useState(false)

    async function getDevices(userId) {
        try {
            // console.log('get devices')
            setDevicesError(false)
            setLoadingDevices(true)
            let devices = await getDevicesForUser(userId)
            setDevices(devices)
            setLoadingDevices(false)
        } catch(err) {
            console.log(err)
            setLoadingDevices(false)
            setDevicesError(true)
        }
    }    


    async function checkIfDeviceIsRegistered(id) {
        try {
            let isRegistered = await isDeviceRegistered(id)
            if(!isRegistered) {
                navigate(`/signup/${id}`)
            }else {
                return true
            }
        } catch (err) {
            console.log(err)
            navigate('/')
            // toast({
            //     title: 'Error!',
            //     description: "Device not found",
            //     status: 'error',
            //     duration: 9000,
            //     isClosable: true,
            //   })
        }
    }


    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
        if(currUser && currUser.uid) {
            //get devices for user
            // console.log('device context auth change, get devices', currUser.uid)
            await getDevices(currUser.uid)
        }
      });
  
      return unsubscribe 
    }, []);
  
  
    return (
      <DevicesContext.Provider value={{ devices, loadingDevices, devicesError, getDevices, checkIfDeviceIsRegistered }}>{children}</DevicesContext.Provider>
    );
  };
  
  export default DevicesContextProvider;
