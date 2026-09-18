import styles from '../../styles/products.module.css'
import { useSelector } from 'react-redux'
import { useContext, useState } from 'react'
import { ModalsContext } from '../../providers/modalsProvider'
import Table from '../table/table'
import EmptyState from '../empty/emptyState'
import useSort from '../../hooks/useSort'
import useFilter from '../../hooks/useFilter'
import SearchInput from './searchInput'
import { useNavigate } from 'react-router-dom'
import { formatNumber } from '../../utils/formatNumber'

function ClientsTable () {

    // ? Variables

    const clients = useSelector( (state) => state.clients.clients )

    const orders = useSelector( (state) => state.orders.orders )

    const navigate = useNavigate()

    const { openModal } = useContext(ModalsContext)

    const [search,setSearch] = useState("")

    const [filterBy,setFilterBy] = useState("name")

    const [sortBy,setSortBy] = useState("newest")

    const totalClients = clients.length
    
    const filteredClients = useFilter(clients, filterBy,search);
    const sortedClients = useSort(filteredClients, sortBy);

    let rows;
    let emptyState

    if(filteredClients.length === 0){
        if(clients.length > 0){

            emptyState = 

            <EmptyState
                icon="🔍"
                title="No Results Found"
                description="Try another search keyword."
            />
        }else if(clients.length === 0)
            emptyState = 

            <EmptyState
                icon="📦"
                title="No Clients Yet"
                description="Start by adding first client."
                buttonText="Add Client"
                onClick={() => openModal("addClient")}
            />
        
    }
    else{

         rows = sortedClients.map( (client) => {
    
            const clientOrders = orders.filter( (order) => order.clientId === client.id) 
        
          const totalOrders = clientOrders.length
            return(
                <tr key={client.id}>
                    <td style={{textAlign:"start"}}>{client.name}</td>
                    <td>{client.phone}</td>
                    <td>{client.address}</td>
                    <td>{formatNumber(totalOrders)}</td>
                    <td>
                        <div className={styles.actions}>
                            <div className={styles.editIcon} onClick={ () => openModal("editClient",client) }> <i className="fa-solid fa-pen"></i> </div>
                            <div className={styles.dltIcon} onClick={ () => openModal("dltClient",client) }> <i className="fa-solid fa-trash"></i> </div>
                            <div className={styles.viewIcon} onClick={() => {
                                navigate(`/clients/${client.id}`) }}> <i className="fa-solid fa-eye"></i> </div>
                        </div>
                    </td>
                </tr>
            )
        } )
    }

    return (
        <div className={styles.page}>

            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:"40px"}}>
                <span style={{fontSize:"50px",color:"#005B8C",fontWeight:"600"}}>clients</span>
                <span style={{fontSize:"18px",color:"#3d4143db"}}>{totalClients}</span>
            </div>
            
            <div className={styles.container}>

                <div className={styles.header}>
                    <span className={styles.tableTitle}>clients</span>
                    <button className={styles.add} onClick={() => openModal("addClient") }>Add Client</button>
                </div>

                <div className={styles.toolbar}>
                        <SearchInput
                            search={search}
                            setSearch={setSearch}
                            setFilter={setFilterBy}
                            setSort={setSortBy}
                            filterBy={filterBy}
                            sortBy={sortBy}
                            type="sort"
                        />
                </div>
                <div className={styles.tableWrap}>
                    {emptyState ? emptyState : 
                        <Table columns={[
                        {name: "name"},
                        {name: "phone"},
                        {name: "address"},
                        {name: "total Orders"},
                        {name: "actions"},
                        ]} rows={rows}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default ClientsTable;