import React, { useState } from 'react'
import UserService from '../../service/UserService'
import { useNavigate, useParams } from 'react-router-dom'

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
                UserService.deleteUser(id).then(()=>{})
                localStorage.clear()
                history('/login')
            } else {
                setPasswordConfirmError('Password is not match... Try again!')
            }
        }).catch(err => {
            alert(JSON.stringify(err.response.data) + ' catch')
        })
    }

    return (
        <div>
            <div className="container">
                <br></br>
                <br></br>
                <div className="row row justify-content-md-center ">
                    <div className=" col-5 text-center">
                        <form >
                            <label className="form-label my-1"> Confirm password :</label>
                            <input
                                for="pas"
                                type="password"
                                placeholder="Enter password"
                                className=" form-control"
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            >
                            </input>
                            <small id="pas" class="form-text text-muted">
                                {passwordConfirmError}
                            </small><br></br>
                            <button type='submit' className='btn btn-danger' onClick={(e) => deleteUser(e)}>Delete User</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAuthUserComponent