import { useContext } from "react";
import BaseModal from "../baseModal";
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch } from "react-redux";
import { dltClient } from "../../../redux/features/slices/clientsSlice";

function DltClientModal () {

    const dispatch = useDispatch()

    const { closeModal, modalData,} = useContext(ModalsContext)

    function handleDltProduct () {
        dispatch(dltClient({id: modalData.id}))
        closeModal()
    }

    return(
        <>
            <BaseModal title={"Delete client"} buttonText={"Delete client"} onSubmit={handleDltProduct}>
                <p style={{color:"black",fontSize:"20px"}}>Are you sure you want to delete this client?</p>
            </BaseModal>
        </>
    )
}

export default DltClientModal;