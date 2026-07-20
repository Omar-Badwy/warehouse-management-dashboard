import styles from '../../styles/products.module.css'
import { useSelector } from 'react-redux'
import { useContext, useState } from 'react'
import { ModalsContext } from '../../providers/modalsProvider'

function ProductsTable () {

    // ? Variables

    let products = useSelector( (state) => state.products.products )

    const { openModal } = useContext(ModalsContext)

    const [search,setSearch] = useState("")

    const [searchWay,setSearchWay] = useState("name")

    let filteredProducts
    
    if(searchWay === "name") {

            filteredProducts = search.trim() === "" ? products : products.filter( (product) => {
            return product.name.includes(search.toLowerCase())
        })
        

    }else if(searchWay === "category") {

            filteredProducts = search.trim() === "" ? products : products.filter( (product) => {
            return product.category.includes(search.toLowerCase())
        })

    }

    const rows = filteredProducts.map( (row) => {

        return(
            <tr key={row.id}>
                <td style={{textAlign:"start"}}>{row.name}</td>
                <td>{row.category}</td>
                <td>{row.price}</td>
                <td>{row.count}</td>
                <td>
                    <div className={styles.actions}>
                        <div className={styles.editIcon} onClick={ () => openModal("edit",row) }> <i class="fa-solid fa-pen"></i> </div>
                        <div className={styles.dltIcon} onClick={ () => openModal("delete",row) }> <i class="fa-solid fa-trash"></i> </div>
                    </div>
                </td>
            </tr>
        )
    } )


    return (
        <>
            <div className={styles.products}>

                <div className={styles.header}>
                    <span className={styles.tableTitle}>products</span>
                    <button className={styles.add} onClick={() => openModal("add") }>add product</button>
                </div>

                <div className={styles.toolbar}>

                    <div className={styles.searchSection}>
                        <input type='search' placeholder='search' className={styles.inpSearch} 
                         value={search.value} onChange={(e) => setSearch(e.target.value)}/>

                        <div className={styles.searchInputs}>
                            <button className={searchWay === "name" ? styles.active : ""}
                             onClick={ () => setSearchWay("name") }>name</button>

                            <button onClick={ () => setSearchWay("category") } 
                            className={searchWay === "category" ? styles.active : ""}>category</button>
                        </div>
                    </div>
                    <button className={styles.dltAll} onClick={() => openModal("deleteAll")}>delete all</button>
                </div>

                <table className={styles.table}>
                    <thead>
                        <th style={{textAlign:"start",padding:"0 20px"}}>name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Count</th>
                        <th>actions</th>
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