import { useContext } from "react";
import TextInput from "../inputs/textInput";
import { ModalsContext } from "../../providers/modalsProvider";
import styles from "../../styles/modals.module.css"

function ClientForm () {

    const { clientInput, setClientInput, errors, } = useContext(ModalsContext)

    function clientInputOnChange (e) {
            setClientInput({...clientInput, [e.target.name] : e.target.value})
        }

    return(
        <>
            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <span className={styles.step}>01</span>
                    <div>
                        <h3>client name</h3>
                        <p>create the name for client.</p>
                    </div>
                </div>

                <label className={styles.field}>
                    <span>name</span>
                        <TextInput type="text" name="name" placeholder="client name"
                  error={errors.name} value={clientInput.name} onChange={clientInputOnChange}/>
                </label>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <span className={styles.step}>02</span>
                    <div>
                        <h3>phone number</h3>
                        <p>Select the phone number for this client.</p>
                    </div>
                </div>

                <label className={styles.field}>
                    <span>phone</span>
                        <TextInput type="number" name="phone" placeholder="012345678911"
                  error={errors.phone} value={clientInput.phone} onChange={clientInputOnChange}/>
                </label>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <span className={styles.step}>03</span>
                    <div>
                        <h3>email</h3>
                        <p>Select the email for this client.</p>
                    </div>
                </div>

                <label className={styles.field}>
                    <span>email</span>
                        <TextInput type="email" name="email" placeholder="example@gmail.com"
                            error={errors.email} value={clientInput.email} 
                            onChange={clientInputOnChange}/>
                </label>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <span className={styles.step}>04</span>
                    <div>
                        <h3>address</h3>
                        <p>Select the address for this client.</p>
                    </div>
                </div>

                <label className={styles.field}>
                    <span>address</span>
                        <TextInput type="text" name="address" placeholder="Qalyubia/Banha"
                            error={errors.address} value={clientInput.address} 
                            onChange={clientInputOnChange}/>
                </label>
            </section>
        </>
    )
}

export default ClientForm;