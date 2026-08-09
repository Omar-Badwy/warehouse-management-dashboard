import styles from '../../styles/products.module.css'
import { useSelector } from 'react-redux'
import { useContext, useState } from 'react'
import { ModalsContext } from '../../providers/modalsProvider'
import { useNavigate } from 'react-router-dom'
import Table from '../table/table'
import EmptyState from '../empty/emptyState'
import SearchInput from './searchInput'

function CategoryTable () {

    // ? Variables

    const products = useSelector( (state) => state.products.products )

    const categories = useSelector( (state) => state.categories.categories )

    const navigate = useNavigate()

    const { openModal } = useContext(ModalsContext)

    const [search,setSearch] = useState("")

    const  filteredCategory = search.trim() === "" ? categories : categories.filter( (category) => {
            return category.name.toLowerCase().includes(search.toLowerCase())
        })
        
    let rows;
    let emptyState

    if(filteredCategory.length === 0){
        if(categories.length > 0){

            emptyState = 

            <EmptyState
                icon="🔍"
                title="No Results Found"
                description="Try another search keyword."
            />
        }else if(categories.length === 0)
          emptyState = 

            <EmptyState
                icon="📂"
                title="No Categyies Yet"
                description="Start by adding your first Category."
                buttonText="Add Category"
                onClick={() => openModal("addCategory")}
            />
        
    }
    else{

        emptyState = null
        rows = filteredCategory.map( (cat) => {
    
            const totalProducts = products
            .filter((product) => product.categoryId === cat.id)
            .reduce((total, product) => total + Number(product.count), 0);
    
            return(
                <tr key={cat.id}>
                    <td style={{textAlign:"start"}}>{cat.name}</td>
                    <td>{totalProducts}</td>
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
    }


console.log(emptyState,rows)
    return (
        <>
            <div className={styles.container}>

                <div className={styles.header}>
                    <span className={styles.tableTitle}>category</span>
                    <button className={styles.add} onClick={() => openModal("addCategory") }>add category</button>
                </div>

                <div className={styles.toolbar}>
                    <SearchInput search={search} setSearch={setSearch} />
                </div>

                { emptyState  ? emptyState : 
                    <Table columns={[
                        {name: "Category"},
                        {name: "Products"},
                        {name: "Created"},
                        {name: "Updated"},
                        {name: "actions"},
                        ]} rows={rows}/>
                }

            </div>
        </>
    );
}

export default CategoryTable;