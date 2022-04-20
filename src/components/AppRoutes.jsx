import { Flex, Box } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Device from './Device'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import Settings from './Settings'
import EditDevice from './EditDevice'
import BottomNav from './BottomNav'
import BurgerMenu from './BurgerMenu'

const AppRoutes = () => {

  return (
    <Box w='full' h="full" overflow="hidden">
      <BurgerMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup/:id' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/d/:id' element={<Device />} />
        <Route path='/edit/:id' element={<EditDevice />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <BottomNav />
    </Box>
  )
}


export default AppRoutes
