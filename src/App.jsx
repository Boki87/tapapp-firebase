import AppRoutes from './components/AppRoutes'
import Auth from './components/Auth'
import { useAuthContext } from './context'

function App() {

  const { user } = useAuthContext()
  return (
    <>
    {!user ? <Auth /> : <AppRoutes />}
  </> 
  )
}

export default App
