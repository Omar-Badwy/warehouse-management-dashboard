import { useMemo } from "react";
import { useSelector } from "react-redux";


export default function useFilter(data, filterBy,search){

    const categories = useSelector( (state) => state.categories.categories )
    
    const filteredData = useMemo(()=>{

        let result = [...data];

        switch(filterBy){

            case "name":
                 result = search.trim() === "" ? result : result.filter( (client) => {
                    return client.name.toLowerCase().includes(search.toLowerCase())
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

            case "low stock":
                 result = result.filter( (product) => product.count <= 5)
                    break

            case "out of stock":
                 result = result.filter( (product) => product.count <= 0)
                    break

            default: 
                break
        }

        return result;

    },[data,filterBy,search,categories]);

    return filteredData;
}