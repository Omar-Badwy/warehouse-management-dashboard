import CategoryForm from "../../forms/categoryForm";
import { useContext } from "react";
import BaseModal from "../baseModal";
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch, useSelector } from "react-redux";
import { addCat } from "../../../redux/features/slices/categoriesSlice";
import { validateCategory } from "../../../utils/validation/categoryValidation";


function AddCategoryModal () {

    const { closeModal , categoryInput, setCategoryInput, setErrors, } = useContext(ModalsContext)

    const categories = useSelector( (state) => state.categories.categories)

    const dispatch = useDispatch()

    function handleCloseMOdal () {
        setCategoryInput({id: "", name: ""})
        setErrors({name: "",category: "",count: "",price: "",phone: "",email: "",address: "",})
        closeModal()
    }

     function handleAddCategory () {
    
            const type = "add"
            let validationErrors = validateCategory(categoryInput,categories,setErrors,type)
            if(Object.keys(validationErrors).length === 0){
    
                dispatch(addCat({data: categoryInput,}))
                setCategoryInput({id: "", name: ""})
                closeModal()
            }
        }

    return(
        <>
            <BaseModal title="add category" onClose={handleCloseMOdal} onSubmit={handleAddCategory}>
                <CategoryForm/>
            </BaseModal>
        </>
    )
}

export default AddCategoryModal;