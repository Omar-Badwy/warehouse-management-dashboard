import { useContext } from "react";
import BaseModal from "../baseModal"
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch } from "react-redux";
import ClientForm from "../../forms/clientForm";
import { addClient } from "../../../redux/features/slices/clientsSlice";
import { validateClient } from "../../../utils/validation/clientsValidation";


function AddClientModal () {

    const { closeModal , clientInput, setClientInput, setErrors, } = useContext(ModalsContext)

    const dispatch = useDispatch()

    function handleAddClient () {

        let validationErrors = validateClient(clientInput,setErrors)
        if(Object.keys(validationErrors).length === 0){

            dispatch(addClient({
                data: clientInput,
            }))

            setClientInput({name: "",phoneNumber: "",email: "",address: "",})
            closeModal()
        }
    }

    return(
        <>
            <BaseModal title="add new client" onSubmit={handleAddClient}>
                <ClientForm/>
            </BaseModal>
        </>
    )
}

export default AddClientModal;