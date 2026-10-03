import BaseModal from "./baseModal";
import { useContext } from "react";
import { ModalsContext } from "../../providers/modalsProvider";


export default function ClearLocaleStorageModal () {

    const {closeModal} = useContext(ModalsContext)

    function handleLogout () {

        localStorage.removeItem("proData")
        localStorage.removeItem("catData")
        localStorage.removeItem("ordData")
        localStorage.removeItem("clientsData")
        closeModal()
    }

    return(
        <>
            <BaseModal title="clear all data" buttonText={"clear"} onSubmit={handleLogout}>
                <p style={{color:"red"}}>
                    Are you sure you want to clear all data? That action cannot be undone. </p>
            </BaseModal>
        </>
    )
}
