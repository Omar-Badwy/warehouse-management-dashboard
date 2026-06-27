import '../styles/login.css'

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
        <div className='body'>

            <div className='contanier'>
            
                <div className='header'>
                    <h1>login</h1>
                    <div className='underLine'/>
                </div>
                
                <div className='inputs'>
                    <div className='div-input'>
                        <i class="fa-solid fa-user"></i>
                        <input type='text' placeholder='Name' value={name} 
                        onChange={ (e) => setName(e.target.value) }/>
                    </div>
                    
                    <div className='div-input'>
                        <i class="fa-solid fa-envelope"></i>
                        <input type='email' placeholder='Email'value={email} 
                        onChange={ (e) => setEmail(e.target.value) }/>
                    </div>
                    
                    <div className='div-input'>
                        <i class="fa-solid fa-lock"></i>
                        <input type='number' placeholder='Password' value={password} 
                        onChange={ (e) => setPassword(e.target.value) }/>
                    </div>

                </div>

                <button type='submit' onClick={handleLogin}
                >login </button>

            </div>

        </div>
    )
}