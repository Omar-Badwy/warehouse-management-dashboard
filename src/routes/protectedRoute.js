import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


function ProtectedRoute  ({children})  {

    // ? Redux Code 
    const { isAuth } = useSelector((state) => state.auth)

    return isAuth ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute