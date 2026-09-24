import { useMemo } from "react";
import { useSelector } from "react-redux";


export default function useSort(data, sortBy){

    const products = useSelector( (state) => state.products.products )

    const orders = useSelector( (state) => state.orders.orders )

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

            case "highest products":

                result.sort((a, b) => {
                    const getTotalProducts = (categoryId) =>
                        products
                            .filter((product) => product.categoryId === categoryId)
                            .reduce(
                                (total, product) => total + Number(product.count),
                                0
                            );

                    return getTotalProducts(b.id) - getTotalProducts(a.id);
                });

            break;

            case "lowest products":
                result.sort((a, b) => {
                    const getTotalProducts = (categoryId) =>
                        products
                            .filter((product) => product.categoryId === categoryId)
                            .reduce(
                                (total, product) => total + Number(product.count),
                                0
                            );

                    return getTotalProducts(a.id) - getTotalProducts(b.id);
                });

            break;

            case "highest orders":

                result.sort((a, b) => {
                    const getTotalOrders = (clientId) =>
                        orders
                            .filter((order) => order.clientId === clientId)
                            .length

                    return getTotalOrders(b.id) - getTotalOrders(a.id);
                });

            break;

            case "lowest orders":
                result.sort((a, b) => {
                    const getTotalOrders = (clientId) =>
                        orders
                            .filter((order) => order.clientId === clientId)
                            .length

                    return getTotalOrders(a.id) - getTotalOrders(b.id);
                });

            break;;

            default:
                break;
        }

        return result;

    },[data,sortBy,products,orders]);

    return sortedData;
}