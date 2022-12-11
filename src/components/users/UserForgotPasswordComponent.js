import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import UserService from '../../service/UserService'

const UserForgotPasswordComponent = () => {
    const [error, setError] = useState()
    const [email, setEmail] = useState()
    const [message, setMessage] = useState()

    const history = useNavigate()

    const resetPassword = () => {
        UserService.resetPassword(email).then(resp => {
            // history('/login',{ state: { message: "A new password has been sent to your email" }})
            setMessage("A new password has been sent to your email")
        }).catch(err => {
            setError('This email does not exist')
        })
    }

    function toBackPage() {
        history(-1)
    }

    return (
        <div>
            {
                (message) &&
                <div>
                    <div className="container">
                        <br></br>
                        <br></br>
                        <div class="form">
                            <div className="row row justify-content-md-center">
                                <div className='card col-5 bg-light'>
                                    <h3 className='text-center my-4'>Success Reset</h3>
                                    <div className='text-center'>
                                        <div className='alert alert-success mt-2'>{message}</div>
                                        <Link className='btn btn-outline-secondary my-3'
                                            onClick={() => toBackPage()}
                                        >Back to Login</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                ||
                <div>
                    <div className="container">
                        <br></br>
                        <br></br>
                        <div class="form">
                            <div className="row row justify-content-md-center">
                                <div className='card col-5 bg-light'>
                                    <h3 className='text-center my-3'>Forgot Email</h3>
                                    <form>
                                        {
                                            (error) &&
                                            <div className='alert alert-danger text-center'>{error}</div>
                                        }
                                        <label>Enter your email</label>
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            name="email"
                                            className="form-control mt-2"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </form>
                                    <div className='text-center'>
                                        <button className="btn btn-info my-4" onClick={() => resetPassword()} >Forgot</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserForgotPasswordComponent