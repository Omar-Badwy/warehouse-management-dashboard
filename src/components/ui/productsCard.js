import { useSelector } from 'react-redux'
import styles from '../../styles/dashboard.module.css'
import { formatNumber } from '../../utils/formatNumber'
import { useContext } from 'react'
import { ModalsContext } from '../../providers/modalsProvider'

function ProductsCard () {

    const { openModal } = useContext(ModalsContext)
    
    const products = useSelector( (state) => state.products.products )

    const productsCount = products.reduce( (acc, current) => {

        return acc + Number(current.count)
    },0 )

    const totalInventoryValue = products.reduce( (acc, current) => {

        return acc + Number(current.count * current.price)
    },0 )

    const cards = [
        {id: 2, title: "Products", icon: <i style={{color:"white"}} className="fa-solid fa-cubes"></i>, value: productsCount, bgColor: "#005b8c", color:"white"},
        {id: 1, title: "Pound", icon: <i style={{color:"gray"}} className="fa-solid fa-dollar"></i>, value: formatNumber(totalInventoryValue) , bgColor: "white", color:"#005b8c"},
    ]

    const CardElements = cards.map( (card) => {

        return(
            <div key={card.id} className={styles.card}
            style={{
                backgroundColor:`${card.bgColor}`,
                color:`${card.color}`,
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
        <>
            <header className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>WAREHOUSE</p>
                    <h1>products</h1>
                    <p className={styles.subtitle}>Manage and track products.</p>
                </div>
                <button className={styles.addButton} onClick={() => openModal("addProduct") }>+ Add Product</button>
            </header>
            
            <div className={styles.cards}>
                {CardElements}
            </div>
        </>
    )
}

export default ProductsCard;