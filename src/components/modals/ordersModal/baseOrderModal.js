import { useContext } from "react";
import styles from "../../../styles/orderModal.module.css"
import { orderModalContext } from "../../../providers/orderModalProvider";


function BaseOrderModal ({children,onClick}) {

    const { orderModal, closeOrderModal, orderItems, } = useContext(orderModalContext)

    const total = orderItems?.reduce( (sum, item) => sum + item.quantity * item.price, 0);

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
                                {orderModal.type === "editOrder"
                                    ? "Edit Order"
                                    : "Create New Order"}
                            </h2>
                            <p>Add the client and products included in this order.</p>
                        </div>

                        <button className={styles.closeButton} onClick={closeOrderModal}>
                            ×
                        </button>
                    </header>

                    {children}

                    <footer className={styles.footer}>
                        <div className={styles.total}>
                            <span>{total ? total.toLocaleString() : "0"}</span>
                            <strong> EGP</strong>
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.cancelButton} onClick={closeOrderModal}>
                                Cancel
                            </button>
                            <button className={styles.submitButton} onClick={onClick} >
                                {orderModal.type === "editOrder" ? "Save Changes" : "Create Order"}
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default BaseOrderModal;