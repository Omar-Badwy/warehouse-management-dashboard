import { Input } from '@mantine/core';
import styles from '../../styles/modals.module.css'
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { ModalsContext } from '../../providers/modalsProvider';

function InputModal ({inputValue,handleOnChange,errors,type}) {

    const categories = useSelector( (state) => state.categories.categories)

    const { modalOption } = useContext(ModalsContext)

    let renderContent ;

    const inputDataPro = 
            <>
                <Input.Wrapper key="1" classNames={{label: styles.label, error: styles.error}} 
                label="Name" error={errors.name}>

                    <Input type="text" name="name" className={styles.input} placeholder="your product name"  
                    value={inputValue.name} onChange={handleOnChange}/>
                </Input.Wrapper>

                <label style={{color:"white",fontSize:"20px",fontWeight:"600"}}>Category

                    {modalOption?.categoryId ? (

                        <input name='categoryId' className={styles.input} style={{marginLeft:"0",padding:"10px"}}
                            value={categories.find(cat => cat.id === modalOption.categoryId)?.name || ""}
                            disabled/>

                    ) : (

                        <select name="categoryId" className={styles.input} style={{padding:"10px"}}
                         value={inputValue.categoryId} onChange={handleOnChange}>

                            <option key={"select category"} value="select category" selected>{"select category"}</option>
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option> )}
                        </select>

                    )}
                </label>

                <Input.Wrapper key="2" classNames={{label: styles.label, error: styles.error}} 
                label="Price" error={errors.price}>

                    <Input type="number" name="price" className={styles.input} placeholder="price"  
                    value={inputValue.price} onChange={handleOnChange}/>
                </Input.Wrapper>

                <Input.Wrapper key="3" classNames={{label: styles.label, error: styles.error}} 
                label="Count" error={errors.count}>

                    <Input type="number" name="count" className={styles.input} placeholder="count"  
                    value={inputValue.count} onChange={handleOnChange}/>
                </Input.Wrapper>
            </>

    switch(type) {

        case "productPage": 
            renderContent = inputDataPro
            break;

        case "categoryPage": 
            renderContent = <Input.Wrapper key={"1"} classNames={{label: styles.label, error: styles.error}} 
            label={"category"} error={errors.category}>

                <Input type={"text"} name={"name"} className={styles.input} placeholder={"your category name"}  
                value={inputValue.name} onChange={handleOnChange}/>
            </Input.Wrapper>
            break;
        default :
            return null
    }

    return(
        <>
            {renderContent}
        </>
    )
}

export default InputModal