import { useContext } from "react"
import { orderModalContext } from "../../../providers/orderModalProvider"
import AddOrderModal from "./addOrderModal";
import EditOrderModal from "./editOrderModal";
import UpdateOrderModal from "./updateOrderStatus";
import DltOrderModal from "./dltOrderModal";

export default function MainOrderModal () {

    const { orderModal, } = useContext(orderModalContext)

    function renderModalContent () {

        switch(orderModal.type){

            case "addOrder":
                return <AddOrderModal/>

            case "editOrder":
                return <EditOrderModal/>

            case "dltOrder":
                return <DltOrderModal/>

            case "updateOrder":
                return <UpdateOrderModal/>

            default:
                return null;
        }
    }


    if(!orderModal.isOpen) return null

    return(
        <>
            {renderModalContent()}
        </>
    )
}