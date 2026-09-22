import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../redux/features/slices/notificationsSlice";

const LOW_STOCK_LIMIT = 5;

export default function StockNotifications() {

    const products = useSelector((state) => state.products.products);

    const dispatch = useDispatch();

    const previousProducts = useRef(new Map());

    useEffect(() => {
        for (const product of products) {
            
            const previousCount = previousProducts.current.get(product.id);
            const currentCount = product.count;

            // أول مرة نشوف المنتج
            if (previousCount === undefined) {
                previousProducts.current.set(product.id, currentCount);
                continue;
            }

            // Out of stock
            if (previousCount > 0 && currentCount === 0) {
                dispatch(
                    addNotification({
                        type: "warning",
                        title: "Out of Stock",
                        message: `Product "${product.name}" is empty.`,
                    })
                );
            }

            // Low stock
            else if (
                previousCount > LOW_STOCK_LIMIT &&
                currentCount <= LOW_STOCK_LIMIT &&
                currentCount > 0
            ) {
                dispatch(
                    addNotification({
                        type: "warning",
                        title: "Low Stock",
                        message: `Product "${product.name}" is running low. Only ${currentCount} items left.`,
                    })
                );
            }

            // تحديث الكمية القديمة
            previousProducts.current.set(product.id, currentCount);
        }
    }, [products, dispatch]);

    return null;
}