import UserContextProvider, { useAuthContext } from './user'
import DevicesContextProvider, { useDevicesContext } from './devices'
import SocialsContextProvider, { useSocialsContext } from './socials'
import MainMenuContextProvider, { useMainMenuContext } from "./mainMenu";

export {
    useAuthContext,
    useDevicesContext,
    useMainMenuContext,
    useSocialsContext,
  }

const Store = ({ children }) => {


    return (
        
          <UserContextProvider>
              <DevicesContextProvider>
                <SocialsContextProvider>
                  <MainMenuContextProvider>
                    {children}
                  </MainMenuContextProvider>
                </SocialsContextProvider>
              </DevicesContextProvider>
          </UserContextProvider>
     
    )
  }
  
  
  export default Store