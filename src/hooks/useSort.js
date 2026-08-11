import { useMemo } from "react";


export default function useSort(data, sortBy){

    const sortedData = useMemo(()=>{

        let result = [...data];

        switch(sortBy){

            case "name (A-Z)":
                result.sort((a,b)=>a.name.localeCompare(b.name));
                break;

            case "name (Z-A)":
                result.sort((a,b)=>b.name.localeCompare(a.name));
                break;

            case "highest price":
                result.sort((a,b)=>b.price-a.price);
                break;

            case "lowest price":
                result.sort((a,b)=>a.price-b.price);
                break;

            case "highest quantity":
                result.sort((a,b)=>b.count-a.count);
                break;

            case "lowest quantity":
                result.sort((a,b)=>a.count-b.count);
                break;

            case "category (A-Z)":
                result.sort((a,b)=>a.categoryId.localeCompare(b.categoryId));
                break;

            case "category (Z-A)":
                result.sort((a,b)=>b.categoryId.localeCompare(a.categoryId));
                break;

            case "newest": 
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) );
                break;

            case "oldest": 
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt) );
                break;

            default:
                break;
        }

        return result;

    },[data,sortBy]);

    return sortedData;
}