import BaseModal from "./baseModal";
import { useContext } from "react";
import { ModalsContext } from "../../providers/modalsProvider";


export default function ClearLocaleStorageModal () {

    const {closeModal} = useContext(ModalsContext)

    function handleLogout () {

        localStorage.clear("proData")
        localStorage.clear("catData")
        localStorage.clear("ordData")
        localStorage.clear("clientsData")
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
