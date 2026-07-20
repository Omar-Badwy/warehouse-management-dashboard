import { Input } from '@mantine/core';
import styles from '../../styles/modals.module.css'

function InputModal ({inputValue,handleOnChange,errors,}) {

    // console.log(productData)

    const inputData = [
        {id: 1, label: "Name", name: "name", type:"text", placeholder: "your product name",},
        {id: 2, label: "Category", name: "category", type:"text", placeholder: "chose category",},
        {id: 4, label: "Price", name: "price", type:"number", placeholder: "price",},
        {id: 3, label: "Count", name: "count", type:"number", placeholder: "count",},
    ]

    const inputDataMap = inputData.map( (inp) => {
        return(
            <Input.Wrapper key={inp.id} classNames={{label: styles.label, error: styles.error}} 
            label={inp.label} error={errors[inp.name]}>

                <Input type={inp.type} name={inp.name} className={styles.input} placeholder={inp.placeholder}  
                value={inputValue[inp.name]} onChange={handleOnChange}/>
            </Input.Wrapper>
        )
    } )

    return(
        <>
            {inputDataMap}
        </>
    )
}

export default InputModal