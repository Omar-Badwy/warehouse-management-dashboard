import { useContext } from "react";
import TextInput from "../inputs/textInput";
import { ModalsContext } from "../../providers/modalsProvider";
import SelectInput from "../inputs/selectIput";


function ProductForm () {

    const { productInput, setProductInput, errors, } = useContext(ModalsContext)

    function productInputOnChange (e) {
            setProductInput({...productInput, [e.target.name] : e.target.value})
        }

    return(
        <>
            <TextInput type="text" name="name" placeholder="your product name"
              error={errors.name} value={productInput.name} onChange={productInputOnChange}/>

             <SelectInput value={productInput.categoryId} onChange={productInputOnChange}
              error={errors.category} name="categoryId"/>

            <TextInput type="number" name="price" placeholder="set price"
              error={errors.price} value={productInput.price} onChange={productInputOnChange}/>

            <TextInput type="number" name="count" placeholder="set count"
              error={errors.count} value={productInput.count} onChange={productInputOnChange}/>

        </>
    )
}

export default ProductForm;