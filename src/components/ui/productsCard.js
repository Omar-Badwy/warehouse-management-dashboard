import { useSelector } from 'react-redux'
import styles from '../../styles/dashboard.module.css'


function ProductsCard () {

    const products = useSelector( (state) => state.products.products )

    const productsCount = products.reduce( (acc, current) => {

        return acc + Number(current.count)
    },0 )

    const totalInventoryValue = products.reduce( (acc, current) => {

        return acc + Number(current.count * current.price)
    },0 )

    // console.log(totalInventoryValue)

    const cards = [
        {id: 2, title: "Products", icon: <i style={{color:"white"}} className="fa-solid fa-cubes"></i>, value: productsCount, bgColor: "#005b8c", color:"white"},
        {id: 1, title: "Pound", icon: <i style={{color:"gray"}} className="fa-solid fa-coins"></i>, value: `${totalInventoryValue}$`, bgColor: "white", color:"#005b8c"},
    ]

    const CardElements = cards.map( (card) => {

        return(
            <div key={card.id} className={styles.card}
            style={{
                backgroundColor:`${card.bgColor}`,
                color:`${card.color}`,
                width:"50%"
            }}>

                <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <span>{card.value}</span>
                    <span style={{fontSize:"15px",color:"gray"}}>{card.title}</span>
                </div>

                <span style={{fontSize:"35px"}}>{card.icon}</span>

            </div>
        )
    })
    

    return(
        <div style={{
            width:"100%",
            display:"flex",
            alignItems:"center",
            justifyContent:"start",
            gap:"15px",
            flexWrap:"wrap"
        }}>
            {CardElements}
        </div>
    )
}

export default ProductsCard;