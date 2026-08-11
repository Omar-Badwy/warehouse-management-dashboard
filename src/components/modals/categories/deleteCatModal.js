import { useContext } from "react";
import BaseModal from "../baseModal";
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProductsByCategory } from "../../../redux/features/slices/productsSlice";
import { dltCat } from "../../../redux/features/slices/categoriesSlice";



function DltCategoryModal () {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { closeModal , setCategoryInput, setErrors, modalData,} = useContext(ModalsContext)

    function handleCloseMOdal () {
        setCategoryInput({id: "", name: ""})
        setErrors({name: "",category: "",count: "",price: "",phone: "",email: "",address: "",})
        closeModal()
    }

    function handleDltCategory () {
    
            dispatch(dltCat({id: modalData.id}))
            dispatch(deleteProductsByCategory({id: modalData.id}))
            navigate("/categories");
            closeModal()
    }

    return(
        <>
            <BaseModal title="delete category" buttonText="delete" onClose={handleCloseMOdal} onSubmit={handleDltCategory}>
                <p style={{color:"#c2c2c2",fontSize:"17px"}}>Are you sure you want to delete this category?</p>
                <p style={{color:"#c2c2c2",fontSize:"17px"}}>This action will permanently delete the category and all products inside it.</p>
                <p style={{color:"#c2c2c2",fontSize:"17px"}}>This action cannot be undone. </p>
            </BaseModal>
        </>
    )
}

export default DltCategoryModal;