import styles from '../../styles/products.module.css'
import { useSelector } from 'react-redux'
import { useContext, useState } from 'react'
import { ModalsContext } from '../../providers/modalsProvider'
import { useNavigate } from 'react-router-dom'

function CategoryTable () {

    // ? Variables

    const products = useSelector( (state) => state.products.products )

    const categories = useSelector( (state) => state.categories.categories )

    const { openModal } = useContext(ModalsContext)

    const [search,setSearch] = useState("")

    const  filteredCategory = search.trim() === "" ? categories : categories.filter( (category) => {
            return category.name.toLowerCase().includes(search.toLowerCase())
        })

    // const categoriesWithCount = useMemo(() => {
    //     categories.map((category) => ({
    //         ...category,
    //         productsCount: products
    //             .filter((product) => product.category === category.category)
    //             .reduce((total, product) => total + Number(product.count), 0),
    //     }))

    // }, [categories, products]);
        
    const navigate = useNavigate()

    const rows = filteredCategory.map( (cat) => {

        const productsCount = products
        .filter((product) => product.categoryId === cat.id)
        .reduce((total, product) => total + Number(product.count), 0);

        return(
            <tr key={cat.id}>
                <td style={{textAlign:"start"}}>{cat.name}</td>
                <td>{productsCount}</td>
                <td>{cat.created}</td>
                <td>{cat.updated ? cat.updated : "No updated"}</td>
                <td>
                    <div className={styles.actions}>
                        <div className={styles.editIcon} onClick={ () => openModal("editCategory",cat,{}) }> <i className="fa-solid fa-pen"></i> </div>
                        <div className={styles.dltIcon} onClick={ () => openModal("deleteCategory",cat,{}) }> <i className="fa-solid fa-trash"></i> </div>
                        <div className={styles.viewIcon} onClick={() => {
                            navigate(`/categories/${cat.id}`) }}> <i className="fa-solid fa-eye"></i> </div>
                    </div>
                </td>
            </tr>
        )
    } )


    return (
        <>
            <div className={styles.container}>

                <div className={styles.header}>
                    <span className={styles.tableTitle}>category</span>
                    <button className={styles.add} onClick={() => openModal("addCategory") }>add category</button>
                </div>

                <div className={styles.toolbar}>

                    <div className={styles.searchSection}>
                        <input type='search' placeholder='search' className={styles.inpSearch} 
                         value={search} onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th style={{textAlign:"start",padding:"0 20px"}}>Category</th>
                            <th>Products</th>
                            <th>Created</th>
                            <th>Updated</th>
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

export default CategoryTable;