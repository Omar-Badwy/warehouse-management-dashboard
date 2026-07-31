import { Button } from '@mantine/core';
import styles from '../../styles/modals.module.css'
import { useContext, useEffect, useState } from 'react';
import { ModalsContext } from '../../providers/modalsProvider';
import { useDispatch, useSelector } from 'react-redux';
import { add, deleteProductsByCategory, dlt, dltAll, dltAllWithCatId, edit } from '../../redux/features/slices/productsSlice';
import { addCat, dltCat, editCat } from '../../redux/features/slices/categoriesSlice';
import InputModal from './inputModal';
import { validateProduct } from '../../utils/validation/productValidation';
import { validateCategory } from '../../utils/validation/categoryValidation';
import { useNavigate } from 'react-router-dom';

function Modals () {

    // ? Variables

    const navigate = useNavigate()

    const products = useSelector( (state) => state.products.products)

    const dispatch = useDispatch()

    const { opened, closeModal , modalType, modalData, modalOption } = useContext(ModalsContext)

    // ? UseEffect

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

    }, [modalData]);

    useEffect(() => {
        if (modalType === "addProduct" && modalOption?.categoryId) {
            setProductInput((productInput) => ({
                ...productInput,
                categoryId: modalOption.categoryId,
            }));
        }
    }, [modalOption, modalType]);

    // ? States

    const [productInput, setProductInput] = useState({
        name: "",
        categoryId: "",
        count: "",
        price: "",
    })

    const [categoryInput, setCategoryInput] = useState({
        id: "",
        name: "",
    });

    const [errors,setErrors] = useState({
        name: "",
        category: "",
        count: "",
        price: "",
    })

    let editConfig;
    
    // ? Functions

    // # product handle

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

    function handleEditProduct () { 

        let type = "edit"
        let validationErrors = validateProduct(productInput,setErrors,products,type)
        if(Object.keys(validationErrors).length === 0){

            dispatch(edit({data: productInput}))
            setProductInput({name: "",categoryId: "",count: "",price: "",})
            closeModal()
        }
    }

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

    function handleCloseMOdal () {
        setProductInput({name: "",categoryId: "",count: "",price: "",})
        setCategoryInput({id: "", name: ""})
        setErrors({name: "",category: "",count: "",price: "",})
        closeModal()
    }

    function productInputOnChange (e) {
        setProductInput({...productInput, [e.target.name] : e.target.value})
    }

    function categoryInputOnChange (e) {
        setCategoryInput({...categoryInput, [e.target.name] : e.target.value})
    }

    // # category handle

    function handleAddCategory () {

        let validationErrors = validateCategory(categoryInput,setErrors)
        if(Object.keys(validationErrors).length === 0){

            dispatch(addCat({data: categoryInput,}))
            setCategoryInput({id: "", name: ""})
            closeModal()
        }
    }

    function handleEditCategory () {

        let validationErrors = validateCategory(categoryInput,setErrors)
        if(Object.keys(validationErrors).length === 0){

            dispatch(editCat({data: categoryInput,}))
            setCategoryInput({id: "", name: ""})
            closeModal()
        }
    }

    function handleDltCategory () {

        dispatch(dltCat({id: modalData.id}))
        dispatch(deleteProductsByCategory({id: modalData.id}))
        navigate("/categories");
        closeModal()
    }



    function renderModalContent () {

        switch(modalType){

            case "addProduct":
                editConfig= {
                    title: "Add product",
                    content: <InputModal inputValue={productInput} handleOnChange={productInputOnChange} errors={errors} type="productPage"/>,
                    button: "Add product",
                    function: handleAddProduct,
                }
                break;

            case "editProduct":
                editConfig= {
                    title: "Edit product",
                    content: <InputModal inputValue={productInput} handleOnChange={productInputOnChange} errors={errors} type="productPage"/>,
                    button: "Edit product",
                    function: handleEditProduct,
                }
                break;

            case "deleteProduct":

                editConfig= {
                    title: "Delete product",
                    content: <p style={{color:"white",fontSize:"20px"}}>Are you sure you want to delete this product?</p>,
                    button: "Delete product",
                    function: handleDltProduct,
                }
                break;

            case "deleteAllProduct":

                editConfig= {
                    title: "Delete All",
                    content: <p style={{color:"white",fontSize:"20px"}}>This action will delete all products. Are you sure you want to delete all products?</p>,
                    button: "Delete All",
                    function: handleDltAllProduct,
                }
                break;

            case "deleteAllProductWithCatId":

                editConfig= {
                    title: "Delete All",
                    content: <p style={{color:"white",fontSize:"20px"}}>This action will delete all products that related with this category. Are you sure you want to delete all products?</p>,
                    button: "Delete All",
                    function: handleDltAllProductWidthCatId,
                }
                break;

            case "addCategory":

                editConfig= {
                    title: "Add Category",
                    content: <InputModal inputValue={categoryInput} handleOnChange={categoryInputOnChange} errors={errors} type="categoryPage"/>,
                    button: "Add Category",
                    function: handleAddCategory,
                }
                break;

            case "editCategory":

                editConfig= {
                    title: "Edit Category",
                    content: <InputModal inputValue={categoryInput} handleOnChange={categoryInputOnChange} errors={errors} type="categoryPage"/>,
                    button: "Edit Category",
                    function: handleEditCategory,
                }
                break;

            case "deleteCategory":

                editConfig= {
                    title: "Delete category",
                    content:
                    <>
                        <p style={{color:"#c2c2c2",fontSize:"17px"}}>Are you sure you want to delete this category?</p>
                        <p style={{color:"#c2c2c2",fontSize:"17px"}}>This action will permanently delete the category and all products inside it.</p>
                        <p style={{color:"#c2c2c2",fontSize:"17px"}}>This action cannot be undone. </p>
                    </>,
                    button: "Delete category",
                    function: handleDltCategory,
                }
                break;
                
            default:
                return null;
        }
    }


    if(opened){

        return(
    
            <div className={styles.container}>

                <div className={styles.modal}>
                    {renderModalContent()}
                    <div className={styles.header}>

                        <span>{editConfig.title}</span>

                        <div onClick={handleCloseMOdal}>
                            <i style={{color:"white",fontSize:"22px",cursor:"pointer"}} className="fa-solid fa-xmark"></i>
                        </div>
                    </div>

                    <div className={styles.content}>
                        {editConfig.content}
                    </div>

                    <div className={styles.btn}>
                        <Button variant="filled" onClick={editConfig.function}>{editConfig.button}</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modals;