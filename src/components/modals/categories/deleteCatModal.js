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

    const { closeModal , modalData,} = useContext(ModalsContext)

    function handleDltCategory () {
    
            dispatch(dltCat({id: modalData.id}))
            dispatch(deleteProductsByCategory({id: modalData.id}))
            navigate("/categories");
            closeModal()
    }

    return(
        <>
            <BaseModal title="delete category" buttonText="delete" onSubmit={handleDltCategory}>
                <p>Are you sure you want to delete this category?</p>
                <p>This action will permanently delete the category and all products inside it.</p>
                <p>This action cannot be undone. </p>
            </BaseModal>
        </>
    )
}

export default DltCategoryModal;