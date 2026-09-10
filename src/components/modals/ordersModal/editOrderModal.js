import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderForm from "../../forms/orderForm";
import BaseOrderModal from "./baseOrderModal";
import { orderModalContext } from "../../../providers/orderModalProvider";
import { editOrder } from "../../../redux/features/slices/ordersSlice";
import { editCompletedOrder } from "../../../redux/features/slices/productsSlice";

function EditOrderModal () {

    const { orderItems, closeOrderModal, orderModal, } = useContext(orderModalContext)

    const orders = useSelector( (state) => state.orders.orders)

    const order = orders.find( (ord) => ord.id === orderModal.data)

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