import "../../css/Header.css"
import React,{useEffect}from 'react';
import jwt_decode from "jwt-decode";
import { Link, useNavigate} from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';


const HeaderComponent = () => {
  const history = useNavigate()
  const accessToken = localStorage.getItem('accessToken')
  var userIdAuth = localStorage.getItem("id")

  useEffect(() => {
    if(accessToken){
     const info = jwt_decode(accessToken)
     const date = Date.now()
     if(info.exp * 1000 < date){
      localStorage.clear()
      window.location.reload()
     }
    }

  }, [])
  

  const logout = () => {
    localStorage.clear()
    history('/login')
  }

  const menuAuth = () => {
    if (accessToken){
      const authInfo = jwt_decode(accessToken)
      return <div>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" className="dropdown-basic">
          {authInfo.sub}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href={`/edit-user/${authInfo.id}`}>Edit Profile</Dropdown.Item>
            <Dropdown.Item href={`/delete-user/${authInfo.id}`}>Delete Profile</Dropdown.Item>
            <Dropdown.Item  onClick={()=>{logout()}}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
  } else {
    return <div>
      <a href="/login" className='btn btn-info'>
        Login
      </a>
      <a href="/add-user" className='btn btn-outline-info mx-2'>
        Sing Up
      </a>
    </div>
}
  }

return (
  <div>
    <header>
      <nav className='navbar navbar-dark justify-content-between '>
        <div className='d-inline-flex'>

          <a href='/' className='logo'>Logo</a>
        </div>
        <span className='d-inline-flex mx-2'>
          <Link className="header mx-3" to={`/users/${userIdAuth}/questions`}>Questions</Link>
          <Link className='header mx-3' to={`/users/${userIdAuth}/answers`}>Answers</Link>
          {menuAuth()}
        </span>
      </nav>
    </header>
  </div>
)
}

export default HeaderComponent