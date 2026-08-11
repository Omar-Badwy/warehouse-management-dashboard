import { useContext } from "react";
import BaseModal from "../baseModal";
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch } from "react-redux";
import { dltClient } from "../../../redux/features/slices/clientsSlice";

function DltClientModal () {

    const dispatch = useDispatch()

    const { closeModal , setCategoryInput, setErrors, modalData,} = useContext(ModalsContext)

    function handleCloseMOdal () {
        setCategoryInput({id: "", name: ""})
        setErrors({name: "",category: "",count: "",price: "",phone: "",email: "",address: "",})
        closeModal()
    }

    function handleDltProduct () {
        dispatch(dltClient({id: modalData.id}))
        closeModal()
    }

    return(
        <>
            <BaseModal title={"Delete client"} buttonText={"Delete client"} onClose={handleCloseMOdal} onSubmit={handleDltProduct}>
                <p style={{color:"white",fontSize:"20px"}}>Are you sure you want to delete this client?</p>
            </BaseModal>
        </>
    )
}

export default DltClientModal;