import BaseModal from "../baseModal";
import ProductForm from "../../forms/productForm";
import { useContext } from "react";
import { edit } from "../../../redux/features/slices/productsSlice";
import { validateProduct } from "../../../utils/validation/productValidation";
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch, useSelector } from "react-redux";


function EditProductModal () {

const { closeModal , productInput, setProductInput, setErrors, } = useContext(ModalsContext)

    const products = useSelector( (state) => state.products.products)

    const dispatch = useDispatch()

    function handleCloseMOdal () {
        setProductInput({name: "",categoryId: "",count: "",price: "",})
        setErrors({name: "",category: "",count: "",price: "",phone: "",email: "",address: "",})
        closeModal()
    }

    function handleEditProduct () { 
    
            let type = "edit"
            let validationErrors = validateProduct(productInput,setErrors,products,type)
            if(Object.keys(validationErrors).length === 0){
    
                dispatch(edit({data: productInput}))
                setProductInput({name: "",categoryId: "",count: "",price: "",})
                closeModal()
            }
        }

    return(
        <>
            <BaseModal title="edit product" onClose={handleCloseMOdal} onSubmit={handleEditProduct}>
                <ProductForm/>
            </BaseModal>
        </>
    )
}

export default EditProductModal;