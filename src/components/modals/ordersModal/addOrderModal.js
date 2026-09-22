import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderForm from "../../forms/orderForm";
import BaseOrderModal from "./baseOrderModal";
import { orderModalContext } from "../../../providers/orderModalProvider";
import { addOrder } from "../../../redux/features/slices/ordersSlice";
import { addNotification } from "../../../redux/features/slices/notificationsSlice";


function AddOrderModal () {

    const { orderInput, orderItems, closeOrderModal} = useContext(orderModalContext)

    const clients = useSelector( (state) => state.clients.clients )

    const client = clients.find( (client) => client.id === orderInput.clientId)

    const dispatch = useDispatch()

    function handleAddOrder () {

        if(Object.keys(orderItems).length > 0){

            dispatch(addOrder({
                orderInput: orderInput,
                orderItems: orderItems,
            }))

            dispatch( addNotification({
                type: "success",
                title: "Order added",
                message: `Order was created for client ${client.name}.`,
            }) )
            closeOrderModal()
        }
    }

    return(
        <>
            <BaseOrderModal onClick={handleAddOrder} >
                <OrderForm/>
            </BaseOrderModal>
        </>
    )
}

export default AddOrderModal;