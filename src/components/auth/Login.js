import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


import AuthService from '../../service/AuthService'

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState(false)
    const history = useNavigate()


    const login = (e) => {
        e.preventDefault();
        AuthService.login(email, password).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("id", JSON.stringify(response.data.id));
                localStorage.setItem("email", JSON.stringify(response.data.email));
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }
            alert(JSON.stringify(response.data.email))
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
                <div className="row row justify-content-md-center ">
                    <div className="col-5 text-center"></div>
                    <div className='text-center'>Login</div>
                    {
                        (error) &&
                        <h2>User not found</h2>
                    }
                    <form>
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
                            type="text"
                            placeholder="Password"
                            name="passwrod"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <button className="btn btn-success" onClick={(e) => login(e)} >Submit </button>
                        <Link to="/users" className="btn btn-danger mx-2"> Cancel </Link>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default Login