import { useContext } from "react";
import BaseModal from "../baseModal"
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch } from "react-redux";
import ClientForm from "../../forms/clientForm";
import { editClient } from "../../../redux/features/slices/clientsSlice";
import { validateClient } from "../../../utils/validation/clientsValidation";
import { addNotification } from "../../../redux/features/slices/notificationsSlice";


function EditClientModal () {

    const { closeModal , clientInput, setErrors, } = useContext(ModalsContext)

    const dispatch = useDispatch()

    function handleAddClient () {

        let validationErrors = validateClient(clientInput,setErrors)
        if(Object.keys(validationErrors).length === 0){

            dispatch(editClient({
                data: clientInput,
            }))

            dispatch( addNotification({
                type: "success",
                title: "client edited",
                message: `Client "${clientInput.name}" was edited successfully.`,
            }) )
            closeModal()
        }
    }

    return(
        <>
            <BaseModal title="edit client" onSubmit={handleAddClient}>
                <ClientForm/>
            </BaseModal>
        </>
    )
}

export default EditClientModal;