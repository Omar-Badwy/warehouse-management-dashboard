import ProductsCard from "../components/ui/productsCard";
import ProductsTable from "../components/ui/productsTable";


export default function Products () {

    return (
        <div style={{ display:"flex",flexDirection:"column",gap:"50px"}}>
            <ProductsCard/>
            <ProductsTable/>
        </div>
    )
}