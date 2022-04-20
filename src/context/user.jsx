import { useState, useContext, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signMeOut } from "../lib/firebase";
import {auth} from '../lib/firebase'
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext({user: null});

export const useAuthContext = () => useContext(AuthContext);

const UserContextProvider = ({ children }) => {

    let navigate = useNavigate()
    const [user, setUser] = useState(null);

    
    async function logOut() {
        await signMeOut()
        setUser(null)
        navigate('/')
    }


    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
        setUser(currUser);
        if(currUser && currUser.uid) {
        }
      });
  
      return unsubscribe 
    }, []);
  
  
    return (
      <AuthContext.Provider value={{ user, logOut }}>{children}</AuthContext.Provider>
    );
  };
  
  export default UserContextProvider;