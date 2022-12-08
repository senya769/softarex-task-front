import jwt_decode from "jwt-decode";
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import ListAnswersByUserComponent from './components/answers/ListAnswersByUserComponent';
import FooterComponent from './components/fragments/footer/FooterComponent';
import HeaderComponent from './components/fragments/header/HeaderComponent';
import Login from './components/login/Login';
import ListQuetionsComponent from './components/questions/ListQuestionsByUserComponent';
import AddUserComponent from './components/users/AddUserComponent';
import DeleteAuthUserComponent from './components/users/DeleteAuthUserComponent';
import ListUsersComponent from './components/users/ListUsersComponent';
import AuthService from './service/AuthService';

function App() {
  
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken){
     const info = jwt_decode(accessToken)
     const date = Date.now()
     if(info.exp * 1000 < date){
      AuthService.logout()
      window.location.reload()
     }
    }
  }, [])

  return (
    <div>
      <Router>
     <HeaderComponent/>
     <div className='container'>
        <Routes>
          <Route path='/' element = {<ListQuetionsComponent/>}></Route>
          <Route path='/login' element = {<Login/>}></Route>
          <Route path='/users' element = {<ListUsersComponent/>}></Route>
          <Route path='/add-user' element = {<AddUserComponent/>}></Route>
          <Route path='/edit-user/:id' element = {<AddUserComponent/>}></Route>
          <Route path='/delete-user/:id' element = {<DeleteAuthUserComponent/>}></Route>
          <Route path='/users/:id/questions' element = {<ListQuetionsComponent/>}></Route>
          <Route path='/users/:id/answers' element = {<ListAnswersByUserComponent/>}></Route>
        </Routes>
     </div>
     <FooterComponent/>
     </Router>
    </div>
  );
}

export default App;
