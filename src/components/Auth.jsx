import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Device from './Device'

const Auth = () => {


  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup/:id' element={<Register />} />
      <Route path='/d/:id' element={<Device />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}


export default Auth
