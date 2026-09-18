import { useContext, } from 'react';
import styles from '../../styles/orders.module.css'
import { orderModalContext } from '../../providers/orderModalProvider';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../utils/formatNumber';

function OrdersCards() {

    const { openOrderModal } = useContext(orderModalContext)

    const orders = useSelector( (state) => state.orders.orders)
    
    const pending = orders.filter(
            order => order.status === "pending"
        ).length;

        const completed = orders.filter(
            order => order.status === "completed"
        ).length;

        const canceled = orders.filter(
            order => order.status === "cancelled"
        ).length;
    
    return(
        <>
            <header className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>WAREHOUSE</p>
                    <h1>Orders</h1>
                    <p className={styles.subtitle}>Manage and track customer orders.</p>
                </div>
                <button className={styles.addButton} onClick={() => openOrderModal("addOrder") }>+ Add Order</button>
            </header>

            <section className={styles.cards}>
                <div className={styles.card}><span>Total Orders</span><strong>{orders.length}</strong></div>
                <div className={styles.card}><span style={{color:"gold"}}>Pending</span><strong>{formatNumber(pending)}</strong></div>
                <div className={styles.card}><span style={{color:"green"}}>Completed</span><strong>{formatNumber(completed)}</strong></div>
                <div className={styles.card}><span style={{color:"red"}}>Canceled</span><strong>{formatNumber(canceled)}</strong></div>
            </section>
        </>
    )
}

export default OrdersCards;