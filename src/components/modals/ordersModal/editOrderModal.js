import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderForm from "../../forms/orderForm";
import BaseOrderModal from "./baseOrderModal";
import { orderModalContext } from "../../../providers/orderModalProvider";
import { editOrder } from "../../../redux/features/slices/ordersSlice";
import { validateOrder } from "../../../utils/validation/orderValidation";


function EditOrderModal () {

    const { orderInput, orderItems, closeOrderModal, setOrderErrors, orderModal, } = useContext(orderModalContext)

    const products = useSelector( (state) => state.products.products)

    const dispatch = useDispatch()

    function handleAddOrder () {

        // let validationErrors = validateOrder(orderInput,setOrderErrors,products,orderModal)
        // if(Object.keys(validationErrors).length === 0){

            dispatch(editOrder({
                items: orderItems,
                id: orderModal.data,
            }))

            closeOrderModal()
        // }
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