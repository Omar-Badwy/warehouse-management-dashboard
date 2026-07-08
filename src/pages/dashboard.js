import styles from '../styles/dashboard.module.css'

import Cards from '../components/ui/dashboardCards'
import RecentOrders from '../components/ui/recentOrders'
import TopoClients from '../components/ui/topClients'

export default function Dashboard () {

    return (
        <div className={styles.dashboard}>

            <Cards/>
            
            <div className={styles.dashContent}>
                <RecentOrders/>
                <TopoClients/>
            </div>

        </div>
    )
}