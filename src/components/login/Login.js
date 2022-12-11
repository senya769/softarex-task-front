import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../../service/AuthService'
import "./Login.css"

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [rememberMe, setRememberMe] = useState(1)
    const [error, setError] = useState(false)
    const history = useNavigate()

    useEffect(() => {
        const authId = localStorage.getItem('id')
        if (authId) {
            history(`/users/${authId}/questions`)
        }
    }, [history])

    function rememberFunc(e) {
        if (e.checked) {
            setRememberMe(2)
        } else {
            setRememberMe(1)
        }
    }

    const login = (e) => {
        e.preventDefault();
        AuthService.login(email, password, rememberMe).then(response => {
            AuthService.saveResponseAuth(response.data)
            history('/users')
            window.location.reload()
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
                            <h3 className='text-center mt-3'>Login</h3>
                            <form class='form'>
                                {
                                    (error) &&
                                    <div className='alert alert-danger mt-2'>No such email/password combination found</div>
                                }
                                <label>Email </label>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                                <label className='mt-2'>Password</label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="passwrod"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </form>
                            <div className='text-center'>
                                <button className="btn btn-info my-2" onClick={(e) => login(e)} >Login</button>
                                <br />
                                <div class="row mb-4">
                                    <div class="col d-flex justify-content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" name="remb-me"
                                                onChange={(e) => rememberFunc(e.target)}
                                            />
                                            <label class="form-check-label" for="form2Example31"> Remember me </label>
                                        </div>
                                    </div>

                                    <div class="col">
                                        <a href="/user/forgot-password" className='text-decoration-none'>Forgot password?</a>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    Dont have account?
                                    <Link to="/add-user" className='text-decoration-none mx-2' >Create a new account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login