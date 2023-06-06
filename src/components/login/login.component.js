import clsx from "clsx"
import { Routes,Route, Link } from "react-router-dom"

import style from "../../scss/loginForm.module.scss"
import Register from "./register.component"

function login(){
    return <div>
        <section class="vh-100" style={{backgroundColor : '#eee'}}>
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style={{borderRadius : 25}}>
                    <div class="card-body p-md-5">
                        <div class="row justify-content-center">
                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                            <p class="text-center h1 fw-bold mb-5 mt-4">Sign in your account</p>
                            <form class="mx-1 mx-md-4">
                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                <label class="form-label" for="form3Example3c">Your Email</label>
                                <input type="email" id="form3Example3c" class="form-control" />
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                <label class="form-label" for="form3Example4c">Password</label>
                                <input type="password" id="form3Example4c" class="form-control" />
                                </div>
                            </div>
                            <div class="form-check d-flex justify-content-center mb-5">
                                <label class="form-check-label" for="form2Example3">
                                Do not have an account ? <Link to={'/register'}>Sign up</Link>
                                </label>
                            </div>
                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button type="button" class="btn btn-primary btn-lg">Login</button>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    </div>
}
export default login