import { useContext } from "react";
import { useDispatch } from "react-redux";
import OrderForm from "../../forms/orderForm";
import BaseOrderModal from "./baseOrderModal";
import { orderModalContext } from "../../../providers/orderModalProvider";
import { addOrder } from "../../../redux/features/slices/ordersSlice";


function AddOrderModal () {

    const { orderInput, orderItems, closeOrderModal} = useContext(orderModalContext)


    const dispatch = useDispatch()

    function handleAddOrder () {

        if(Object.keys(orderItems).length > 0){

            dispatch(addOrder({
                orderInput: orderInput,
                orderItems: orderItems,
            }))

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