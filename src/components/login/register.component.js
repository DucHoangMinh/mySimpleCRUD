import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
function register() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userName,setUserName] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userMail,setUserMail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userPass,setUserPass] = useState('');



    function handleSubmit(e){
        e.preventDefault();
        const newUserInfor = {
            name : userName,
            email : userMail,
            password : userPass
        }
        axios.post('http://localhost:4000/userinfor/add',newUserInfor)
            .then(res => console.log(res.data))
        
        setUserName('')
        setUserMail('')
        setUserPass('')
    }
    return <div>
        <section class="vh-100" style={{backgroundColor : '#eee'}}>
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style={{borderRadius : 25}}>
                    <div class="card-body p-md-5">
                        <div class="row justify-content-center">
                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                            <form class="mx-1 mx-md-4"n onSubmit={handleSubmit}>

                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                <label class="form-label" for="form3Example1c">Your Name</label>
                                <input value={userName} type="text" id="form3Example1c" class="form-control" name="name" onChange={function(e){setUserName(e.target.value)}}/>
                                </div>
                            </div>

                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                <label class="form-label" for="form3Example3c">Your Email</label>
                                <input value={userMail} type="email" id="form3Example3c" class="form-control" name="email" onChange={function(e){setUserMail(e.target.value)}}/>
                                </div>
                            </div>

                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                <label class="form-label" for="form3Example4c">Password</label>
                                <input value={userPass} type="password" id="form3Example4c" class="form-control" name="password" onChange={function(e){setUserPass(e.target.value)}}/>
                                </div>
                            </div>

                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                <label class="form-label" for="form3Example4cd">Repeat your password</label>
                                <input type="password" id="form3Example4cd" class="form-control" />
                                </div>
                            </div>

                            <div class="form-check d-flex justify-content-center mb-5">
                                <label class="form-check-label" for="form2Example3">
                                    Have an account ? <Link to={'/'}>Sign in</Link>
                                </label>
                            </div>

                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button type="submit" class="btn btn-primary btn-lg">Register</button>
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
export default register