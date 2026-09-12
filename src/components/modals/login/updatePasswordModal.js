import styles from "../../../styles/modals.module.css"
import { useDispatch } from "react-redux";
import BaseModal from "../baseModal";
import { useContext } from "react";
import { ModalsContext } from "../../../providers/modalsProvider";
import { updatePassword } from "../../../redux/features/slices/authSlise";
import { useDisclosure } from "@mantine/hooks";
import { Input, PasswordInput } from "@mantine/core";


function UpdatePasswordModal () {

    const dispatch = useDispatch()

    const {userInput, setErrors, closeModal, setUserInput, errors, } = useContext(ModalsContext)

    function userInputOnChange (e) {
        setUserInput({...userInput, [e.target.name] : e.target.value})
    }

    function userValidation () {

        const newErrors = {}

        const { password, confirmPassword} = userInput
        
        if(password !== ""){

            if(password.length < 6) {
                newErrors.password = "Name must be at least 6 characters."
            }

        }else{
            newErrors.password = "Password is required"
        }

        if(confirmPassword === "") {
            newErrors.confirmPassword = "Password is required"
        } 
        else if(confirmPassword !== password){
            newErrors.confirmPassword = "The password does not match, please try again."
        } 
            

        setErrors(newErrors)
        return newErrors;
    }

    function handleCreatePassword () {

        let validationErrors = userValidation()
        if(Object.keys(validationErrors).length === 0){

            dispatch( updatePassword(userInput.confirmPassword) )
            closeModal()
        }

    }

    const [visible, { toggle }] = useDisclosure(false);

    return(
        <>
            <BaseModal title="create new password" buttonText={"create"} onSubmit={handleCreatePassword}>
                <section className={styles.section}>
                    <div className={styles.sectionTitle}>
                        <span className={styles.step}>01</span>
                        <div>
                            <h3>password</h3>
                            <p>create your new password</p>
                        </div>
                    </div>

                    <label className={styles.field}>
                        <span>password</span>
                            <Input.Wrapper classNames={{label: styles.label, error: styles.error,}} 
                                    error={errors.password}>
                
                                <PasswordInput
                                    name="password" 
                                    placeholder="your password"
                                    defaultValue="secret"
                                    visible={visible}
                                    onVisibilityChange={toggle}
                                    value={userInput.password} onChange={userInputOnChange}
                                />
                
                            </Input.Wrapper>
                    </label>

                    <label className={styles.field} style={{marginTop:"20px"}}>
                        <span>confirm password</span>
                            <Input.Wrapper classNames={{label: styles.label, error: styles.error,}} 
                                    error={errors.confirmPassword}>
                
                                <PasswordInput
                                    name="confirmPassword" 
                                    placeholder="confirm password"
                                    defaultValue="secret"
                                    visible={visible}
                                    onVisibilityChange={toggle}
                                    value={userInput.confirmPassword} onChange={userInputOnChange}
                                />
                
                            </Input.Wrapper>
                    </label>
                </section>
            </BaseModal>
        </>
    )
}

export default UpdatePasswordModal;