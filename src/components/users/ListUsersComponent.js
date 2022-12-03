import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserService from '../../service/UserService'

const ListUsersComponent = () => {
    const [users, setUsers] = useState([])
    const history = useNavigate()

useEffect(() => {
  loadUsers()
}, [])

async function loadUsers() {
  UserService.getAllUsers().then((response)=>{
    setUsers(response.data)
    console.log(response.data)
  }).catch(error=>{
    console.log(error)
    history('/login')
  })
}
async function deleteUserById(id) {
  const authId = localStorage.getItem("id");
  if(id == authId){
   alert("its your account!")
  }else{
  UserService.deleteUser(id)
  loadUsers()
  history("/users")
  }
}

  return (
    <div className="container">
        <h2 className='text-center'>ListUsersComponent</h2>
        <Link to = '/add-user' className='btn btn-primary'>Test</Link>
        <table className='table table-border table-striped'>
            <thead>
                <th>User ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Actions</th>
            </thead>
            <tbody>
                {
                    users.map(
                        user =>
                        <tr key = {user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                              <Link  className='btn btn-outline-info' to = {`/edit-user/${user.id}`}>Update</Link>
                              <Link  className='btn btn-outline-info mx-2' to = {`/users/${user.id}/questions`}>Questions</Link>
                              <button onClick={()=>deleteUserById(user.id)} className='btn btn-outline-info'>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
    
  )
}

export default ListUsersComponent