import styles from '../styles/dashboard.module.css'

import Cards from '../components/ui/dashboardCards'
import RecentOrders from '../components/ui/recentOrders'
import SalesChart from '../components/charts/salesChart'
import TopClientsChart from '../components/charts/topClientsChart'
import ProductsSalesChart from '../components/charts/productsSaleChart'
import TopCategoriesChart from '../components/charts/topCategoriesChart'


export default function Dashboard () {

    return (
        <div className={styles.dashboard}>

            <Cards/>
            
            <div className={styles.grid}>
                <RecentOrders/>
                <TopClientsChart/>
                <TopCategoriesChart/>
                <ProductsSalesChart/>
                <SalesChart/>
            </div>

        </div>
    )
}