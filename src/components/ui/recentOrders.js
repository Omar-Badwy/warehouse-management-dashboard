import styles from '../../styles/dashboard.module.css'

function RecentOrders() {

    const elements = [
        {clint: "omar", products: 1234, price: 12345, orders: 23},
        {clint: "mohamed", products: 56, price: 34637, orders: 344},
        {clint: "ahmed", products: 634, price: 36644, orders: 34},
        {clint: "amr", products: 574, price: 35643, orders: 79},
        {clint: "sasa", products: 96, price: 45776, orders: 22},
    ]

    const rows = elements.map( (row) => {

        return(
            <tr key={row.clint}>
                <td>{row.clint}</td>
                <td>{row.products}</td>
                <td>{row.price}</td>
                <td>{row.orders}</td>
            </tr>
        )
    } )

    

    return (
        <div className={styles.recentOrders}>
            <div>
                <span>Recent Orders</span>
                <button>view all</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Products Count</th>
                        <th>Price</th>
                        <th>Orders Count</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>

        </div>
    );
}

export default RecentOrders;