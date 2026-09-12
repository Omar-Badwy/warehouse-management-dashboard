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

    const [clientInput, setClientInput] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const [errors,setErrors] = useState({
        name: "",
        category: "",
        count: "",
        price: "",
        phone: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
    })

    const [userInput,setUserInput] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

    function closeModal () {
        setProductInput({name: "",categoryId: "",count: "",price: "",})
        setCategoryInput({id: "",name: "",phone: "",email: "",address: "",})
        setUserInput({name: "",email: "",password: "",confirmPassword: "",})
        setErrors({name: "",category: "",count: "",price: "",phone: "",email: "",address: "",password: "",confirmPassword: "",})
        setOpened(false)
    }

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
      clientInput,
      setClientInput,
      userInput,
      setUserInput,
      errors,
      setErrors,
      }}>

      <Modals/>
      {children}
    </ModalsContext.Provider>
  );
}

export default ModalsProvider;