import styles from '../../styles/products.module.css'
import { useSelector } from 'react-redux'
import { useContext, useState } from 'react'
import { ModalsContext } from '../../providers/modalsProvider'
import { formatNumber } from '../../utils/formatNumber'

function ProductsTable () {

    // ? Variables

    const products = useSelector( (state) => state.products.products )

    const categories = useSelector( (state) => state.categories.categories )

    const { openModal } = useContext(ModalsContext)

    const [search,setSearch] = useState("")

    const [searchWay,setSearchWay] = useState("name")

    let filteredProducts;
    
    if(searchWay === "name") {

            filteredProducts = search.trim() === "" ? products : products.filter( (product) => {
            return product.name.includes(search.toLowerCase())
        })
        

    }else if(searchWay === "category") {
        
            filteredProducts = search.trim() === "" ? products : products.filter( (product) => {

                const category = categories.find( (cat) => {
                    return product.categoryId === cat.id
                })
            return category?.name.toLowerCase().includes(search.toLowerCase())
            
        })

    }

    const rows = filteredProducts.map( (product) => {

        const category = categories.find(
            (cat) => cat.id === product.categoryId
        );

        return(
            <tr key={product.id}>
                <td style={{textAlign:"start"}}>{product.name}</td>
                <td>{category.name}</td>
                <td>{ formatNumber(product.price) }</td>
                <td>{product.count}</td>
                <td>
                    <div className={styles.actions}>
                        <div className={styles.editIcon} onClick={ () => openModal("editProduct",product) }> <i className="fa-solid fa-pen"></i> </div>
                        <div className={styles.dltIcon} onClick={ () => openModal("deleteProduct",product) }> <i className="fa-solid fa-trash"></i> </div>
                    </div>
                </td>
            </tr>
        )
    } )


    return (
        <>
            <div className={styles.container}>

                <div className={styles.header}>
                    <span className={styles.tableTitle}>products</span>
                    <button className={styles.add} onClick={() => openModal("addProduct") }>add product</button>
                </div>

                <div className={styles.toolbar}>

                    <div className={styles.searchSection}>
                        <input type='search' placeholder='search' className={styles.inpSearch} 
                         value={search} onChange={(e) => setSearch(e.target.value)}/>

                        <div className={styles.searchInputs}>
                            <button className={searchWay === "name" ? styles.active : ""}
                             onClick={ () => setSearchWay("name") }>name</button>

                            <button onClick={ () => setSearchWay("category") } 
                            className={searchWay === "category" ? styles.active : ""}>category</button>
                        </div>
                    </div>
                    <button className={styles.dltAll} onClick={() => openModal("deleteAllProduct")}>delete all</button>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th style={{textAlign:"start",padding:"0 20px"}}>name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Count</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

            </div>
        </>
    );
}

export default ProductsTable;