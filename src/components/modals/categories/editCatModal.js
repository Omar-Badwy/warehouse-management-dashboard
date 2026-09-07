import CategoryForm from "../../forms/categoryForm";
import { useContext } from "react";
import BaseModal from "../baseModal";
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch, useSelector } from "react-redux";
import { editCat } from "../../../redux/features/slices/categoriesSlice";
import { validateCategory } from "../../../utils/validation/categoryValidation";


function EditCategoryModal () {

    const { closeModal , categoryInput, setCategoryInput, setErrors, } = useContext(ModalsContext)

    const categories = useSelector( (state) => state.categories.categories)
    const dispatch = useDispatch()

    function handleEditCategory () {
    
            let validationErrors = validateCategory(categoryInput,categories,setErrors)
            if(Object.keys(validationErrors).length === 0){
    
                dispatch(editCat({data: categoryInput,}))
                setCategoryInput({id: "", name: ""})
                closeModal()
            }
        }

    return(
        <>
            <BaseModal title="edit category" onSubmit={handleEditCategory}>
                <CategoryForm/>
            </BaseModal>
        </>
    )
}

export default EditCategoryModal;