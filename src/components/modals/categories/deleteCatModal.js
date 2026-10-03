import { useContext } from "react";
import BaseModal from "../baseModal";
import { ModalsContext } from "../../../providers/modalsProvider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProductsByCategory } from "../../../redux/features/slices/productsSlice";
import { dltCat } from "../../../redux/features/slices/categoriesSlice";
import { addNotification } from "../../../redux/features/slices/notificationsSlice";


function DltCategoryModal () {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { closeModal , modalData,} = useContext(ModalsContext)

    const categories = useSelector( (state) => state.categories.categories)

    const category = categories.find( (category) => category.id === modalData.id)

    function handleDltCategory () {
    
            navigate("/categories", { 
                replace: true,
                state: true
            } )

            dispatch(dltCat({id: modalData.id}))
            dispatch(deleteProductsByCategory({id: modalData.id}))
            dispatch( addNotification({
                type: "error",
                title: "category deleted",
                message: `category "${category.name}" was deleted.`,
            }) )
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