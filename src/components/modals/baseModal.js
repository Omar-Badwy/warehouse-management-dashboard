import { Button } from "@mantine/core";
import styles from '../../styles/modals.module.css'


function BaseModal ({title,children,buttonText,onClose,onSubmit}) {

    return(
        <>
         <div className={styles.container}>

                <div className={styles.modal}>
                    <div className={styles.header}>

                        <span>{title}</span>

                        <div onClick={ onClose}>
                            <i style={{color:"white",fontSize:"22px",cursor:"pointer"}} className="fa-solid fa-xmark"></i>
                        </div>
                    </div>

                    <div className={styles.content}>
                        {children}
                    </div>

                    <div className={styles.btn}>
                        <Button variant="filled" onClick={ onSubmit}>{buttonText ? buttonText : title}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BaseModal;