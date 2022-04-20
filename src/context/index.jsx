import UserContextProvider, { useAuthContext } from './user'
import DevicesContextProvider, { useDevicesContext } from './devices'
import MainMenuContextProvider, { useMainMenuContext } from "./mainMenu";

export {
    useAuthContext,
    useDevicesContext,
    useMainMenuContext
  }

const Store = ({ children }) => {


    return (
        
          <UserContextProvider>
              <DevicesContextProvider>
                <MainMenuContextProvider>
                  {children}
                </MainMenuContextProvider>
              </DevicesContextProvider>
          </UserContextProvider>
     
    )
  }
  
  
  export default Store