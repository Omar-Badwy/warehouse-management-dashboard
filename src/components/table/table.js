import styles from '../../styles/products.module.css'

export default function Table ({columns,rows}) {

    const columnsMap = columns.map( (col) => {
        return (
            <th key={col.name} >{col.name}</th>
        )
    })

    return (
        <>
        <table className={styles.table}>
            <thead>
                <tr>{columnsMap}</tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
        </table>
        </>
    )
}