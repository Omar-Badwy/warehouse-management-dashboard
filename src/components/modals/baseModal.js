import styles from '../../styles/modals.module.css'
import { ModalsContext } from "../../providers/modalsProvider";
import { useContext } from "react";


function BaseModal ({title,children,buttonText,onClose,onSubmit}) {

    const {closeModal} = useContext(ModalsContext)

    return(
        <>
            <div className={styles.overlay} onMouseDown={closeModal}>
                <div
                    className={styles.modal}
                    onMouseDown={(event) => event.stopPropagation()}
                >
                    <header className={styles.header}>
                        <div>
                            <h2>
                                {title}
                            </h2>
                            {/* <p>Add the client and products included in this order.</p> */}
                        </div>

                        <button className={styles.closeButton} onClick={closeModal}>
                            ×
                        </button>
                    </header>

                    <div className={styles.body}>
                         {children}
                    </div>

                    <footer className={styles.footer} style={{justifyContent:'flex-end'}}>
                        <div className={styles.actions}>
                            <button className={styles.cancelButton} onClick={closeModal}>
                                Cancel
                            </button>
                            <button className={styles.submitButton} onClick={onSubmit} >
                                {buttonText ? buttonText : title}
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default BaseModal;