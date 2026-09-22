import BaseModal from "../baseModal";
import ProductForm from "../../forms/productForm";
import { useContext } from "react";
import { edit } from "../../../redux/features/slices/productsSlice";
import { validateProduct } from "../../../utils/validation/productValidation";
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../../redux/features/slices/notificationsSlice";


function EditProductModal () {

const { closeModal , productInput, setErrors, } = useContext(ModalsContext)

    const products = useSelector( (state) => state.products.products)

    const dispatch = useDispatch()

    function handleEditProduct () { 
    
            let type = "edit"
            let validationErrors = validateProduct(productInput,setErrors,products,type)
            if(Object.keys(validationErrors).length === 0){
    
                dispatch(edit({data: productInput}))

                dispatch( addNotification({
                    type: "success",
                    title: "product edited",
                    message: `Product "${productInput.name}" was edited successfully.`,
                }) )
                closeModal()
            }
        }

    return(
        <>
            <BaseModal title="edit product" onSubmit={handleEditProduct}>
                <ProductForm/>
            </BaseModal>
        </>
    )
}

export default EditProductModal;