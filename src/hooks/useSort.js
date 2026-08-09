import { useMemo } from "react";


export default function useSort(data, sortBy){

    const sortedData = useMemo(()=>{

        let result = [...data];

        switch(sortBy){

            case "Name (A-Z)":
                result.sort((a,b)=>a.name.localeCompare(b.name));
                break;

            case "Name (Z-A)":
                result.sort((a,b)=>b.name.localeCompare(a.name));
                break;

            case "Highest Price":
                result.sort((a,b)=>b.price-a.price);
                break;

            case "Lowest Price":
                result.sort((a,b)=>a.price-b.price);
                break;

            case "Highest Quantity":
                result.sort((a,b)=>b.count-a.count);
                break;

            case "Lowest Quantity":
                result.sort((a,b)=>a.count-b.count);
                break;

            case "Category (A-Z)":
                result.sort((a,b)=>a.categoryId.localeCompare(b.categoryId));
                break;

            case "Category (Z-A)":
                result.sort((a,b)=>b.categoryId.localeCompare(a.categoryId));
                break;

            default:
                break;
        }

        return result;

    },[data,sortBy]);

    return sortedData;
}