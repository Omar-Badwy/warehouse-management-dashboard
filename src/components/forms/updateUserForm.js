import { useContext } from "react";
import { ModalsContext } from "../../providers/modalsProvider";
import styles from "../../styles/modals.module.css"
import TextInput from "../inputs/textInput";


function UpdateUserForm () {

    const { userInput, setUserInput, errors } = useContext(ModalsContext)
    
    function userInputOnChange (e) {
        setUserInput({...userInput, [e.target.name] : e.target.value})
    }

    return(
        <>
            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <span className={styles.step}>01</span>
                    <div>
                        <h3>name</h3>
                        <p>write your name.</p>
                    </div>
                </div>

                <label className={styles.field}>
                    <span>name</span>
                        <TextInput type="text" name="name" placeholder="your name"
                        error={errors.name} value={userInput.name} 
                        onChange={userInputOnChange}/>
                </label>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <span className={styles.step}>02</span>
                    <div>
                        <h3>email</h3>
                        <p>write your email.</p>
                    </div>
                </div>

                <label className={styles.field}>
                    <span>email</span>
                        <TextInput type="text" name="email" placeholder="example@gmail.com" 
                            value={userInput.email}  error={errors.email} 
                            onChange={userInputOnChange}/>
                </label>
            </section>
        </>
    )
}

export default UpdateUserForm;