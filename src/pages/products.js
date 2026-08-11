import ProductsCard from "../components/ui/productsCard";
import ProductsTable from "../components/ui/productsTable";
import styles from "../styles/products.module.css"

export default function Products () {

    return (
        <div style={{ display:"flex",flexDirection:"column",gap:"50px"}} className={styles.page}>
            <ProductsCard/>
            <ProductsTable/>
        </div>
    )
}