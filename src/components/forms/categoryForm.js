import { useContext } from "react";
import TextInput from "../inputs/textInput";
import { ModalsContext } from "../../providers/modalsProvider";

function CategoryForm () {

    const { categoryInput, setCategoryInput, errors, } = useContext(ModalsContext)

    function categoryInputOnChange (e) {
            setCategoryInput({...categoryInput, [e.target.name] : e.target.value})
        }

    return(
        <>
            <TextInput type="text" name="name" placeholder="set category name"
              error={errors.category} value={categoryInput.name} onChange={categoryInputOnChange}/>

        </>
    )
}

export default CategoryForm;