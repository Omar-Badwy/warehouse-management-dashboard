import CategoryCards from "../components/ui/categoryCards";
import CategoryTable from "../components/ui/categoryTable";


export default function Categories () {

    return (
        <div style={{ display:"flex",flexDirection:"column",gap:"50px"}}>
            <CategoryCards/>
            <CategoryTable/>
        </div>
    )
}