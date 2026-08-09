import styles from '../../styles/products.module.css'


export default function SelectInputSearch ({data,value,onChange,children}) {

    const dataOptions = data.map( (option) => {
        return(
            <option key={option.id} value={option.name}>{option.name}</option>
        )
    })

    return(
        <>
            <select className={styles.select} value={value} 
                onChange={onChange}>

                {children}
                {dataOptions}
            </select>
        </>
    )
}