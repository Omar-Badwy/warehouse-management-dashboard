import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/slices/authSlise";
import BaseModal from "./baseModal";
import { useContext } from "react";
import { ModalsContext } from "../../providers/modalsProvider";


function LogoutModal () {

    const dispatch = useDispatch()

    const {closeModal} = useContext(ModalsContext)

    function handleLogout () {

        dispatch(logout())
        closeModal()
    }

    return(
        <>
            <BaseModal title="log out" onSubmit={handleLogout}>
                <p>Are you sure you want to log out?</p>
            </BaseModal>
        </>
    )
}

export default LogoutModal;