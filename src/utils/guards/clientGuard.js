import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useParams } from "react-router-dom"

export default function ClientGuard() {

    const { clientId } = useParams()

    const clients = useSelector(
        (state) => state.clients.clients
    )

    const client = clients.find(
        (client) => client.id === clientId
    )

    const hasLoadedCient = useRef(false)

    useEffect(() => {
        if (client) {
            hasLoadedCient.current = true
        }
    }, [client])

    if (!client && !hasLoadedCient.current) {
        return <Navigate to="/error/clients" replace />
    }

    return <Outlet />
}