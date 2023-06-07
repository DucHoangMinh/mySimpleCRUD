// App.js

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/login.component';
import {Routes, Route, Link } from 'react-router-dom';

import Register from './components/login/register.component';
import Home from './components/mainProgram/home.component'
class App extends Component {
  render() {
    return (
        <div className="container">
            <Routes>
              <Route path='/' element={ <Login/>} />
              <Route path='/register' element={ <Register/>} />
              <Route path='/home' element={<Home/>}/>
           </Routes>
        </div>
    );
  }
}

export default App;