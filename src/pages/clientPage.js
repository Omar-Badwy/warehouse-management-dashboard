import styles from "../styles/clientPage.module.css"
import style from "../styles/orders.module.css";

import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useMemo, useState, } from "react"

import { ModalsContext } from "../providers/modalsProvider"
import { orderModalContext } from "../providers/orderModalProvider";

import { formatNumber } from "../utils/formatNumber";
import { formatDate } from "../utils/formatDate";
import useFilter from "../hooks/useFilter";
import useSort from "../hooks/useSort";
import EmptyState from "../components/empty/emptyState";
import SearchInput from "../components/ui/searchInput";

export default function ClientPage () {

    const {clientId} = useParams()

    const navigate =  useNavigate()


    const {openModal} = useContext(ModalsContext)

    const { openOrderModal } = useContext(orderModalContext)

    
    const clients =  useSelector( (state) => state.clients.clients)

    const orders =  useSelector( (state) => state.orders.orders)
    
    const client = clients.find( (client) => client.id === clientId)


    const [search,setSearch] = useState("")
        
    const [filterBy,setFilterBy] = useState("order-id")

    const [sortBy,setSortBy] = useState("newest")


    useEffect( () => {

        if(!client){
            return  navigate("/error?type=clients")
        }
    },[client,navigate])

    const clientOrders = orders.filter( (order) => order.clientId === client.id)

    const productsCount = 
        useMemo( () => {

        return clientOrders.reduce((total, order) => {
            return (
              total +
              order.products.reduce((sum, item) => {
                return sum + Number(item.quantity);
              }, 0)
            );
          }, 0);

        }, [clientOrders])

    const filteredOrders = useFilter(clientOrders, filterBy,search);
    const sortedOrders = useSort(filteredOrders, sortBy);

    if(!client){
        return  null
    }

    const initials = client.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const items = [
        {id: 1, title: "full name", name: client.name},
        {id: 2, title: "Email", name: client.email},
        {id: 3, title: "Phone", name: client.phone},
        {id: 4, title: "Address", name: client.address},
        {id: 5, title: "Created At", name: client.createdAt},
        {id: 5, title: "Updated At", name: client.updatedAt ? client.updatedAt : "Not updated yet"},
        {id: 6, title: "orders", name: clientOrders.length},
        {id: 7, title: "products", name: productsCount},
    ]

    const itemsMap = items.map( (item) => {
        return(
            <div className={styles.item} key={item.id}>
                <span className={styles.label}>{item.title}</span>
                <div className={styles.value}>{item.name}</div>
            </div>
        )
    })


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
                <td className={style.orderId}>{`ORD-${order.id}`}</td>
                <td>{client.name}</td>
                <td>{totalQuantity}</td>
                <td>{formatNumber(orderTotal)} EGP</td>
                <td><span className={`${style.status} ${style[order.status.toLowerCase()]}`}>{order.status}</span></td>
                <td>{ formatDate(order.createdAt) }</td>
                <td><button className={style.viewButton} 
                onClick={() => { navigate(`/orders/${order.id}`) }}>View</button></td>
            </tr>
        })
    }

    return(
        <>
          <main className={styles.page}>
            <Link to={"/clients"} className={styles.back}>
                ← Back to clients
            </Link>

            <div className={styles.header}>
              <div>
                <h1>Client Details</h1>
                <p>View client information</p>
              </div>

              <div className={styles.actions}>
                <button className={`${styles.button} ${styles.editButton}`} onClick={ () => openModal("editClient",client) }>Edit client</button>
                <button className={`${styles.button} ${styles.deleteButton}`} onClick={ () => openModal("dltClient",client) }>
                  Delete
                </button>
              </div>
            </div>

            <main className={styles.body}>

              {/* # Client Card */}
              <section className={styles.card}>

                <div className={styles.cardHead}>
                  <div className={styles.avatar}>{initials}</div>

                  <div style={{textTransform:"capitalize"}}>
                    <h2>{client.name}</h2>
                    <span>Client ID: #{client.id}</span>
                  </div>
                </div>

                <div className={styles.info}> {itemsMap} </div>

                <div className={styles.footer}>
                  <span>Client information</span>
                  <span>Warehouse Dashboard</span>
                </div>

              </section>

              {/* # Client Orders */}
              <section className={style.tableContainer}>
                  <div className={style.toolbar}>
                      <SearchInput
                              search={search}
                              setSearch={setSearch}
                              setFilter={setFilterBy}
                              setSort={setSortBy}
                              filterBy={filterBy}
                              sortBy={sortBy}
                              type="clientOrderPage"
                          />
                  </div>

                  <div className={style.tableWrapper}>
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

          </main>
        </>
    )
}