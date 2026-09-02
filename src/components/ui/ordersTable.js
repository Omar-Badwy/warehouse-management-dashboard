import { useSelector } from "react-redux";
import styles from "../../styles/orders.module.css";
import { formatNumber } from "../../utils/formatNumber";
import { formatDate } from "../../utils/formatDate";
import { useContext, useState } from "react";
import useFilter from "../../hooks/useFilter";
import useSort from "../../hooks/useSort";
import EmptyState from "../empty/emptyState";
import SearchInput from "./searchInput";
import { orderModalContext } from "../../providers/orderModalProvider";
import { useNavigate } from "react-router-dom";

export default function OrdersTable() {

    const { openOrderModal } = useContext(orderModalContext)

    const navigate = useNavigate()
    
    const orders = useSelector( (state) => state.orders.orders)

    const clients = useSelector( (state) => state.clients.clients)

    const [search,setSearch] = useState("")
    
    const [filterBy,setFilterBy] = useState("client")

    const [sortBy,setSortBy] = useState("newest")
    
    const filteredOrders = useFilter(orders, filterBy,search);
    const sortedOrders = useSort(filteredOrders, sortBy);

    let rows;
    let emptyState

    if(filteredOrders.length === 0){
        if(orders.length > 0){

            emptyState = 

            <EmptyState
                icon="🔍"
                title="No Results Found"
                description="Try another search keyword."
            />
        }else if(orders.length === 0)
            emptyState = 

            <EmptyState
                icon="📦"
                title="No Orders Yet"
                description="Start by adding your first order."
                buttonText="Add order"
                onClick={() => openOrderModal("addOrder") }
            />
        
    }

    else{

         rows = sortedOrders?.map((order) => {
    
            const totalQuantity = order.products.reduce(
                (total, product) => total + Number(product.quantity),
                0
            )
    
            const orderTotal = order.products.reduce(
                (total, product) => total + Number(product.quantity) * Number(product.price),
                0
            )
    
            const client = clients.find(
                    (client) => client.id === order.clientId
                )
    
            return <tr key={order.id}>
                <td className={styles.orderId}>{`ORD-${order.id}`}</td>
                <td>{client.name}</td>
                <td>{totalQuantity}</td>
                <td>{formatNumber(orderTotal)} EGP</td>
                <td><span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>{order.status}</span></td>
                <td>{ formatDate(order.createdAt) }</td>
                <td><button className={styles.viewButton} 
                onClick={() => { navigate(`/orders/${order.id}`) }}>View</button></td>
            </tr>
        })
    }


  return (
        <main className={styles.page}>

            <section className={styles.tableContainer}>
                <div className={styles.toolbar}>
                     <SearchInput
                            search={search}
                            setSearch={setSearch}
                            setFilter={setFilterBy}
                            setSort={setSortBy}
                            filterBy={filterBy}
                            sortBy={sortBy}
                            type="twoInputsOrd"
                        />
                </div>

                <div className={styles.tableWrapper}>
                    {emptyState ? emptyState : 
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th><th>Client</th><th>Products</th><th>Total</th>
                                    <th>Status</th><th>Created At</th><th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { rows }
                            </tbody>
                        </table>
                     }

                </div>
            </section>
        </main>
  );
}