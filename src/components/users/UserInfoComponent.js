import React,{useEffect,useState} from 'react'
import UserService from '../../service/UserService'
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const UserInfoComponent=()=> {
    const [user, setUser] = useState([])
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
     UserService.getUserById(id).then(resp =>{
        setUser(resp.data)
     }).catch(error=>{
        if(error.response.status=== 403){
           navigate('/login')
         }
     })
    }, [navigate,id])
    

    const tokenInfo= ()=>{
     const token = localStorage.getItem("accessToken")
    const userInfo = jwt_decode(token)
      return <div>{JSON.stringify(userInfo)}</div>
    }

  return (
    <div>
       <div className="container">
        GOOD
        <h3>id {user.id}</h3>
        <h3>name {user.firstName}</h3>
        <h3>last {user.lastName}</h3>
        <h3>email {user.email}</h3>
        </div>
        {tokenInfo()}

    </div>
  )
}

export default UserInfoComponent