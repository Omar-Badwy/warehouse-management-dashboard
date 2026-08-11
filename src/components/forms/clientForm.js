import { useContext } from "react";
import TextInput from "../inputs/textInput";
import { ModalsContext } from "../../providers/modalsProvider";

function ClientForm () {

    const { clientInput, setClientInput, errors, } = useContext(ModalsContext)

    function clientInputOnChange (e) {
            setClientInput({...clientInput, [e.target.name] : e.target.value})
        }

    return(
        <>
            <TextInput type="text" name="name" placeholder="client name"
              error={errors.name} value={clientInput.name} onChange={clientInputOnChange}/>

            <TextInput type="number" name="phone" placeholder="012345678911"
              error={errors.phone} value={clientInput.phone} onChange={clientInputOnChange}/>

            <TextInput type="email" name="email" placeholder="example@gmail.com"
              error={errors.email} value={clientInput.email} onChange={clientInputOnChange}/>

            <TextInput type="text" name="address" placeholder="Qalyubia/Banha"
              error={errors.address} value={clientInput.address} onChange={clientInputOnChange}/>

        </>
    )
}

export default ClientForm;