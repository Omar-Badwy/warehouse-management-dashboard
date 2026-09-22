import { createContext, useState } from "react";
import MainOrderModal from "../components/modals/ordersModal/mainOrderModal";


export const orderModalContext = createContext()

const OrderMOdalProvider = ({children}) => {

    const [orderModal,setOrderModal] = useState({
        isOpen: false,
        type: "",
        data: ""
    })

    function openOrderModal (type,data) {

        setOrderModal({
            isOpen: true,
            type: type,
            data: data,
        })
    }

    const [orderInput, setOrderInput] = useState({
        id:"",
        clientId: "",
        productId: "",
        quantity: "",
        status: "pending",
    });

    const [orderItems, setOrderItems] = useState([]);

    const [orderErrors, setOrderErrors] = useState({
        clientId: "",
        productId: "",
        quantity: "",
    });

    function closeOrderModal () {

        setOrderModal({
            isOpen: false,
            type: "",
            data: ""
        })

        setOrderInput({
            clientId: "",
            status: "pending",
            productId: "",
            quantity: "",
        });
        
        setOrderErrors({
            clientId: "",
            productId: "",
            quantity: "",
        })
        
        setOrderItems([])
    }

    return (
        <orderModalContext.Provider 
            value={{
                orderModal,
                openOrderModal,
                closeOrderModal,
                orderInput,
                setOrderInput,
                orderErrors,
                setOrderErrors,
                orderItems,
                setOrderItems,
            }}>

            <MainOrderModal/>
            {children}
        </orderModalContext.Provider>
    )
}

export default OrderMOdalProvider;