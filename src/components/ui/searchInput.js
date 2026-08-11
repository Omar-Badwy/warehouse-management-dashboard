import { useMemo } from 'react'
import styles from '../../styles/products.module.css'
import SelectInputSearch from '../inputs/selectInputSearch'


export default function SearchInput ({search,setSearch,setFilter,setSort,filterBy,sortBy,type}) {

    const filterProData = [
        {id: 1, name: "name"},
        {id: 2, name: "category"},
        {id: 3, name: "low stock"},
        {id: 4, name: "out of stock"},
    ]

    const SortProData = [
        {id: 1, name: "name (A-Z)"},
        {id: 2, name: "name (Z-A)"},
        {id: 3, name: "newest"},
        {id: 4, name: "oldest"},
        {id: 5, name: "highest price"},
        {id: 6, name: "lowest price"},
        {id: 7, name: "highest quantity"},
        {id: 8, name: "lowest quantity"},
    ]

    const SortClientData = [
        {id: 1, name: "name (A-Z)"},
        {id: 2, name: "name (Z-A)"},
        {id: 3, name: "newest"},
        {id: 4, name: "oldest"},
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
                case "twoInputsPro":
                    return <>
                        <SelectInputSearch data={filterProData} value={filterBy} onChange={handleFilterChange} >
                            <option value="search by">{"search by"}</option>
                        </SelectInputSearch>

                        <SelectInputSearch data={SortProData} value={sortBy} onChange={handleSortChange} >
                            <option value="sort by">{"sort by"}</option>
                        </SelectInputSearch>
                    </>

                case "filter":
                    return <>
                        <SelectInputSearch data={filterProData} value={filterBy} onChange={handleFilterChange} >
                            <option value="search by">{"search by"}</option>
                        </SelectInputSearch>

                    </>

                case "sort":
                    return <>
                        <SelectInputSearch data={SortClientData} value={sortBy} onChange={handleSortChange} >
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