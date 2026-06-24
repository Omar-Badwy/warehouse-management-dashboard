import { useSelector } from "react-redux"
import { Navigate, replace } from "react-router-dom"


function ProtectedRoute  ({children})  {

    // ? Redux Code 
    const { isAuth } = useSelector((state) => state.auth)

    return isAuth ? children : Navigate("/", { replace:true })
}

export default ProtectedRoute