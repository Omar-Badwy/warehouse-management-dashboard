import { useSelector } from 'react-redux'
import styles from '../../styles/dashboard.module.css'
import { formatNumber } from '../../utils/formatNumber'

function Cards() {

    const products = useSelector( (state) => state.products.products )

    const orders = useSelector( (state) => state.orders.orders )

    const clients = useSelector( (state) => state.clients.clients )
    
    const productsCount = products.reduce( (acc, current) => {
        return acc + Number(current.count)
    },0 )

    const totalOrders = orders.length

    const totalClients = clients.length

    const totalInventoryValue = products.reduce( (acc, current) => {
        return acc + Number(current.count * current.price)
    },0 )

    const card = [
        {id: 1, title: "Inventory Value", icon: <i style={{color:"white"}} className="fa-solid fa-dollar"></i>, count: formatNumber( totalInventoryValue ),},
        {id: 2, title: "Total Products", icon: <i style={{color:"gray"}} className="fa-solid fa-cubes"></i>, count: formatNumber(productsCount) ,},
        {id: 3, title: "Total Clints", icon: <i style={{color:"gray"}} className="fa-solid fa-users"></i>, count: formatNumber(totalClients) ,},
        {id: 4, title: "Orders", icon: <i style={{color:"gray"}} className="fa-solid fa-cart-flatbed"></i>, count: formatNumber(totalOrders) ,},
    ]

    const mapCard = card.map( (card) => {

        return(
            <div key={card.id} className={styles.card}>

                <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <span>{card.count}</span>
                    <span style={{fontSize:"15px",color:"gray"}}>{card.title}</span>
                </div>

                <span style={{fontSize:"35px"}}>{card.icon}</span>

            </div>
        )
    })

    return(
        <div className={styles.cards}>
            {mapCard}
        </div>
    )
}

export default Cards;