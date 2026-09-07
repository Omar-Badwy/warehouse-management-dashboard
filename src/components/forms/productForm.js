import { useContext } from "react";
import TextInput from "../inputs/textInput";
import { ModalsContext } from "../../providers/modalsProvider";
import SelectInput from "../inputs/selectIputModal";
import styles from "../../styles/modals.module.css"


function ProductForm () {

    const { productInput, setProductInput, errors, } = useContext(ModalsContext)

    function productInputOnChange (e) {
            setProductInput({...productInput, [e.target.name] : e.target.value})
        }

    return(
        <>

        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <span className={styles.step}>01</span>
                <div>
                    <h3>product name</h3>
                    <p>create the name for product.</p>
                </div>
            </div>

            <label className={styles.field}>
                <span>name</span>
                    <TextInput type="text" name="name" placeholder="your product name"
                      error={errors.name} value={productInput.name} 
                      onChange={productInputOnChange}/>
            </label>
        </section>

        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <span className={styles.step}>02</span>
                <div>
                    <h3>category</h3>
                    <p>Select the category for this product.</p>
                </div>
            </div>

            <label className={styles.field}>
                <span>category</span>
                    <SelectInput value={productInput.categoryId} 
                        error={errors.category} name="categoryId"
                        onChange={productInputOnChange}/>
            </label>
        </section>

        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <span className={styles.step}>03</span>
                <div>
                    <h3>price</h3>
                    <p>Select the price for this product.</p>
                </div>
            </div>

            <label className={styles.field}>
                <span>price</span>
                    <TextInput type="number" name="price" placeholder="set price"
                        error={errors.price} value={productInput.price} 
                        onChange={productInputOnChange}/>
            </label>
        </section>

        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <span className={styles.step}>04</span>
                <div>
                    <h3>count</h3>
                    <p>Select the count for this product.</p>
                </div>
            </div>

            <label className={styles.field}>
                <span>count</span>
                    <TextInput type="number" name="count" placeholder="set count"
                        error={errors.count} value={productInput.count} 
                        onChange={productInputOnChange}/>
            </label>
        </section>
            
        </>
    )
}

export default ProductForm;