import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import styles from "../styles/orderPage.module.css"
import { useContext, useEffect } from "react"
import { formatDate } from "../utils/formatDate"
import { orderModalContext } from "../providers/orderModalProvider"
import { formatNumber } from "../utils/formatNumber"

export default function OrderPage () {

    const {orderId} = useParams()
    
    const { setOrderItems, } = useContext(orderModalContext)
    
    const products =  useSelector( (state) => state.products.products)

    const clients =  useSelector( (state) => state.clients.clients)

    const orders =  useSelector( (state) => state.orders.orders)
    
    const order = orders.find( (order) => order.id === orderId)

    const client = clients.find( (client) => client.id === order.clientId)

    const {openOrderModal} = useContext(orderModalContext)

    const navigate =  useNavigate()

    useEffect( () => {

        if(!order){
            return  navigate("/error?type=orders")
        }
    },[order,navigate])

    if(!order){
        return  null
    }

    const orderProducts = order.products.map((pro) => {

        const product = products.find(  (product) => product.id === pro.productId)

           return <article className={styles.product} key={pro.productId}>
                <div className={styles.productIcon}>
                    {product.name.charAt(0)}
                </div>

                <div className={styles.productInfo}>
                    <h3>{product.name}</h3>
                    <span>Price: {formatNumber(pro.price)} EGP</span>
                </div>

                <div className={styles.quantity}>
                    <span>Qty</span>
                    <strong>{formatNumber(pro.quantity)}</strong>
                </div>

                <strong className={styles.lineTotal}>
                    <span>Total</span>
                    {formatNumber(pro.quantity * pro.price)} EGP
                </strong>
            </article>
    })

    const totalQuantity = order.products.reduce(
        (total, product) => total + Number(product.quantity),
        0
    );

    const total = order.products.reduce(
        (total, product) => total + Number(product.quantity) * Number(product.price),
        0
    );

    function editOrder () {
        const order = orders.find( (ord) => ord.id === orderId )
        setOrderItems(order.products)
        openOrderModal("editOrder",orderId)
    }

    return(
        <>
        <main className={styles.page}>
            <header className={styles.header}>
                <Link to={"/orders"} className={styles.back}>
                    ← Back to orders
                </Link>

                <div className={styles.titleRow}>
                <div>
                    <h3>ORD-{order.id}</h3>
                    <p className={styles.createdAt}>Created {formatDate(order.createdAt)}</p>
                </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"10px"}}>

                        <div className={styles.actionsSection}>

                            <button className={`${styles.btnAction} ${styles.btnEdit}`}
                                onClick={editOrder} disabled={order.status === "cancelled" ? true : false }>
                                edit order
                            </button>

                            <button className={`${styles.btnAction} ${styles.btnDlt}`}
                                onClick={ () => openOrderModal("dltOrder",orderId)}>
                                delete
                            </button>
                        </div>

                        <span className={`${styles.status} ${styles[order.status]}`}>
                            {order.status}
                        </span>
                    </div>
                </div>
            </header>

            <section className={styles.grid}>
                <div className={styles.mainColumn}>
                        {/* # products */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div>
                                <h2>Products</h2>
                                <p>{totalQuantity} items in this order</p>
                            </div>
                        </div>

                        <div className={styles.productList}>
                            {orderProducts}
                        </div>
                    </section>

                        {/* # timeLine */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div>
                                <h2>Order Timeline</h2>
                                <p>Order activity</p>
                            </div>
                            </div>

                            <div className={styles.timeline}>
                            <div className={`${styles.timelineItem} ${styles.active}`}>
                                <span />
                                <div>
                                <strong>Order Created</strong>
                                <p>{formatDate(order.createdAt)}</p>
                                </div>
                            </div>

                            <div className={styles.timelineItem}>
                                <span />
                                <div>
                                <strong>Pending</strong>
                                <p>Waiting for order processing</p>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>

                
                <aside className={styles.sideColumn}>
                        {/* # client */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div>
                                <h2>Client</h2>
                                <p>Customer information</p>
                            </div>
                        </div>

                        <div className={styles.client}>
                            <div className={styles.avatar}>
                                {client.name.charAt(0)}
                            </div>

                            <div>
                                <h3>{client.name}</h3>
                                <p>{client.email}</p>
                            </div>
                        </div>

                        <div className={styles.contact}>
                            <div>
                                <span>Phone</span>
                                <strong>{client.phone}</strong>
                            </div>
                            <div>
                                <span>Email</span>
                                <strong>{client.email}</strong>
                            </div>
                            <div>
                                <span>Address</span>
                                <strong>{client.address}</strong>
                            </div>
                        </div>
                    </section>

                        {/* # summary */}
                    <section className={`${styles.card} ${styles.summary}`}>
                        <div className={styles.cardHeader}>
                        <div>
                            <h2>Order Summary</h2>
                            <p>Payment overview</p>
                        </div>
                        </div>

                        <div className={styles.summaryRow}>
                        <span>Total Products</span>
                        <strong>{totalQuantity}</strong>
                        </div>

                        <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <strong>{formatNumber(total)} EGP</strong>
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.totalRow}>
                        <span>Total</span>
                        <strong>{formatNumber(total)} EGP</strong>
                        </div>

                        <button className={styles.actionButton}
                         onClick={ () => openOrderModal("updateOrder",orderId) }>Update Status</button>
                    </section>
                </aside>

            </section>
        </main>
        </>
    )
}