import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderForm from "../../forms/orderForm";
import BaseOrderModal from "./baseOrderModal";
import { orderModalContext } from "../../../providers/orderModalProvider";
import { editOrder } from "../../../redux/features/slices/ordersSlice";
import { editCompletedOrder } from "../../../redux/features/slices/productsSlice";
import { addNotification } from "../../../redux/features/slices/notificationsSlice";

function EditOrderModal () {

    const { orderItems, closeOrderModal, orderModal, } = useContext(orderModalContext)

    const orders = useSelector( (state) => state.orders.orders)

    const order = orders.find( (ord) => ord.id === orderModal.data)

    const clients = useSelector( (state) => state.clients.clients )

    const client = clients.find( (client) => client.id === order.clientId)

    const dispatch = useDispatch()

    function handleAddOrder () {

            dispatch(editCompletedOrder({
                orderData: order,
                orderItems: orderItems,
            }))

            dispatch(editOrder({
                items: orderItems,
                id: orderModal.data,
            }))

            dispatch( addNotification({
                type: "success",
                title: "Order edited",
                message: `Order #${order.id} was edited for client ${client.name}.`,
            }) )

            closeOrderModal()
    }

    return(
        <>
            <BaseOrderModal onClick={handleAddOrder} >
                <OrderForm/>
            </BaseOrderModal>
        </>
    )
}

export default EditOrderModal;