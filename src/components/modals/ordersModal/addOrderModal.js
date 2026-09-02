import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderForm from "../../forms/orderForm";
import BaseOrderModal from "./baseOrderModal";
import { orderModalContext } from "../../../providers/orderModalProvider";
import { addOrder } from "../../../redux/features/slices/ordersSlice";
import { validateOrder } from "../../../utils/validation/orderValidation";
import { decreasePro } from "../../../redux/features/slices/productsSlice";


function AddOrderModal () {

    const { orderInput, orderItems, closeOrderModal, setOrderErrors} = useContext(orderModalContext)

    const products = useSelector( (state) => state.products.products)

    const dispatch = useDispatch()

    // function handleCloseModal () {
    //     setOrderInput({clientId: "",products: [],status: "",})
    //     setErrors({name: "",category: "",count: "",price: "",phone: "",email: "",address: "",})
    //     closeModal()
    // }

    function handleAddOrder () {

        if(Object.keys(orderItems).length > 0){

            dispatch(addOrder({
                orderInput: orderInput,
                orderItems: orderItems,
            }))

            dispatch(decreasePro(orderItems))

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