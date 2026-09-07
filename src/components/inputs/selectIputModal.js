import { Input } from "@mantine/core";
import styles from '../../styles/modals.module.css'
import { useContext } from "react";
import { ModalsContext } from "../../providers/modalsProvider";
import { useSelector } from "react-redux";

function SelectInput ({value,onChange,error,name}) {

    const categories = useSelector( (state) => state.categories.categories)

    const { modalOption, } = useContext(ModalsContext)

    return(
        <>
            <label>
                {modalOption?.categoryId ? (

                <Input.Wrapper classNames={{label: styles.label, error: styles.error}} error={error}>

                    <Input name={name} className={styles.input}
                        value={categories.find(cat => cat.id === modalOption.categoryId)?.name || ""}
                        disabled/>
                </Input.Wrapper>

                ) : (

                <Input.Wrapper classNames={{label: styles.label, error: styles.error}} error={error}>

                    <select name={name} className={styles.select} value={value} onChange={onChange}>
                        <option key={"select category"} value="select category" selected>{"select category"}</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option> )}
                    </select>
                </Input.Wrapper>

                )}
            </label>
        </>
    )
}

export default SelectInput;