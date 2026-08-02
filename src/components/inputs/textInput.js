import { Input } from "@mantine/core";
import styles from '../../styles/modals.module.css'

function TextInput ({type,name,placholder,error,value,onChange}) {

    return(
        <>
            <Input.Wrapper classNames={{label: styles.label, error: styles.error}} 
                label={name} error={error}>

                <Input type={type} name={name} className={styles.input} placeholder={placholder} 

                value={value} onChange={onChange}/>
            </Input.Wrapper>
        </>
    )
}

export default TextInput;