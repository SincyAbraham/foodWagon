import {useRef} from "react";
import {useNavigate,Link} from 'react-router-dom';
import { LoginAPI,IsLoggedIn } from '../../API/CommonAPI'
import Swal from 'sweetalert2'
const Register = () => {
  IsLoggedIn();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    let info = {
      name      : event.target.username.value,
      email     : event.target.email.value,
      password  : event.target.password.value,
    };
    const { json } = await LoginAPI("/api/auth/register", info);
    if(json.status === true){
       Swal.fire({
        title: 'Success!',
        text: json.message,
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((res) => {
        if (res) {
          window.location.href = "/";
        }
      });
    }else{
      Swal.fire({
        title: 'Error!',
        text: json.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      }) 
    }
  };
  return (
    <div className="Register">
        <div className="container">


          <div className="row justify-content-center">

              <div className="col-xl-10 col-lg-12 col-md-9">

                  <div className="card o-hidden border-0 shadow-lg my-5">
                      <div className="card-body p-0">

                          <div className="row">
                              <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                              <div className="col-lg-6">
                                  <div className="p-5">
                                      <div className="text-center">
                                          <h1 className="h4 text-gray-900 mb-4">Register</h1>
                                      </div>
                                      <form className="user" onSubmit={handleSubmit}>
                                          <div className="form-group">
                                              <input type="text" className="form-control form-control-user"                                                  
                                                  placeholder="Enter Name..." id="name" required="required" name="username" />
                                          </div>
                                          <div className="form-group">
                                              <input type="email" className="form-control form-control-user" 
                                                  placeholder="Enter Email Address..." id="email" required="required" name="email" />
                                          </div>
                                          <div className="form-group">
                                              <input type="password" className="form-control form-control-user"
                                                  placeholder="Password" id="password" required="required" name="password" />
                                          </div>                            
                                          <button className="btn btn-primary btn-user btn-block" type="submit">
                                              Sign Up
                                          </button>
                                          <hr />                                          
                                      </form>
                                      <hr />                                      
                                      <div className="text-center">
                                          <Link className="small" to="/login">Already Register Please click!</Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>

          </div>

      </div>
    </div>
  )
};

export default Register;