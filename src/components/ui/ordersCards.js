import { useContext } from 'react';
import styles from '../../styles/orders.module.css'
import { orderModalContext } from '../../providers/orderModalProvider';
import { useSelector } from 'react-redux';
// import { formatNumber } from '../../utils/formatNumber'

function OrdersCards() {

    const { openOrderModal } = useContext(orderModalContext)

    const orders = useSelector( (state) => state.orders.orders)
    
    const pending = orders.reduce( 
        (total,order) => order.status === "pending" ? total + 1 : 0, 
    0)

    const completed = orders.reduce( 
        (total,order) => order.status === "completed" ? total + 1 : 0, 
    0)

    const canceled = orders.reduce( 
        (total,order) => order.status === "cancelled" ? total + 1 : 0, 
    0)
    
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
                <div className={styles.card}><span>Pending</span><strong>{pending}</strong></div>
                <div className={styles.card}><span style={{color:"green"}}>Completed</span><strong>{completed}</strong></div>
                <div className={styles.card}><span style={{color:"red"}}>Canceled</span><strong>{canceled}</strong></div>
            </section>
        </>
    )
}

export default OrdersCards;