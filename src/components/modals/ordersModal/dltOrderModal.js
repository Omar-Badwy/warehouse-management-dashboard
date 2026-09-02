import { useContext } from "react";
import { useDispatch } from "react-redux";
import { orderModalContext } from "../../../providers/orderModalProvider";
import { dltOrder } from "../../../redux/features/slices/ordersSlice";
import styles from "../../../styles/orderModal.module.css"
import { useNavigate } from "react-router-dom";


function DltOrderModal () {

    const { orderInput, closeOrderModal, orderModal, orderErrors, setOrderInput, } = useContext(orderModalContext)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    function handleDltOrder () {

        dispatch(dltOrder({
            id: orderModal.data,
        }))

        closeOrderModal()
        navigate("/orders", { replace: true } )
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
                                Delete Order
                            </h2>
                        </div>

                        <button className={styles.closeButton} onClick={closeOrderModal}>
                            ×
                        </button>
                    </header>

                    <div style={{padding:"50px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <p style={{fontSize:"22px"}}>Are you sure delete this order.</p>
                    </div>

                    <footer className={styles.footer} style={{justifyContent:"flex-end"}}>

                        <div className={styles.actions}>
                            <button className={styles.cancelButton} onClick={closeOrderModal}>
                                Cancel
                            </button>
                            <button className={styles.submitButton} style={{backgroundColor:"#dc2626"}} onClick={handleDltOrder} >
                                Delete
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default DltOrderModal;