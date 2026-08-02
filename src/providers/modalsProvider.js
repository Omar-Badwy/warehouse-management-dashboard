import { createContext, useState } from 'react';
import Modals from '../components/modals/mainModal';

export const ModalsContext = createContext()

const ModalsProvider = ({children}) => {

  const [opened, setOpened] = useState(false);

  const [modalType,setModalType] = useState("")

  const [modalData,setModalData] = useState(null)
  
  const [modalOption,setModalOption] = useState({})

  function openModal (type,data,option) {
    setOpened(true)
    setModalType(type)
    setModalData(data)
    setModalOption(option)
  }

  function closeModal () {
    setOpened(false)
  }

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

  return (
    <ModalsContext.Provider value={{
      opened,
      openModal,
      closeModal,
      modalType,
      modalData,
      modalOption,
      productInput,
      setProductInput,
      categoryInput,
      setCategoryInput,
      errors,
      setErrors,
      }}>

      <Modals/>
      {children}
    </ModalsContext.Provider>
  );
}

export default ModalsProvider;