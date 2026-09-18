import { useSelector } from 'react-redux'
import styles from '../../styles/dashboard.module.css'
import useLargesCategory from '../../hooks/useLargestCategory'
import { useContext } from 'react'
import { ModalsContext } from '../../providers/modalsProvider'
import { formatNumber } from '../../utils/formatNumber'

function CategoryCards () {

    const { openModal } = useContext(ModalsContext)
    
    const products = useSelector( (state) => state.products.products )
    
    const categories = useSelector( (state) => state.categories.categories )

    const productsCount = products.reduce( (acc, current) => {
        return acc + Number(current.count)
    },0 )

    const categoryCount = categories.length

    const largestCategory = useLargesCategory(products)

    const cards = [
        {id: 1, title: "Total Categories", icon: <i style={{color:"white"}} className="fa-solid fa-table-cells-large"></i>, value: formatNumber(categoryCount),},
        {id: 2, title: "Total Products", icon: <i style={{color:"gray"}} className="fa-solid fa-cubes"></i>, value: formatNumber(productsCount),},
    ]

    const CardElements = cards.map( (card) => {

        return(
            <div key={card.id} className={styles.card}>

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
                    <h1>Categories</h1>
                    <p className={styles.subtitle}>Manage and track categories.</p>
                </div>
                <button className={styles.addButton} onClick={() => openModal("addCategory") }>+ Add Category</button>
            </header>

            <div className={styles.cards}>
                {CardElements}

                <div className={styles.card}
                style={{
                    width: "calc(200% + 20px)",
                }}>

                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                        <span style={{fontSize:"25px",marginBottom:"3px"}}>
                            {largestCategory ? largestCategory.name : "No Categories"} 
                            ({largestCategory ? formatNumber(largestCategory.productsCount) : 0})
                        </span>
                        <span style={{fontSize:"15px",color:"gray"}}>Largest Category</span>
                    </div>

                    <span style={{fontSize:"35px"}}><i style={{color:"gray"}} className="fa-solid fa-cubes"></i></span>

                </div>
            </div>
        </>
    )
}

export default CategoryCards;