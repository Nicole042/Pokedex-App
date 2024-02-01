import { useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom'



const ProtectedRoutes = () => {

const trainer = useSelector (states => states.trainer)

  if(trainer.length >= 3) {
    return <Outlet />
  } else {
    return <Navigate to='/' />
  }



}

export default ProtectedRoutes