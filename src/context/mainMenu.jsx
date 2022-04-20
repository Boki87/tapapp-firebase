import React, { useState, useContext, useEffect, createContext } from "react";

const MainMenuContext = createContext(null);

export const useMainMenuContext = () => useContext(MainMenuContext);

const MainMenuContextProvider = ({ children }) => {
  const [showMainMenu, setShowMainMenu] = useState(false);

  function toggleMainMenu() {
    setShowMainMenu(!showMainMenu);
  }

  return (
    <MainMenuContext.Provider value={{ showMainMenu, toggleMainMenu }}>
      {children}
    </MainMenuContext.Provider>
  );
};

export default MainMenuContextProvider;
