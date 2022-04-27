import { useState, useContext, useEffect, createContext } from "react";
import {useAuthContext} from './user'
import { updateSocial as updateSocialInDb, addSocial as addSocialToDb } from "../lib/firebase";
import { useDebounce } from "../lib/hooks";

const SocialsContext = createContext({devices: []});

export const useSocialsContext = () => useContext(SocialsContext);

const SocialsContextProvider = ({ children }) => {

    let {user} = useAuthContext()
    
    const [socials, setSocials] = useState([])
    const [updatingSocials, setUpdatingSocials] = useState(false)
   
    const [activeEditLink, setActiveEditLink] = useState(null)

    async function addSocial(social, deviceId) {
        // console.log(social)
        let obj = {
            ...social,
            user_id: user.uid,
            device_link_id: deviceId
        }
        try {
            setUpdatingSocials(true)
            let newSocial = await addSocialToDb(obj)
            setSocials([...socials, newSocial])
            setUpdatingSocials(false)
        } catch(err) {
            console.log(err)
            setUpdatingSocials(false)
        } 
    }

    async function updateSocial(socialId, obj) {
        let {id, ...social} = obj 
        try {
            setUpdatingSocials(true)
            await updateSocialInDb(id, social)
            let socialsCopy = socials.map(s => {
                if(s.id === socialId) {
                   s = {...obj}
                }
                return s
            })
            setSocials(socialsCopy)

            setUpdatingSocials(false)
        }catch (err) {
            console.log(err);
            setUpdatingSocials(false)
        }
    }

   


    return (
      <SocialsContext.Provider value={{ socials, setSocials, updateSocial, updatingSocials,activeEditLink, setActiveEditLink, addSocial }}>{children}</SocialsContext.Provider>
    );
  };
  
  export default SocialsContextProvider;