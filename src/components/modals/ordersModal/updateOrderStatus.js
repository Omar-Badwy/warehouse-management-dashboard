import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderModalContext } from "../../../providers/orderModalProvider";
import { updateStatusOrder } from "../../../redux/features/slices/ordersSlice";
import { completeOrder, } from "../../../redux/features/slices/productsSlice";
import styles from "../../../styles/orderModal.module.css"
import { Input } from "@mantine/core";
import { addNotification } from "../../../redux/features/slices/notificationsSlice";


function UpdateOrderModal () {

    const { orderInput, closeOrderModal, orderModal, orderErrors, setOrderInput, } = useContext(orderModalContext)

    const dispatch = useDispatch()

    const orders = useSelector( (state) => state.orders.orders)

    const order = orders.find( (order) => order.id === orderModal.data)

    const clients = useSelector( (state) => state.clients.clients )

    const client = clients.find( (client) => client.id === order.clientId)

    function orderInputOnChange (e) {
        setOrderInput({...orderInput, [e.target.name] : e.target.value})
    }

    function handleUpdateStatus () {

        if(orderInput.status !== ""){

            dispatch(updateStatusOrder({
                status: orderInput.status,
                id: orderModal.data,
            }))

            if(orderInput.status === "completed"){
                dispatch(completeOrder({data: order.products, status: "completed"}))
                dispatch( addNotification({
                    type: "success",
                    title: "Order completed",
                    message: `Order #${order.id} was completed for client ${client.name}.`,
                }) )
            }

            if(orderInput.status === "cancelled"){
                dispatch(completeOrder({data: order.products, status: "cancelled"}))
                dispatch( addNotification({
                    type: "error",
                    title: "Order Cancelled",
                    message: `Order #${order.id} was cancelled and stock was restored.`,
                }) )
            }

            closeOrderModal()
        }
    }

    return(
        <>
            <div className={styles.overlay} onMouseDown={closeOrderModal}>
                <div
                    className={styles.modal}
                    onMouseDown={(event) => event.stopPropagation()}
                >
                    <header className={styles.header}>
                        <div>
                            <span className={styles.eyebrow}>ORDER</span>
                            <h2>
                                Update Order Status
                            </h2>
                            {/* <p>Add the client and products included in this order.</p> */}
                        </div>

                        <button className={styles.closeButton} onClick={closeOrderModal}>
                            ×
                        </button>
                    </header>

                    <div style={{padding:"30px"}}>

                        <label className={styles.field}>
                            <span>Status</span>

                            <Input.Wrapper classNames={{error: styles.error}} error={orderErrors.status}>
                                <select className={styles.select} name="status" onChange={orderInputOnChange} value={orderInput.status}>
                                    <option value="select status">{"select status"}</option>
                                    <option value="pending" style={{color:"gold"}} >{"Pending Order"}</option>
                                    <option value="completed" style={{color:"green"}} >{"Complete Order"}</option>
                                    <option value="cancelled" style={{color:"red"}} >{"Cancle Order"}</option>
                                </select>
                            </Input.Wrapper>
                        </label>
                    </div>

                    <footer className={styles.footer} style={{justifyContent:"flex-end"}}>

                        <div className={styles.actions}>
                            <button className={styles.cancelButton} onClick={closeOrderModal}>
                                Cancel
                            </button>
                            <button className={styles.submitButton} onClick={handleUpdateStatus} >
                                Update Status
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default UpdateOrderModal;