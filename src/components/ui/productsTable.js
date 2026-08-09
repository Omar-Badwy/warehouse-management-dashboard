import styles from '../../styles/products.module.css'
import { useSelector } from 'react-redux'
import { useContext, useMemo, useState } from 'react'
import { ModalsContext } from '../../providers/modalsProvider'
import { formatNumber } from '../../utils/formatNumber'
import Table from '../table/table'
import EmptyState from '../empty/emptyState'
import useSort from '../../hooks/useSort'
import useFilter from '../../hooks/useFilter'
import SearchInput from './searchInput'

function ProductsTable () {

    // ? Variables

    const products = useSelector( (state) => state.products.products )

    const categories = useSelector( (state) => state.categories.categories )

    const { openModal } = useContext(ModalsContext)

    const [search,setSearch] = useState("")

    const [filterBy,setFilterBy] = useState("name")

    const [sortBy,setSortBy] = useState("Name (A-Z)")


    const displayedProducts =
    
    useMemo( () => {
        let result = [...products]

        // # filter

        switch(filterBy) {
            case "name":
                 result = search.trim() === "" ? result : result.filter( (product) => {
                    return product.name.toLowerCase().includes(search.toLowerCase())
                })
                break

            case "category":

                 result = search.trim() === "" ? result : result.filter( (product) => {

                    const category = categories.find( (cat) => {
                        return product.categoryId === cat.id
                    })
                    return category?.name.toLowerCase().includes(search.toLowerCase())

                })
                break

            default: 
                break
        }
        
        return result
    }, [search,categories,products,filterBy])
    
    const filteredProducts = useFilter(displayedProducts, filterBy);
    const sortedProducts = useSort(filteredProducts, sortBy);

    let rows;
    let emptyState

    if(displayedProducts.length === 0){
        if(products.length > 0){

            emptyState = 

            <EmptyState
                icon="🔍"
                title="No Results Found"
                description="Try another search keyword."
            />
        }else if(products.length === 0)
            emptyState = 

            <EmptyState
                icon="📦"
                title="No Products Yet"
                description="Start by adding your first product."
                buttonText="Add Product"
                onClick={() => openModal("addProduct")}
            />
        
    }
    else{

         rows = sortedProducts.map( (product) => {
        
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
    }

    return (
        <>
            <div className={styles.container}>

                <div className={styles.header}>
                    <span className={styles.tableTitle}>products</span>
                    <button className={styles.add} onClick={() => openModal("addProduct") }>add product</button>
                </div>

                <div className={styles.toolbar}>

                        <SearchInput
                            search={search}
                            setSearch={setSearch}
                            setFilter={setFilterBy}
                            setSort={setSortBy}
                            filterBy={filterBy}
                            sortBy={sortBy}
                            type="twoInputs"
                        />

                    <button className={styles.dltAll} onClick={() => openModal("deleteAllProduct")}>delete all</button>
                </div>
                {emptyState ? emptyState : 
                    <Table columns={[
                    {name: "name"},
                    {name: "Category"},
                    {name: "Price"},
                    {name: "Count"},
                    {name: "actions"},
                    ]} rows={rows}/>
                }
            </div>
        </>
    );
}

export default ProductsTable;