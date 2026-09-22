import { useContext } from "react";
import BaseModal from "../baseModal";
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch, useSelector } from "react-redux";
import { dltClient } from "../../../redux/features/slices/clientsSlice";
import { addNotification } from "../../../redux/features/slices/notificationsSlice";

function DltClientModal () {

    const dispatch = useDispatch()

    const { closeModal, modalData,} = useContext(ModalsContext)

    const clients = useSelector( (state) => state.clients.clients)

    const client = clients.find( (client) => client.id === modalData.id)

    function handleDltProduct () {
        dispatch(dltClient({id: modalData.id}))
        
        dispatch( addNotification({
            type: "error",
            title: "client deleted",
            message: `client "${client.name}" was deleted.`,
        }) )
        
        closeModal()
    }

    return(
        <>
            <BaseModal title={"Delete client"} buttonText={"Delete client"} onSubmit={handleDltProduct}>
                <p>Are you sure you want to delete this client?</p>
            </BaseModal>
        </>
    )
}

export default DltClientModal;