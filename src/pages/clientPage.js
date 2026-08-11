import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import styles from "../styles/clientPage.module.css"
import { useContext, useEffect } from "react"
import { ModalsContext } from "../providers/modalsProvider"

export default function ClientPage () {

    const {clientId} = useParams()
    
    const clients =  useSelector( (state) => state.clients.clients)
    
    const client = clients.find( (client) => client.id === clientId)

    const {openModal} = useContext(ModalsContext)

    const navigate =  useNavigate()

    useEffect( () => {

        if(!client){
            return  navigate("/error?type=clients")
        }
    },[client,navigate])

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
    ]

    const itemsMap = items.map( (item) => {
        return(
            <div className={styles.item} key={item.id}>
                <span className={styles.label}>{item.title}</span>
                <div className={styles.value}>{item.name}</div>
            </div>
        )
    })
    return(
        <>
    <div className={styles.page}>
        <Link to={"/clients"} className={styles.back}>
            ← Back to clients
        </Link>

      <div className={styles.header}>
        <div>
          <h1>Client Details</h1>
          <p>View client information</p>
        </div>

        <div className={styles.actions}>
          <button className={styles.button} onClick={ () => openModal("editClient",client) }>Edit client</button>
          <button className={`${styles.button} ${styles.deleteButton}`} onClick={ () => openModal("dltClient",client) }>
            Delete
          </button>
        </div>
      </div>

      <section className={styles.card}>

        <div className={styles.cardHead}>
          <div className={styles.avatar}>{initials}</div>

          <div style={{textTransform:"capitalize"}}>
            <h2>{client.name}</h2>
            <span>Client ID: #{client.id}</span>
          </div>
        </div>

        <div className={styles.info}>

          {itemsMap}

          <div className={styles.item}>
            <span className={styles.label}>Updated At</span>
            <div className={styles.value}>{client.updatedAt ? client.updatedAt : "Not updated yet"}</div>
          </div>

        </div>

        <div className={styles.footer}>
          <span>Client information</span>
          <span>Warehouse Dashboard</span>
        </div>

      </section>
    </div>
        </>
    )
}