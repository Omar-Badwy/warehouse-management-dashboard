import { useContext } from "react";
import TextInput from "../inputs/textInput";
import { ModalsContext } from "../../providers/modalsProvider";
import styles from "../../styles/modals.module.css"

function CategoryForm () {

    const { categoryInput, setCategoryInput, errors, } = useContext(ModalsContext)

    function categoryInputOnChange (e) {
            setCategoryInput({...categoryInput, [e.target.name] : e.target.value})
        }

    return(
        <>
            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <span className={styles.step}>01</span>
                    <div>
                        <h3>category name</h3>
                        <p>create the name for category.</p>
                    </div>
                </div>

                <label className={styles.field}>
                    <span>name</span>
                        <TextInput type="text" name="name" placeholder="set category name"
                            error={errors.category} value={categoryInput.name} 
                            onChange={categoryInputOnChange}/>
                </label>
            </section>
        </>
    )
}

export default CategoryForm;