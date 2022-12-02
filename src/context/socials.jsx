import { useState, useContext, useEffect, createContext } from "react";
import { useAuthContext } from "./user";
import {
  updateSocial as updateSocialInDb,
  addSocial as addSocialToDb,
  deleteSocial as deleteSocialFromDb,
} from "../lib/firebase";
import { useDebounce } from "../lib/hooks";

const SocialsContext = createContext({ devices: [] });

export const useSocialsContext = () => useContext(SocialsContext);

const SocialsContextProvider = ({ children }) => {
  let { user } = useAuthContext();

  const [socials, setSocials] = useState([]);
  const [updatingSocials, setUpdatingSocials] = useState(false);

  const [activeEditLink, setActiveEditLink] = useState(null);

  async function addSocial(social, deviceId) {
    // console.log(social)
    let maxOrder;
    if (socials.length > 0) {
      maxOrder = Math.max(...socials.map((s) => s.order)) + 1;
    } else {
      maxOrder = 1;
    }

    let obj = {
      ...social,
      user_id: user.uid,
      device_link_id: deviceId,
      order: maxOrder,
    };
    try {
      setUpdatingSocials(true);
      let newSocial = await addSocialToDb(obj);
      // setActiveEditLink(newSocial.id)
      setSocials([...socials, newSocial]);
      setUpdatingSocials(false);
    } catch (err) {
      console.log(err);
      setUpdatingSocials(false);
    }
  }

  async function updateSocial(socialId, obj) {
    let { id, ...social } = obj;
    try {
      setUpdatingSocials(true);
      await updateSocialInDb(id, social);
      let socialsCopy = socials.map((s) => {
        if (s.id === socialId) {
          s = { ...obj };
        }
        return s;
      });
      setSocials(socialsCopy);

      setUpdatingSocials(false);
    } catch (err) {
      console.log(err);
      setUpdatingSocials(false);
    }
  }

  async function deleteSocial(id) {
    try {
      setUpdatingSocials(true);
      await deleteSocialFromDb(id);
      setSocials(socials.filter((s) => s.id !== id));
      setUpdatingSocials(false);
    } catch (err) {
      console.log(err);
      setUpdatingSocials(false);
    }
  }

  return (
    <SocialsContext.Provider
      value={{
        socials,
        setSocials,
        updateSocial,
        updatingSocials,
        activeEditLink,
        setActiveEditLink,
        addSocial,
        deleteSocial,
      }}
    >
      {children}
    </SocialsContext.Provider>
  );
};

export default SocialsContextProvider;
