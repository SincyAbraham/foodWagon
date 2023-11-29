import Header from '../Common/Layouts/Header'
import Footer from '../Common/Layouts/Footer'
import { Link,useParams } from 'react-router-dom';
import { GETDATA,POSTDATA,PUTDATA,DELETEDATA,IsLoggedInReturn } from '../../API/CommonAPI'
import {useState,useEffect,useRef} from "react"
import RenderImage from '../../components/OrderImage'
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
  const [order, setCount] = useState([]);
  const ShowOrder = () => {
      GETDATA(`/api/orders/${id}`,IsLoggedInReturn().key).then((res) => {
          setCount(res.json.data);
      });
  }
  useEffect(() => {
    ShowOrder();      
  },[setCount]);
  const dateformated = (function(d) {
      d = new Date(d);
      return `${(d.getMonth()+1).toString().replace(/^[0-9]$/g, '0$&')}/${(d.getDate()).toString().replace(/^[0-9]$/g, '0$&')}/${d.getFullYear()}`;
  });
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
                <div className="card">
                  <div className="card-header">
                  Invoice &nbsp;
                  <strong>{dateformated(order.created_at)}</strong> 
                    <span style={{textTransform:'capitalize'}} className="float-right"> <strong>Status:</strong> {order.status}</span>

                  </div>
                  <div className="card-body">
                  <div className="table-responsive-sm">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="center">#</th>
                        <th>Image</th>
                        <th>Item</th>
                        <th className="right">Unit Cost</th>
                        <th className="center">Qty</th>
                        <th className="right">Total</th>
                      </tr>
                    </thead>
                  {order.description ?  
                  <tbody>
                  {order.description.map((ord, index) => ( 
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td><RenderImage value={ord.productdata} /></td>
                    <td>{ord.product.name}</td>
                    <td>${ord.product.price}</td>
                    <td>{ord.quantity}</td>
                    <td>${ord.total}</td>
                  </tr>
                  ))}
                  <tr>
                    <td colSpan="2"></td>
                    <td colSpan="2"><strong>Total</strong></td>
                    <td><strong>${order.total}</strong></td>
                  </tr>
                  </tbody>
                  : '' }
                  </table>

                  </div>
                  </div>
                  </div>  
                  <Link className="btn btn-sm btn-primary mt-4" to="/user/orders">Back</Link>                              
            </div>
          </section>
          <Footer /> 
        </main>        
      }
    </div>
  )
};

export default Dashboard;