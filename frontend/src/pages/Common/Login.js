import {useRef} from "react";
import {Link,useNavigate} from 'react-router-dom';
import { LoginAPI,IsLoggedIn } from '../../API/CommonAPI'
import Swal from 'sweetalert2'
const Login = () => {
  IsLoggedIn();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const info ={
      email:emailRef.current.value,
      password:passwordRef.current.value
    };    
    const { json } = await LoginAPI("/api/auth/login", info);
    if(json.success === true){
      //alert('Hai');
      localStorage.setItem("authenticated", true);
      localStorage.setItem("token", json.token);
      localStorage.setItem("userType", json.type);
      localStorage.setItem("userName", json.name);
      localStorage.setItem("userID", json.id);
      localStorage.setItem("userEmail", json.email);
      Swal.fire({
        title: 'Success!',
        text: 'Logged In Success',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((res) => {
        if (res) {
            //navigate('/admin')
          if(json.type === 'admin'){
            window.location.href = "/admin";
          }else{
            window.location.href = "/";
          }
        }
        //navigate('/admin/dashboard');
      });
      //navigate('/admin')
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
    <div className="Login">
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
                                          <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                      </div>
                                      <form className="user" onSubmit={handleSubmit}>
                                          <div className="form-group">
                                              <input ref={emailRef} type="email" className="form-control form-control-user"
                                                  aria-describedby="emailHelp"
                                                  placeholder="Enter Email Address..." id="email" required="required" />
                                          </div>
                                          <div className="form-group">
                                              <input ref={passwordRef} type="password" className="form-control form-control-user"
                                                  placeholder="Password" id="password" required="required" />
                                          </div>                            
                                          <button className="btn btn-primary btn-user btn-block" type="submit">
                                              Login
                                          </button>
                                          <hr />                                          
                                      </form>
                                      <hr />                                      
                                      <div className="text-center">
                                          <Link className="small" to="/register">Create an Account!</Link>
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

export default Login;