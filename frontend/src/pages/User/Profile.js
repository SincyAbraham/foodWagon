import Header from '../Common/Layouts/Header'
import Footer from '../Common/Layouts/Footer'
import { Link,useParams } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar'
import { GETDATA,POSTDATA,PUTDATA,DELETEDATA,IsLoggedInReturn } from '../../API/CommonAPI'
import {useState,useEffect,useRef} from "react"
const Profile = () => {    
  const { id } = useParams(); 
  const FrontEndUrl = () => {
    return window.location.origin+'/assets/frontend/';
  } 
  const DashboardStyle = {
    backgroundImage:`url(${FrontEndUrl()}img/dashboard.jpg)`,
    height:'400px',
    backgrounSize: 'cover',
    backgroundPosition: 'center'
  }
  const [user, setCount] = useState([]);
  const ShowUserData = () => {
      GETDATA(`/api/users/${IsLoggedInReturn().user_id}`,IsLoggedInReturn().key).then((res) => {
          setCount(res.json.data);
      });
  }
  useEffect(() => {
    ShowUserData();      
  },[setCount]);
  return (
    <div className="Profile">
      <main className="main" id="top">
          <Header /> 
            <section className="py-5 overflow-hidden bg-primary" id="home" style={DashboardStyle}>
            <div className="container">
              <div className="row flex-center">
                <div className="col-md-5 col-lg-6 order-0 order-md-1 mt-8 mt-md-0"></div>
              </div>
            </div>
          </section> 
          <section className="py-5">
            <div className="container">
                <div className="row">
                  <div className="col-md-4">
                      <UserNavbar currentpage={{ name: 'profile'}} />         
                  </div>
                  <div className="col-md-8">
                      <table className="table-bordered table">
                        <tbody>
                          <tr>
                            <th>Name</th>
                            <td><span style={{textTransform:'capitalize'}}>{user.name}</span></td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td><span style={{textTransform:'capitalize'}}>{user.email}</span></td>
                          </tr>
                          {user.roles ? 
                          <tr>
                            <th>Role</th>
                            <td><span style={{textTransform:'capitalize'}}>{user.roles[0].name}</span></td>
                          </tr>
                          : '' }
                          </tbody>
                      </table>
                  </div>
                </div>                                
            </div>
          </section>
          <Footer /> 
        </main>        
    </div>
  )
};

export default Profile;