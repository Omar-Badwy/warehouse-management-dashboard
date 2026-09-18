import  styles from '../styles/login.module.css'

import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ? Redux importing
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/features/slices/authSlise'
import { Input } from '@mantine/core'
import { ModalsContext } from '../providers/modalsProvider'
import { validateLogin } from '../utils/validation/loginValidation'

export default function Login () {

    // ? Redux Code

    const user = useSelector( (state) => state.auth.user )

    const dispatch = useDispatch()

    const {errors, setErrors} = useContext(ModalsContext)

    // ? Variables

    const navigate = useNavigate()


    // ? States

    const [userInput,setUserInput] = useState({
        name: "",
        email: "",
        password: "",
    })

    // ? Functions

    let handleLogin = () => {

        let validationErrors = validateLogin(userInput,setErrors,user)

        if(Object.keys(validationErrors).length === 0){
            dispatch( login(user) )
            navigate("/dashboard" , { replace: true });
        }       
    }

    return (
        <div className={styles.body}>

            <div className={styles.contanier}>
            
                <div className={styles.header}>
                    <h1>login</h1>
                    <div className='styles.underLine'/>
                </div>
                
                <div className={styles.inputs}>
                    <div className={styles.div}>
                        <div className={styles.divInput}>
                            <i className="fa-solid fa-user"></i>
                            <input type='text' name='name' placeholder='Name' value={userInput.name} className={styles.inp}
                            onChange={ (e) => setUserInput({...userInput, name : e.target.value}) }/>
                        </div>
                        <Input.Wrapper classNames={{error: styles.error,}} error={errors.name}/>
                    </div>
                    
                    <div className={styles.div}>
                        <div className={styles.divInput}>
                            <i className="fa-solid fa-envelope"></i>
                            <input type='email' name='email' placeholder='Email'value={userInput.email} className={styles.inp}
                            onChange={ (e) => setUserInput({...userInput, email : e.target.value}) }/>
                        </div>
                        <Input.Wrapper classNames={{error: styles.error,}} error={errors.email}/>
                    </div>
                    
                    <div className={styles.div}>
                        <div className={styles.divInput}>
                            <i className="fa-solid fa-lock"></i>
                            <input type='number' name='password' placeholder='Password' value={userInput.password} className={styles.inp}
                            onChange={ (e) => setUserInput({...userInput, password : e.target.value}) }/>
                        </div>
                        <Input.Wrapper classNames={{error: styles.error,}} error={errors.password}/>
                    </div>

                </div>

                <button type='submit' onClick={handleLogin} className={styles.btn}
                >login </button>

            </div>

        </div>
    )
}