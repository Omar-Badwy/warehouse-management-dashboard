import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useParams } from "react-router-dom"

export default function CategoryGuard() {

    const { categoryId } = useParams()

    const categories = useSelector(
        (state) => state.categories.categories
    )

    const category = categories.find(
        (category) => category.id === categoryId
    )

    const hasLoadedCategory = useRef(false)

    useEffect(() => {
        if (category) {
            hasLoadedCategory.current = true
        }
    }, [category])

    if (!category && !hasLoadedCategory.current) {
        return <Navigate to="/error/categories" replace />
    }

    return <Outlet />
}