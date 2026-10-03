import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useParams } from "react-router-dom"

export default function OrderGuard() {

    const { orderId } = useParams()

    const orders = useSelector(
        (state) => state.orders.orders
    )

    const order = orders.find(
        (order) => order.id === orderId
    )

    const hasLoadedOrder = useRef(false)

    useEffect(() => {
        if (order) {
            hasLoadedOrder.current = true
        }
    }, [order])

    if (!order && !hasLoadedOrder.current) {
        return <Navigate to="/error/orders" replace />
    }

    return <Outlet />
}