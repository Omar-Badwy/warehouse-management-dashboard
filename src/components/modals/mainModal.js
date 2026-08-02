import { useContext, useEffect } from 'react';
import { ModalsContext } from '../../providers/modalsProvider';
import AddProductModal from './products/addProductModal';
import DltProductModal from './products/dltProductsModal';
import EditProductModal from './products/editProductModal';
import AddCategoryModal from './categories/addCatModal';
import EditCategoryModal from './categories/editCatModal';
import DltCategoryModal from './categories/deleteCatModal';

function Modals () {

    const { opened,modalType, modalData, modalOption,
        setProductInput,setCategoryInput,} = useContext(ModalsContext)

    useEffect(() => {

    switch(modalType){
            case "editProduct":
                setProductInput(modalData);
                break;

            case "editCategory" :
                setCategoryInput(modalData);
                break;

            case "deleteAllProductWithCatId" :
                setCategoryInput(modalData);
                break;

            default:         
        }

    }, [modalData,modalType]);

    useEffect(() => {
        if (modalType === "addProduct" && modalOption?.categoryId) {
            setProductInput((productInput) => ({
                ...productInput,
                categoryId: modalOption.categoryId,
            }));
        }
    }, [modalOption, modalType]);

    // ? Functions

    function renderModalContent () {

        switch(modalType){

            case "addProduct":
                return <AddProductModal/>

            case "editProduct":
                return <EditProductModal/>

            case "deleteProduct":
                return <DltProductModal type="dlt"/>

            case "deleteAllProduct":
                return <DltProductModal type="dltAll"/>

            case "deleteAllProductWithCatId":
                return <DltProductModal type="dltAllWithCatId"/>

            case "addCategory":
                return <AddCategoryModal/>

            case "editCategory":
                return <EditCategoryModal/>

            case "deleteCategory":
                return <DltCategoryModal/>
                
            default:
                return null;
        }
    }


    if(!opened) return null

    return(
        <>
            {renderModalContent()}
        </>
    )
    
}

export default Modals;