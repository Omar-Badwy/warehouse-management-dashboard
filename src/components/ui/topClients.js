import styles from '../../styles/dashboard.module.css'

function TopoClients() {

    const elements = [
        {id: "i", clint: "Alex paina", orders: 23},
        {id: "ii", clint: "herera", orders: 45},
        {id: "iii", clint: "locas", orders: 45},
        {id: "iv", clint: "messi", orders: 45},
        {id: "v", clint: "fabian", orders: 45},
    ]

    const rows = elements.map( (row) => {

        return(
            <tr key={row.id}>
                <td> {row.id}</td>
                <td> {row.clint}</td>
                <td>{row.orders}</td>
            </tr>
        )
    } )

    return(

        <div className={styles.topClients}>
            <div>
                <span>Top Clients</span>
                <button>view all</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Client</th>
                        <th>Orders Count</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>

        </div>
    )
}

export default TopoClients;