import { useContext } from "react";
import { add } from "../../../redux/features/slices/productsSlice";
import { validateProduct } from "../../../utils/validation/productValidation";
import ProductForm from "../../forms/productForm";
import BaseModal from "../baseModal";
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch, useSelector } from "react-redux";


function AddProductModal () {

    const { closeModal , productInput, setProductInput, setErrors, } = useContext(ModalsContext)

    const products = useSelector( (state) => state.products.products)

    const dispatch = useDispatch()

    function handleAddProduct () {

        let type = "add"
        let validationErrors = validateProduct(productInput,setErrors,products,type)
        if(Object.keys(validationErrors).length === 0){

            dispatch(add({
                data: productInput,
            }))

            setProductInput({name: "",categoryId: "",count: "",price: "",})
            closeModal()
        }
    }

    return(
        <>
            <BaseModal title="add new product" onSubmit={handleAddProduct}>
                <ProductForm/>
            </BaseModal>
        </>
    )
}

export default AddProductModal;