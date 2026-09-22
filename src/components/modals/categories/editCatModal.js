import CategoryForm from "../../forms/categoryForm";
import { useContext } from "react";
import BaseModal from "../baseModal";
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch, useSelector } from "react-redux";
import { editCat } from "../../../redux/features/slices/categoriesSlice";
import { validateCategory } from "../../../utils/validation/categoryValidation";
import { addNotification } from "../../../redux/features/slices/notificationsSlice";


function EditCategoryModal () {

    const { closeModal , categoryInput, setErrors, } = useContext(ModalsContext)

    const categories = useSelector( (state) => state.categories.categories)
    const dispatch = useDispatch()

    function handleEditCategory () {
    
            let validationErrors = validateCategory(categoryInput,categories,setErrors)
            if(Object.keys(validationErrors).length === 0){
    
                dispatch(editCat({data: categoryInput,}))
                dispatch( addNotification({
                    type: "success",
                    title: "category edited",
                    message: `Category "${categoryInput.name}" was edited successfully.`,
                }) )
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