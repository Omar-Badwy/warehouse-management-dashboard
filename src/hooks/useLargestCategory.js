import { useMemo } from "react";
import { useSelector } from "react-redux";


export default function useLargesCategory (products) {

    const categories = useSelector( (state) => state.categories.categories )

    const categoriesWithCount = useMemo(() => {
    
        return categories.map((category) => {

                const productsCount = products
                    .filter((product) => product.categoryId === category.id)
                    .reduce((total, product) => total + Number(product.count), 0);

                return {
                    ...category,
                    productsCount,
                };
            });

    }, [categories, products]);


    const largestCategory = useMemo(() => {

        if (categoriesWithCount.length === 0) return null;

        return categoriesWithCount.reduce((largest, current) => {

        return current.productsCount > largest.productsCount ? current : largest;

        });

    }, [categoriesWithCount]);

    return largestCategory
}