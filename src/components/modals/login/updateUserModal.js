import { useDispatch, useSelector } from "react-redux";
import UpdateUserForm from "../../forms/updateUserForm";
import BaseModal from "../baseModal";
import { updateUser } from "../../../redux/features/slices/authSlise";
import { useContext } from "react";
import { ModalsContext } from "../../../providers/modalsProvider";


function UpdateUserModal () {

    const dispatch = useDispatch()

    const {userInput, setErrors, closeModal } = useContext(ModalsContext)

    const user = useSelector( (state) => state.auth.user )

    function userValidation () {

        const newErrors = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const { name, email,} = userInput
        
        if(name !== ""){

            if(name.length < 2) {
                newErrors.name = "Name must be at least 2 characters."
            }

        }else{
            newErrors.name = "Name is required"
        }
        

        if (email === "") {
            newErrors.email = "Email is required";
        } 

        else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email";
        }


        setErrors(newErrors)
        return newErrors;
    }

    function handleUpdateUser () {

        let validationErrors = userValidation()
        if(Object.keys(validationErrors).length === 0){
            
             dispatch(updateUser({
                data: userInput,
                password: user.password
            }))
            closeModal()
        }

    }

    return(
        <>
            <BaseModal title="update user information" buttonText={"update"} onSubmit={handleUpdateUser}>
                <UpdateUserForm/>
            </BaseModal>
        </>
    )
}

export default UpdateUserModal;