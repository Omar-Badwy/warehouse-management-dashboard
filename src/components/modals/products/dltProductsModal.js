import { useContext } from "react";
import BaseModal from "../baseModal";
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch, useSelector } from "react-redux";
import { dlt, dltAll, dltAllWithCatId } from "../../../redux/features/slices/productsSlice";
import { addNotification } from "../../../redux/features/slices/notificationsSlice";

function DltProductModal ({type}) {

    const dispatch = useDispatch()
    
    const { closeModal , modalData,} = useContext(ModalsContext)

    const products = useSelector( (state) => state.products.products)

    const product = products.find( (product) => product.id === modalData.id)


    function handleDltProduct () {

        dispatch(dlt({id: modalData.id}))
            
        dispatch( addNotification({
            type: "error",
            title: "product deleted",
            message: `product "${product.name}" was deleted.`,
        }) )
        closeModal()
    }

    function handleDltAllProduct () {
        dispatch(dltAll())
        dispatch( addNotification({
            type: "error",
            title: "products deleted",
            message: `all products were deleted.`,
        }) )
        closeModal()
    }
    
    function handleDltAllProductWidthCatId () {
        dispatch(dltAllWithCatId(modalData))
        dispatch( addNotification({
            type: "error",
            title: "product deleted",
            message: `product "${product.name}" was deleted.`,
        }) )
        closeModal()
    }

    let dltConfig;

    switch(type){

        case "dlt":

            dltConfig= {
                    title: "Delete product",
                    content: <p>Are you sure you want to delete this product?</p>,
                    button: "Delete product",
                    function: handleDltProduct,
                }
            break;

        case "dltAll":
            
            dltConfig= {
                    title: "Delete All",
                    content: <p>This action will delete all products. Are you sure you want to delete all products?</p>,
                    button: "Delete All",
                    function: handleDltAllProduct,
                }
            break;
                

        case "dltAllWithCatId":

            dltConfig= {
                    title: "Delete All",
                    content: <p>This action will delete all products that related with this category. Are you sure you want to delete all products?</p>,
                    button: "Delete All",
                    function: handleDltAllProductWidthCatId,
                }
            break;
            
        default:
            return null;
    }

    return(
        <>
            <BaseModal title={dltConfig.title} buttonText={dltConfig.button}  onSubmit={dltConfig.function}>
                {dltConfig.content}
            </BaseModal>
        </>
    )
}

export default DltProductModal;