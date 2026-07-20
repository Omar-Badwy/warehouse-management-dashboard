import { createContext, useState } from 'react';
import Modals from '../components/ui/modals';

export const ModalsContext = createContext()

const ModalsProvider = ({children}) => {

  const [opened, setOpened] = useState(false);

  const [modalType,setModalType] = useState("")

  const [modalData,setModalData] = useState(null)

  function openModal (type,data) {
    setOpened(true)
    setModalType(type)
    setModalData(data)
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
      }}>

      <Modals/>
      {children}
    </ModalsContext.Provider>
  );
}

export default ModalsProvider;