// App.js
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container } from 'react-bootstrap';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/login.component';
import { Routes, Route, Link } from 'react-router-dom';

import Register from './components/login/register.component';
import Home from './components/mainProgram/home.component';
import Add from './components/mainProgram/add.component';
import Update from './components/mainProgram/update.component';
import RecycleBin from './components/mainProgram/recycleBin.component';
import DefaultPage from './components/mainProgram/defaultPage.component';
function handleLogOut() {
    localStorage.removeItem('userMail');
    window.location.href = '/';
}
class App extends Component {
    render() {
        return (
            <div className="container">
                <Routes>
                    <Route path="/" element={<DefaultPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/add" element={<Add />}></Route>
                    <Route path="/home/update/:slug" element={<Update />}></Route>
                    <Route path="/home/trash" element={<RecycleBin />}></Route>
                </Routes>
            </div>
        );
    }
}

export default App;
