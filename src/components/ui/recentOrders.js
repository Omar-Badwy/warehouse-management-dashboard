import styles from '../../styles/dashboard.module.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RecentOrders() {

    const navigate = useNavigate()

    const orders = useSelector( (state) => state.orders.orders)

    const clients =  useSelector( (state) => state.clients.clients)

    const latestOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

    const rows = latestOrders.map( (ord) => {

        const client = clients.find( (client) => client.id === ord.clientId )

        return(
            <article className={styles.order} key={ord.id}>

                <div className={styles.orderHead}>

                    <div className={styles.orderIcon}>
                        {client.name.charAt(0)}
                    </div>

                    <div className={styles.orderInfo}>
                        <h3>{client.name}</h3>
                        <span>OrderID: #{ord.id}</span>
                    </div>
                </div>

                <div className={styles.orderData}>

                    <div className={styles.quantity}>
                        <span>Qty</span>
                        <strong>{ord.products.length.toLocaleString()}</strong>
                    </div>

                    <strong className={styles.lineTotal}>
                        <span>Total</span>
                        {ord.products.reduce( 
                            (total,pro) => total + ( Number( pro.quantity) * Number( pro.price) )
                            , 0).toLocaleString() } EGP
                    </strong>

                </div>
            </article>
        )
    } )

    

    return (
        <section className={`${styles.section} ${styles.recentOrders}`}>
            <div className={styles.sectionHeader}>
                <h2>Recent Orders</h2>
                <button onClick={ () => navigate("/orders") }>view all</button>
            </div>

            <div className={styles.productList}>
                {rows}
            </div>
        </section>
    );
}

export default RecentOrders;