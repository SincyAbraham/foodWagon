import Header from '../Common/Layouts/Header'
import Footer from '../Common/Layouts/Footer'
import { Link,useParams } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar'
const Dashboard = () => {    
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
  return (
    <div className="Dashboard">
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
                      <UserNavbar currentpage={{ name: 'dashboard'}} />         
                  </div>
                  <div className="col-md-8">
                      Dashboard
                  </div>
                </div>                                
            </div>
          </section>
          <Footer /> 
        </main>        
    </div>
  )
};

export default Dashboard;