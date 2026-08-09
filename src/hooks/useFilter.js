import { useMemo } from "react";


export default function useFilter(data, filterBy){

    const filteredData = useMemo(()=>{

        let result = [...data];

        switch(filterBy){

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

    },[data,filterBy]);

    return filteredData;
}