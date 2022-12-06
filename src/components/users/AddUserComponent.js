import { useState, useEffect } from "react"
import React from 'react'
import UserService from "../../service/UserService"
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddUserComponent = () => {

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const { id } = useParams();
    const history = useNavigate();

    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [passwordConfirmError, setPasswordConfirmError] = useState('')
    const [emailError, setEmailError] = useState(`Email is can not empty`)
    const [formValid, setFormValid] = useState(false)


    useEffect(() => {
        UserService.getUserById(id).then(response => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
            setNumber(response.data.number)
            setPassword(response.data.password)
        }).catch(error => {
            console.log(error)
        })
    }, [id])

    useEffect(() => {
        if (id) {
            setFormValid(true)
        } else {
            if (passwordError || emailError) {
                setFormValid(false)
            } else {
                setFormValid(true)
            }
        }
    }, [id, passwordError, emailError])

    const saveOrCreateUser = (e) => {
        e.preventDefault();
        const user = { email, firstName, lastName, number, password }

        if (id) {
            const pas = {
                password: passwordConfirm
            }
            alert(pas.password)
            UserService.checkPassword(pas).then(e => {
                if (e.data.isMatch === false) {
                    setPasswordConfirmError('dont match password')
                } else {
                    setPasswordConfirmError('')
                alert(JSON.stringify(user))

                    UserService.updateUser(id, user).then((resp) => {
                        history('/users')
                        localStorage.setItem('user', resp.data)
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }).catch((err) => {
                alert(JSON.stringify(err.response.data))
            })

        } else {
            if (passwordConfirm === password && password.length !== 0) {
                UserService.createUser(user).then((response) => {

                    console.log(response.data)

                    history('/users');

                }).catch(error => {
                    console.log(error)
                })
            }
            else {
                alert("Your password's not match")
            }
        }
    }


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break;

            default:
                setPasswordDirty(true)
                break;
        }
    }

    const emailHandler = (email) => {
        setEmail(email)
        const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
        if (!re.test(email)) {
            setEmailError("Email is not correct")
            if (!email) {
                setEmailError("Email is can not empty")
            }
        } else {
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)

        if (!e.target.value) {
            setPasswordError('Password cannot be empty')
        } else {
            setPasswordError('')
        }
    }

    const title = () => {
        if (id) {
            return <h2 className="text-center">Update User</h2>
        } else {
            return <h2 className="text-center">Registraton User</h2>
        }
    }

    const createOrUpdatePassword = () => {
        if (id) {
            return (
                <div className="form-group">
                    <label className="form-label my-1"> Confirm password :</label>
                    {(passwordConfirmError!=='') &&<div>{passwordConfirmError}</div>}
                    <input
                        type="password"
                        placeholder="Enter password"
                        name="password-equals"
                        className="form-control"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    >
                    </input>
                </div>
            )
        } else {
            return (
                <div className="form-group">
                    <label className="form-label my-1"> Confirm password</label>
                    <input

                        type="password"
                        placeholder="Enter password again"
                        name="password-confirm"
                        className="form-control"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    >
                    </input>
                </div>
            )
        }
    }
    return (
        <div>
            <br />
            <div className="container">
                <div className="row row justify-content-md-center ">
                    <div className="card col-5">
                        {
                            title()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label className="form-label"> First Name </label>
                                    <input
                                        type="text"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group my-1">
                                    <label className="form-label"> Last Name </label>
                                    <input
                                        type="text"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group my-1">
                                    <label className="form-label"> Email </label>
                                    {
                                        (emailDirty && emailError) &&
                                        <div style={{ color: 'red' }}>{emailError}</div>
                                    }
                                    <input
                                        onBlur={e => blurHandler(e)}
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => emailHandler(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className="form-group my-1">
                                    <label className="form-label"> Number </label>
                                    <input
                                        type="text"
                                        placeholder="Enter number"
                                        name="number"
                                        className="form-control"
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className="form-group my-1">
                                    <label className="form-label"> Password </label>
                                    {
                                        (passwordDirty && passwordError) &&
                                        <div style={{ color: 'red' }}>{passwordError}</div>
                                    }
                                    <input
                                        onBlur={e => blurHandler(e)}
                                        type="password"
                                        placeholder="Enter password"
                                        name="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => passwordHandler(e)}
                                    >
                                    </input>
                                </div>
                                {createOrUpdatePassword()}
                                <button disabled={!formValid} className="btn btn-success mt-2" onClick={(e) => saveOrCreateUser(e)} >Submit </button>
                                <br></br>

                                {(!id)&& <div> <small>Already have account? </small>
                                <Link to="/login" className="mx-2 mt-2">Sign in </Link>
                                </div>
                                }
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUserComponent