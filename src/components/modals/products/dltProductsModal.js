import { useContext } from "react";
import BaseModal from "../baseModal";
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch } from "react-redux";
import { dlt, dltAll, dltAllWithCatId } from "../../../redux/features/slices/productsSlice";

function DltProductModal ({type}) {

    const dispatch = useDispatch()

    const { closeModal , modalData,} = useContext(ModalsContext)

    function handleDltProduct () {

        dispatch(dlt({id: modalData.id}))
        closeModal()
    }

    function handleDltAllProduct () {
        dispatch(dltAll())
        closeModal()
    }
    
    function handleDltAllProductWidthCatId () {
        dispatch(dltAllWithCatId(modalData))
        closeModal()
    }

    let dltConfig;

    switch(type){

        case "dlt":

            dltConfig= {
                    title: "Delete product",
                    content: <p style={{color:"black",fontSize:"20px"}}>Are you sure you want to delete this product?</p>,
                    button: "Delete product",
                    function: handleDltProduct,
                }
            break;

        case "dltAll":
            
            dltConfig= {
                    title: "Delete All",
                    content: <p style={{color:"black",fontSize:"20px"}}>This action will delete all products. Are you sure you want to delete all products?</p>,
                    button: "Delete All",
                    function: handleDltAllProduct,
                }
            break;
                

        case "dltAllWithCatId":

            dltConfig= {
                    title: "Delete All",
                    content: <p style={{color:"black",fontSize:"20px"}}>This action will delete all products that related with this category. Are you sure you want to delete all products?</p>,
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