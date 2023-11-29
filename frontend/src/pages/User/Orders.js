import Header from '../Common/Layouts/Header'
import Footer from '../Common/Layouts/Footer'
import { Link,useParams } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar'
import { GETDATA,POSTDATA,PUTDATA,DELETEDATA,IsLoggedInReturn } from '../../API/CommonAPI'
import {useState,useEffect,useRef} from "react"
const Orders = () => {    
  const FrontEndUrl = () => {
    return window.location.origin+'/assets/frontend/';
  } 
  const [orders, setCount] = useState([]);
  const DashboardStyle = {
    backgroundImage:`url(${FrontEndUrl()}img/dashboard.jpg)`,
    height:'400px',
    backgrounSize: 'cover',
    backgroundPosition: 'center'
  }
  const ShowAllOrders = () => {
      GETDATA(`/api/orders/user/${IsLoggedInReturn().user_id}`,IsLoggedInReturn().key).then((res) => {
          setCount(res.json.data);
      });
  }
  useEffect(() => {
    ShowAllOrders();      
  },[setCount]);
  const dateformated = (function(d) {
      d = new Date(d);
      return `${(d.getMonth()+1).toString().replace(/^[0-9]$/g, '0$&')}/${(d.getDate()).toString().replace(/^[0-9]$/g, '0$&')}/${d.getFullYear()}`;
  });
  const OrderStatusClass = (status) => {
    if(status === 'completed'){
      return 'text-warning';
    }else if(status === 'pending' || status === 'cancel'){
      return 'text-danger';
    }else if(status === 'delivered'){
      return 'text-success';
    }
  }
  return (
    <div className="Orders">
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
                      <UserNavbar currentpage={{ name: 'orders'}} />         
                  </div>
                  <div className="col-md-8">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Payment Type</th>
                              <th>Total</th>
                              <th>Status</th>
                              <th>Created</th>
                              <th>View Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((ord, index) => ( 
                              <tr key={index}>
                                <td>{ord.orderID}</td>
                                <td>{ord.payment_type}</td>
                                <td>${ord.total}</td>
                                <td>
                                <span style={{textTransform:'capitalize'}} className={OrderStatusClass(ord.status)}><strong>{ord.status}</strong></span>
                                </td>
                                <td>{dateformated(ord.created_at)}</td>
                                <td>
                                  <Link to={`/user/orders/${ord._id}`} className="btn btn-primary btn-sm">Invoice</Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                  </div>
                </div>                                
            </div>
          </section>
          <Footer /> 
        </main>        
    </div>
  )
};

export default Orders;