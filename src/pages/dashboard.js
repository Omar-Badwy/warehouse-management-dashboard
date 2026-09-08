import styles from '../styles/dashboard.module.css'

import Cards from '../components/ui/dashboardCards'
import RecentOrders from '../components/ui/recentOrders'
import SalesChart from '../components/charts/salesChart'
import TopClientsChart from '../components/charts/topClientsChart'
import ProductsSalesChart from '../components/charts/productsSaleChart'
import TopCategoriesChart from '../components/charts/topCategoriesChart'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'


export default function Dashboard () {

    const orders = useSelector( (state) => state.orders.orders)

    const [filter, setFilter] = useState('week')

    const filterTime = useMemo( () => {   
        
        if (filter === "week") {
            const today = new Date();

            const diff = (today.getDay() + 1) % 7;

            const startOfWeek = new Date(today);

            startOfWeek.setDate(
                today.getDate() - diff
            );

            return orders.filter(
                (order) => new Date(order.createdAt) >= startOfWeek
            );

         }

        if (filter === "month") {
            const now = new Date();

            const startOfMonth = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );

            const startOfNextMonth = new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                1
            );

            return orders.filter(
                (order) => new Date(order.createdAt)  >= startOfMonth && 
                           new Date(order.createdAt) < startOfNextMonth
            );
         }

        if (filter === "year") {
            const now = new Date();

            const startOfYear = new Date(
                now.getFullYear(),0,1
            );

            const startOfNextYear = new Date(
                now.getFullYear() + 1,0,1
            );

            return orders.filter(
                (order) => new Date(order.createdAt)  >= startOfYear && 
                           new Date(order.createdAt) < startOfNextYear
            );
         }

    }, [orders, filter])


    return (
        <div className={styles.dashboard}>

            <section className={styles.filterSection}>

                <header className={styles.filterSectionHeader}>
                    <h2>Dashboard</h2>
                    <p>{filter === "year" ? "Current year's data" : 
                        filter === "month" ? "Current month's data" : "Current week's data"} </p>
                </header>

                <div className={styles.filters} >
                    <div className={filter === "year" ? styles.filterActive : ""} 
                        onClick={() => setFilter("year")}>year</div>

                    <div className={filter === "month" ? styles.filterActive : ""} 
                        onClick={() => setFilter("month")}>month</div>

                    <div className={filter === "week" ? styles.filterActive : ""} 
                        onClick={() => setFilter("week")}>week</div>

                </div>

            </section>

            <Cards/>
            
            <div className={styles.grid}>
                <RecentOrders filteredDate={filterTime}/>
                <TopClientsChart filteredDate={filterTime}/>
                <TopCategoriesChart filteredDate={filterTime}/>
                <ProductsSalesChart filteredDate={filterTime}/>
                <SalesChart filteredDate={filterTime} filter={filter}/>
            </div>

        </div>
    )
}