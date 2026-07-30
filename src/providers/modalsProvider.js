import { createContext, useState } from 'react';
import Modals from '../components/ui/modals';

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
  return (
    <ModalsContext.Provider value={{
      opened,
      openModal,
      closeModal,
      modalType,
      modalData,
      modalOption,
      }}>

      <Modals/>
      {children}
    </ModalsContext.Provider>
  );
}

export default ModalsProvider;