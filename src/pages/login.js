import  styles from '../styles/login.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ? Redux importing
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../redux/features/slices/authSlise'

export default function Login () {

    // ? Variables

    const user = {
        name: "omar",
        email: "admin.com",
        password: "123456"
    }

    const navigate = useNavigate()

    // ? Redux Code
    const state = useSelector( (state) => state.auth.user)

    const dispatch = useDispatch()

    // ? States
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    // ? Functions
    let handleLogin = () => {
        if(user.name === name && user.email === email && user.password === password) {

            dispatch( login({user}) )
            navigate("/dashboard" , { replace: true });
            
        }else{
            alert("Invalid Credentials")
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
                    <div className={styles.divInput}>
                        <i className="fa-solid fa-user"></i>
                        <input type='text' placeholder='Name' value={name} className={styles.inp}
                        onChange={ (e) => setName(e.target.value) }/>
                    </div>
                    
                    <div className={styles.divInput}>
                        <i className="fa-solid fa-envelope"></i>
                        <input type='email' placeholder='Email'value={email} className={styles.inp}
                        onChange={ (e) => setEmail(e.target.value) }/>
                    </div>
                    
                    <div className={styles.divInput}>
                        <i className="fa-solid fa-lock"></i>
                        <input type='number' placeholder='Password' value={password} className={styles.inp}
                        onChange={ (e) => setPassword(e.target.value) }/>
                    </div>

                </div>

                <button type='submit' onClick={handleLogin} className={styles.btn}
                >login </button>

            </div>

        </div>
    )
}