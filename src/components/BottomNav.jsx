import { useState, useEffect } from "react";
import {useLocation, Link} from 'react-router-dom'
import { Box } from "@chakra-ui/react";
import { RiSettings3Line, RiHomeLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { useAuthContext } from "../context";

const routes = [
  {
    path: "/",
    icon: <RiHomeLine />,
    isActive: false,
  },
  {
    path: "/profile",
    icon: <AiOutlineUser />,
    isActive: false,
  },
  {
    path: "/settings",
    icon: <RiSettings3Line />,
    isActive: false,
  },
];

function NavButton({ button }) {
  return (
    <Box color={button.isActive ? "cyan.600" : ""} cursor="pointer">
      <Link to={button.path}>
        <Box>{button.icon}</Box>
      </Link>
    </Box>
  );
}

export default function BottomNav() {
  let location = useLocation()
  const { user } = useAuthContext();

  const [navigationRoutes, setNavigationRoutes] = useState(routes);

  useEffect(() => {
    const routesCopy = navigationRoutes.map((navRoute) => {
      // if (navRoute.path === router.route) {
      //   navRoute.isActive = true;
      // } else {
      //   navRoute.isActive = false;
      // }
      return navRoute;
    });
    setNavigationRoutes(routesCopy);
  }, [location.pathname]);

  //dont show navigation on sign-in page
  const dontShowRoutes = ["login", "signup"];
  if (dontShowRoutes.includes(location.pathname.split("/")[1])) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <Box
      position="absolute"
      bottom="0"
      left="0"
      w="full"
      h="60px"
      roundedTop="3xl"
      zIndex="8"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      fontSize="2xl"
      css={{
        boxShadow: "0px -14px 41px -10px rgba(0,0,0,0.43)",
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.6)",
      }}
    >
      {navigationRoutes.map((r) => (
        <NavButton button={r} key={r.path} />
      ))}
    </Box>
  );
}
