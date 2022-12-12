import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserService from '../../service/UserService'

const DeleteAuthUserComponent = () => {
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passwordConfirmError, setPasswordConfirmError] = useState("")
    const history = useNavigate()
    const { id } = useParams()

    function deleteUser(e) {
        e.preventDefault()
        const passwordDto = {
            password: passwordConfirm
        }
        UserService.checkPassword(passwordDto).then(resp => {
            if (resp.data.isMatch) {
                UserService.deleteUser(id).then(() => { })
                localStorage.clear()
                history('/login')
            } else {
                setPasswordConfirmError('Password is not match... Try again!')
            }
        }).catch(err => {
            setPasswordConfirmError(err.response.data.details.password)
        })
    }

    return (
        <div>
            <div className="container">
                <br></br>
                <br></br>
                <div className="row row justify-content-md-center ">
                    <div className="col-5 text-center">
                        <div className='card bg-light'>
                            <form className='offset-2 col-8'>
                                <h5 className="form-label mt-5"> Confirm password :</h5>
                                <input
                                    for="pas"
                                    type="password"
                                    placeholder="Enter password"
                                    className="form-control mt-4"
                                    onChange={(e) => setPasswordConfirm(e.target.value)}>
                                </input>
                                <small id="pas" class="form-text text-muted">
                                    {passwordConfirmError}
                                </small><br></br>
                                <button type='submit' className='btn btn-danger mb-4 mt-3' onClick={(e) => deleteUser(e)}>Delete User</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAuthUserComponent