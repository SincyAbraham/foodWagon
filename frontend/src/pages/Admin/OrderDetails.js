import AdminNavbar from "../../components/AdminNavbar";
import AdminHeader from "../../components/AdminHeader";
import AdminFooter from "../../components/AdminFooter";
import { Link,useParams } from 'react-router-dom';
import { GETDATA,POSTDATA,PUTDATA,DELETEDATA,IsLoggedInReturn } from '../../API/CommonAPI'
import {useState,useEffect,useRef} from "react"
import RenderImage from '../../components/OrderImage'
const AdminOrderDetails = () => {
  const { id } = useParams(); 
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
    <div className="AdminOrderDetails">
        <div id="wrapper">
            <AdminNavbar currentpage={{ name: 'dashboard'}} />          
            <div id="content-wrapper" className="d-flex flex-column">
                <AdminHeader/>                
                <div id="content">
                    <div className="container-fluid">                        
                        <h1 className="h3 mb-4 text-gray-800">Order Details</h1>
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
                        <td>Image</td>
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
                  <Link className="btn btn-sm btn-primary mt-4" to="/admin/orders">Back</Link>                              
                    </div>
                </div>                
                <AdminFooter/>
            </div>
        </div>        
        <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
        </a>
    </div>
  )
};

export default AdminOrderDetails;