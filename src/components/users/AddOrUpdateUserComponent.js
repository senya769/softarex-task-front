import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UserService from "../../service/UserService";

const AddUserComponent = () => {

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState()
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
            UserService.checkPassword(pas).then(e => {
                if (e.data.isMatch === false) {
                    setPasswordConfirmError('don`t match password')
                } else {
                    setPasswordConfirmError('')
                    UserService.updateUser(id, user).then((resp) => {
                        history('/users')
                        localStorage.setItem('user', resp.data)
                    }).catch(error => {
                        setPasswordError(error.response.data.details.password)
                        // setEmailError(error.response.data.message)
                        console.log(error.response.data)
                    })
                }
            }).catch((err) => {
                setPasswordConfirmError(err.response.data.details.password)
            })

        } else {
            if (passwordConfirm === password && password.length !== 0) {
                UserService.createUser(user).then((response) => {
                    console.log(response.data)
                    history('/users');
                }).catch(error => {
                    console.log(error)
                    setEmailError(error.response.data.message)
                    setEmailDirty(true)
                    setPasswordError(error.response.data.details.password)
                })
            }
            else {
                setPasswordConfirmError("password's not match")
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
            return <h2 className="text-center mt-2">Update User</h2>
        } else {
            return <h2 className="text-center mt-2">Registraton User</h2>
        }
    }

    const createOrUpdatePassword = () => {
        if (id) {
            return (
                <div className="form-group">
                    <label className="form-label my-1"> Confirm password*</label>
                    {(passwordConfirmError !== '') &&
                        <span className='text-danger mx-2'>{passwordConfirmError}</span>}
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
                    <label className="form-label my-1"> Confirm password*</label>
                    {(passwordConfirmError !== '') &&
                        <span className='text-danger mx-2'>{passwordConfirmError}</span>}
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
                    <div className="card bg-light col-5">
                        {
                            title()
                        }
                        <div className="card-body ">
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
                                    <label className="form-label"> Email* </label>
                                    {
                                        (emailDirty && emailError) &&
                                        <span className='text-danger mx-2'>{emailError}</span>
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
                                    <label className="form-label">
                                        {(id) && "New "}
                                        Password*
                                    </label>
                                    {
                                        (passwordDirty && passwordError) &&
                                        <span className='text-danger mx-2'>{passwordError}</span>
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

                                <div className="row">
                                    <div class="col justify-content-center mt-3">
                                        <button disabled={!formValid} className="btn btn-success" onClick={(e) => saveOrCreateUser(e)} >Submit </button>
                                    </div>
                                    <div class="col mt-4">

                                        {(!id) && <span> <small>Already have account? </small>
                                            <Link to="/login" className="mx-2 text-decoration-none">Sign in </Link>
                                        </span>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUserComponent