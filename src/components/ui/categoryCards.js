import { useSelector } from 'react-redux'
import styles from '../../styles/dashboard.module.css'
import { useMemo } from 'react'


function CategoryCards () {

    const products = useSelector( (state) => state.products.products )
    
    const categories = useSelector( (state) => state.categories.categories )

    const productsCount = products.reduce( (acc, current) => {

        return acc + Number(current.count)
    },0 )

    const categoryCount = categories.length

    const categoriesWithCount = useMemo(() => {

        return categories.map((category) => {

                const productsCount = products
                    .filter((product) => product.categoryId === category.id)
                    .reduce((total, product) => total + Number(product.count), 0);

                return {
                    ...category,
                    productsCount,
                };
            });

    }, [categories, products]);


    const largestCategory = useMemo(() => {

        if (categoriesWithCount.length === 0) return null;

        return categoriesWithCount.reduce((largest, current) => {

        return current.productsCount > largest.productsCount ? current : largest;

        });

    }, [categoriesWithCount]);

    const cards = [
        {id: 1, title: "Total Categories", icon: <i style={{color:"white"}} className="fa-solid fa-table-cells-large"></i>, value: categoryCount, bgColor: "#005b8c", color:"white"},
        {id: 2, title: "Total Products", icon: <i style={{color:"gray"}} className="fa-solid fa-cubes"></i>, value: productsCount, bgColor: "white", color:"#005b8c"},
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
        <div className={styles.cards}>
            {CardElements}

            <div className={styles.card}
            style={{
                backgroundColor:`white`,
                color:`#005b8c`,
                width: "calc(200% + 20px)"
            }}>

                <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <span style={{fontSize:"25px",marginBottom:"3px"}}>
                        {largestCategory ? largestCategory.name : "No Categories"} 
                        ({largestCategory ? largestCategory.productsCount : 0})
                    </span>
                    <span style={{fontSize:"15px",color:"gray"}}>Largest Category</span>
                </div>

                <span style={{fontSize:"35px"}}><i style={{color:"gray"}} className="fa-solid fa-cubes"></i></span>

            </div>
        </div>
    )
}

export default CategoryCards;