import { useSelector } from 'react-redux'
import styles from '../../styles/dashboard.module.css'
import { formatNumber } from '../../utils/formatNumber'

function Cards() {

    const products = useSelector( (state) => state.products.products )
    
    const productsCount = products.reduce( (acc, current) => {

        return acc + Number(current.count)
    },0 )

    const totalInventoryValue = products.reduce( (acc, current) => {

        return acc + Number(current.count * current.price)
    },0 )

    const card = [
        {id: 1, title: "Pound", icon: <i style={{color:"white"}} className="fa-solid fa-dollar"></i>, count: formatNumber( totalInventoryValue ), bgColor: "#005b8c", color:"white"},
        {id: 2, title: "Products", icon: <i style={{color:"gray"}} className="fa-solid fa-cubes"></i>, count: productsCount, bgColor: "white", color:"#005b8c"},
        {id: 3, title: "clints", icon: <i style={{color:"gray"}} className="fa-solid fa-users"></i>, count: 112, bgColor: "white", color:"#005b8c"},
        {id: 4, title: "orders", icon: <i style={{color:"gray"}} className="fa-solid fa-cart-flatbed"></i>, count: 24, bgColor: "white", color:"#005b8c",},
    ]

    const mapCard = card.map( (card) => {

        return(
            <div key={card.id} className={styles.card}
            style={{
                backgroundColor:`${card.bgColor}`,
                color:`${card.color}`,
                // width:"50%"
            }}>

                <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <span>{card.count}</span>
                    <span style={{fontSize:"15px",color:"gray"}}>{card.title}</span>
                </div>

                <span style={{fontSize:"35px"}}>{card.icon}</span>

            </div>
        )
    })

    return(
        // <div style={{
        //     width:"100%",
        //     display:"flex",
        //     alignItems:"center",
        //     justifyContent:"start",
        //     gap:"15px",
        //     flexWrap:"wrap"
        // }}>
        //     {mapCard}
        // </div>
        <div className={styles.cards}>
            {mapCard}
        </div>
    )
}

export default Cards;