import { Button } from '@mantine/core';
import styles from '../../styles/modals.module.css'
import { useContext, useEffect, useState } from 'react';
import { ModalsContext } from '../../providers/modalsProvider';
import { useDispatch, useSelector } from 'react-redux';
import { add, dlt, dltAll, edit } from '../../redux/features/slices/productsSlice';
import InputModal from './inputModal';

function Modals () {

    // ? Variables

    const products = useSelector( (state) => state.products.products)

    const dispatch = useDispatch()

    const { opened, closeModal , modalType, modalData } = useContext(ModalsContext)

    const [inputValue,setInputValue] = useState({
        name: "",
        category: "",
        count: "",
        price: "",
    })

    const [errors,setErrors] = useState({
        name: "",
        category: "",
        count: "",
        price: "",
    })
    
    // ? Functions
    
    function validate () {
        
        const newErrors = {}

        const name = inputValue.name.trim()
        const category = inputValue.category
        const count = inputValue.count
        const price = inputValue.price
        

        if(name !== "" ){

            for(let product of products){

                if(name === product.name){

                    newErrors.name = "This product is already added"

                } else if(name.length < 3) {

                    newErrors.name = "Name must be at least 3 characters."
                }
            }

        }else{
            newErrors.name = "Name is required"
        }

        if(category === ""){

            newErrors.category = "Category is required"
        }

        if(count === ""){

            newErrors.count = "Count is required"

        }else if( !isNaN(count)) {
            if(count <=  0){
                newErrors.count = "Count must be greater than 0."
            }
        }

        if(price === ""){
            
            newErrors.price = "Price is required"

        }else if( !isNaN(price)) {
            if(price <=  0){
                newErrors.price = "Price must be greater than 0."
            }
        }
        
        setErrors(newErrors)
        return newErrors;
    }

    function handleAddProduct () {

        let validationErrors = validate()
        if(Object.keys(validationErrors).length === 0){

            dispatch(add({data: inputValue,}))
            setInputValue({name: "",category: "",count: "",price: "",})
            closeModal()
        }
    }

    function handleEditProduct () {
        let validationErrors = validate()
        if(Object.keys(validationErrors).length === 0){

            dispatch(edit({data: inputValue}))
            setInputValue({name: "",category: "",count: "",price: "",})
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

    function handleCloseMOdal () {
            setInputValue({name: "",category: "",count: "",price: "",})
            setErrors({name: "",category: "",count: "",price: "",})
            closeModal()
    }

    function handleOnChange (e) {
        setInputValue({...inputValue, [e.target.name] : e.target.value})
    }

    useEffect(() => {

        if(modalData){
            setInputValue(modalData)
        }
    },[modalData])

    function renderModalContent () {

        switch(modalType){

            case "add":
                 return(
                    <>
                    <div className={styles.header}>
                        <span>Add product</span>
                        <div onClick={handleCloseMOdal}>
                            <i style={{color:"white",fontSize:"22px",cursor:"pointer"}} className="fa-solid fa-xmark"></i>
                        </div>
                    </div>

                    <div className={styles.content}>

                        <InputModal inputValue={inputValue} handleOnChange={handleOnChange} errors={errors}/>
                    </div>

                    <div className={styles.btn}>
                        <Button variant="filled" onClick={handleAddProduct}>Add product</Button>
                    </div>
                    </>
            )

            case "edit":
                return (
                    <>
                    <div className={styles.header}>
                        <span>Edit product</span>
                        <div onClick={handleCloseMOdal}>
                            <i style={{color:"white",fontSize:"22px",cursor:"pointer"}} className="fa-solid fa-xmark"></i>
                        </div>
                    </div>

                    <div className={styles.content}>

                        <InputModal inputValue={inputValue} handleOnChange={handleOnChange} errors={errors}/>
                    </div>

                    <div className={styles.btn}>
                        <Button variant="filled" onClick={handleEditProduct}>Edit product</Button>
                    </div>
                    </>
                )

            case "delete":
 
                return(
                    <>
                    <div className={styles.header} style={{padding: "20px 0 0 0"}}>
                        <span>Delete product</span>
                        <div onClick={handleCloseMOdal}>
                            <i style={{color:"white",fontSize:"22px",cursor:"pointer"}} className="fa-solid fa-xmark"></i>
                        </div>
                    </div>

                    <div className={styles.content}>
                        <p style={{color:"white",fontSize:"20px"}}>Are you sure you want to delete this product?</p>
                    </div>

                    <div className={styles.btn}>
                        <Button variant="filled" onClick={handleDltProduct}>Delete</Button>
                    </div>
                    </>
                )

            case "deleteAll":

            return(
                <>
                <div className={styles.header} style={{padding: "20px 0 0 0"}}>
                    <span>Delete product</span>
                    <div onClick={handleCloseMOdal}>
                        <i style={{color:"white",fontSize:"22px",cursor:"pointer"}} className="fa-solid fa-xmark"></i>
                    </div>
                </div>

                <div className={styles.content}>
                    <p style={{color:"white",fontSize:"20px"}}>This action will delete all products. Are you sure you want to delete all products?</p>
                </div>

                <div className={styles.btn}>
                    <Button variant="filled" onClick={handleDltAllProduct}>Delete All</Button>
                </div>
                </>
            )
                
            default:
                return null;
        }
    }


    if(opened){

        return(
    
            <div className={styles.container}>

                <div className={styles.modal}>
                    {renderModalContent()}
                </div>
            </div>
        )
    }
}

export default Modals;