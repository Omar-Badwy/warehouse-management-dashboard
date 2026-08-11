import { useSelector } from 'react-redux';
import styles from '../styles/products.module.css'
import style from '../styles/dashboard.module.css'

import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { ModalsContext } from '../providers/modalsProvider'
import { formatNumber } from '../utils/formatNumber';
import useFilter from '../hooks/useFilter';
import useSort from '../hooks/useSort';
import SearchInput from '../components/ui/searchInput';

function CategoryProductsPage () {

    const {categoryId} = useParams()

    // ? Variables
    
    const products = useSelector( (state) => state.products.products )
    
    const categories = useSelector( (state) => state.categories.categories )
    
    const { openModal } = useContext(ModalsContext)
    
    const navigate =  useNavigate()

    // # search / sort / filter states

    const [search,setSearch] = useState("")

    const [filterBy,setFilterBy] = useState("name")

    const [sortBy,setSortBy] = useState("newest")

    // # cards

    
    const category = categories.find( (cat) => categoryId === cat.id );

    useEffect(() => {
        if (!category) {
            navigate("/error?type=categories");
        }
    }, [category, navigate]);

    const CategoryProducts = category ? products
    .filter((product) => product.categoryId === category.id) : []

    const filteredProducts = useFilter(CategoryProducts, filterBy, search);
    const sortedProducts = useSort(filteredProducts, sortBy);

    const productsCount = CategoryProducts
        .reduce((total, product) => total + Number(product.count), 0);

    const totalPrice = CategoryProducts
        .reduce((total, product) => (Number(product.price) * Number(product.count)) + total, 0);
    
    // const MostExpensiveProduct = CategoryProducts
    //     .reduce( (most,current) => {
    //         return current.price > most.price ? current : most
    //     } )
    
    const rows = sortedProducts.map( (product) => {
        
        return(
            <tr key={product.id}>
                <td style={{textAlign:"start"}}>{product.name}</td>
                <td>{ formatNumber(product.price) }</td>
                <td>{product.count}</td>
                <td>{((Number(product.price) * Number(product.count))).toLocaleString()}</td>
                <td>
                    <div className={styles.actions}>
                        <div className={styles.editIcon} onClick={ () => openModal("editProduct",product) }> <i className="fa-solid fa-pen"></i> </div>
                        <div className={styles.dltIcon} onClick={ () => openModal("deleteProduct",product) }> <i className="fa-solid fa-trash"></i> </div>
                    </div>
                </td>
            </tr>
            )
        } )    

    const cards = [
        {id: 1, title: "Total Value", icon: <i style={{color:"white"}} className="fa-solid fa-dollar"></i>, value: totalPrice.toLocaleString(), bgColor: "#005b8c", color:"white"},
        {id: 2, title: "Total Products", icon: <i style={{color:"gray"}} className="fa-solid fa-cubes"></i>, value: productsCount, bgColor: "white", color:"#005b8c"},
        // {id: 3, title: "most expensive product", icon: <i style={{color:"gray"}} className="fa-solid fa-cubes"></i>, value: MostExpensiveProduct.price, bgColor: "white", color:"#005b8c"},
    ]

    const CardElements = cards.map( (card) => {

        return(
            <div key={card.id} className={style.card}
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
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:"40px"}}>
                <span style={{fontSize:"50px",color:"#005B8C",fontWeight:"600"}}>{category ? category.name : null}</span>
                <span style={{fontSize:"15px",color:"#3d4143db"}}>{productsCount} products</span>
            </div>

            <div className={style.cards} style={{marginBottom:"50px"}}>
                {CardElements}
            </div>

            <div className={styles.container}>

                <div className={styles.header}>
                    <span className={styles.tableTitle}>{category ? category.name : null}</span>
                    <button className={styles.add} onClick={() => openModal("addProduct",null,{categoryId,}) }>add product</button>
                </div>

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

                    <button className={styles.dltAll} onClick={() => openModal("deleteAllProductWithCatId",categoryId,null)}>delete all</button>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th style={{textAlign:"start",padding:"0 20px"}}>product name</th>
                            <th>Price</th>
                            <th>Count</th>
                            <th>total value</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default CategoryProductsPage;