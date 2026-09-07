import styles from '../../styles/products.module.css'
import { useSelector } from 'react-redux'
import { useContext, useState } from 'react'
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

    const [sortBy,setSortBy] = useState("newest")
    
    const filteredProducts = useFilter(products, filterBy,search);
    const sortedProducts = useSort(filteredProducts, sortBy);

    let rows;
    let emptyState

    if(filteredProducts.length === 0){
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

                <div className={styles.toolbar}>

                        <SearchInput
                            search={search}
                            setSearch={setSearch}
                            setFilter={setFilterBy}
                            setSort={setSortBy}
                            filterBy={filterBy}
                            sortBy={sortBy}
                            type="twoInputsPro"
                        />

                    <button className={styles.dltAll} onClick={() => openModal("deleteAllProduct")}>delete all</button>
                </div>
                <div className={styles.tableWrap}>
                    {emptyState ? emptyState : 
                        <Table columns={[
                        {name: "name"},
                        {name: "Category"},
                        {name: "Price"},
                        {name: "Stock "},
                        {name: "actions"},
                        ]} rows={rows}/>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductsTable;