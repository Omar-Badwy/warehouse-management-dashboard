import { useMemo } from 'react'
import styles from '../../styles/products.module.css'
import SelectInputSearch from '../inputs/selectInputSearch'


export default function SearchInput ({search,setSearch,setFilter,setSort,filterBy,sortBy,type}) {

    const filterData = [
        {id: 1, name: "name"},
        {id: 2, name: "category"},
        {id: 3, name: "low stock"},
        {id: 4, name: "out of stock"},
    ]

    const SortData = [
        {id: 1, name: "Name (A-Z)"},
        {id: 2, name: "Name (Z-A)"},
        {id: 3, name: "Lowest Price"},
        {id: 4, name: "Highest Price"},
        {id: 5, name: "Lowest Quantity"},
        {id: 6, name: "Highest Quantity"},
        {id: 8, name: "Category (A-Z)"},
        {id: 9, name: "Category (Z-A)"},
    ]

    function handleFilterChange (e) {
        setFilter(e.target.value)
    }

    function handleSortChange (e) {
       setSort( e.target.value)
    }

    const renderInputs = 

        useMemo( () => {

            switch(type) {
                case "twoInputs":
                    return <>
                        <SelectInputSearch data={filterData} value={filterBy} onChange={handleFilterChange} >
                            <option value="search by">{"search by"}</option>
                        </SelectInputSearch>

                        <SelectInputSearch data={SortData} value={sortBy} onChange={handleSortChange} >
                            <option value="sort by">{"sort by"}</option>
                        </SelectInputSearch>
                    </>

                case "filter":
                    return <>
                        <SelectInputSearch data={filterData} value={filterBy} onChange={handleFilterChange} >
                            <option value="search by">{"search by"}</option>
                        </SelectInputSearch>

                    </>

                case "sort":
                    return <>
                        <SelectInputSearch data={SortData} value={sortBy} onChange={handleSortChange} >
                            <option value="sort by">{"sort by"}</option>
                        </SelectInputSearch>
                    </>

                default: 
                    return null
            }

        },[type,filterBy,sortBy,handleSortChange])

    return (
        <>
            <div className={styles.searchSection}>
                <input type='search' placeholder='search' className={styles.inpSearch}
                    value={search} onChange={(e) => setSearch(e.target.value)}/>

                <div className={styles.searchInputs}>
                    {renderInputs}
                </div>

            </div>
        </>
    )
}