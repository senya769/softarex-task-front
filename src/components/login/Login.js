import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
import AuthService from '../../service/AuthService'

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState(false)
    const history = useNavigate()

    const login = (e) => {
        e.preventDefault();
        AuthService.login(email, password).then(response => {
            AuthService.saveResponseAuth(response.data)
            history('/users')
        }).catch(e => {
            console.log(e)
            setError(true)
        })
    }
    
    return (
        <div>
            <div className="container">
                <br></br>
                <br></br>
                <div class="form">
                    <div className="row row justify-content-md-center">
                        <div className='card col-5 bg-light'>
                            <h3 className='text-center'>Login</h3>
                            {
                                (error) &&
                                <h2>User not found</h2>
                            }
                            <form class='form'>
                                <label>Email </label>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="passwrod"
                                    className="form-control my-2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </form>
                            <div className='text-center'>
                                <button className="btn btn-info my-2" onClick={(e) => login(e)} >Login</button>
                                <br />
                                <Link to="/add-user" >Create a new account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Login