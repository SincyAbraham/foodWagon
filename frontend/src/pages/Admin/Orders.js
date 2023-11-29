import AdminNavbar from "../../components/AdminNavbar";
import AdminHeader from "../../components/AdminHeader";
import AdminFooter from "../../components/AdminFooter";
import { GETDATA,POSTDATA,PUTDATA,DELETEDATA } from '../../API/CommonAPI'
import {useState,useEffect,useRef} from "react"
import { Link,useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
const AdminOrders = () => {     
    const [orderdata, OrderssetData] = useState([])
    const ModalUpdateElement = useRef()
    const ModalUpdateElementClose = useRef()

    const ModalCreateElement = useRef()
    const ModalCreateElementClose = useRef()

    const OrdID = useRef()
    const OrdStatus = useRef()
    const ShowAllOrders = () => {
        let token = localStorage.getItem("token");
        GETDATA('/api/orders',token).then((res) => {
            OrderssetData(res.json.data);
        });
    }
    useEffect(() => {
         ShowAllOrders();       
    },[]);
    const dateformated = (function(d) {
        d = new Date(d);
        return `${(d.getMonth()+1).toString().replace(/^[0-9]$/g, '0$&')}/${(d.getDate()).toString().replace(/^[0-9]$/g, '0$&')}/${d.getFullYear()}`;
    });   

    const UpdateStatus = (id,status) => {
        OrdID.current.value = id;
        OrdStatus.current.value = status;
        ModalUpdateElement.current.click();
    }  
    const OrdersUpdate = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        const info ={
            status:OrdStatus.current.value
        }
        let urldata = '/api/orders/statusChange/'+OrdID.current.value;
        POSTDATA(urldata,info,token).then((res) => {
            ModalUpdateElementClose.current.click();
            ShowAllOrders();
        });        
    }    
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
    <div className="AdminOrders">
        <div id="wrapper">
            <AdminNavbar currentpage={{ name: 'orders'}} />          
            <div id="content-wrapper" className="d-flex flex-column">
                <AdminHeader/>                
                <div id="content">
                    <div className="container-fluid">                        
                        <h1 className="h3 mb-4 text-gray-800">Orders</h1>
                        <div className="card">                            
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered customtable_responsive">
                                        <thead>
                                            <tr>
                                                <td>Order ID</td> 
                                                <td>Name</td>
                                                <td>Email</td>
                                                <td>State</td>
                                                <td>Country</td>
                                                <td>Zip</td>
                                                <td>Payment Type</td>
                                                <td>Total</td>
                                                <td>Status</td>
                                                <td>Created At</td>
                                                <td>Actions</td>
                                            </tr>
                                        </thead>  
                                        <tbody>  
                                        {orderdata.map((order, index) => (                                              
                                            <tr key={index}>
                                                <td>{order.orderID}</td>  
                                                <td>{order.first_name} {order.last_name}</td>                       
                                                <td>{order.email}</td> 
                                                <td>{order.state}</td> 
                                                <td>{order.country}</td> 
                                                <td>{order.zip}</td> 
                                                <td>{order.payment_type}</td> 
                                                <td>${order.total}</td> 
                                                <td style={{textTransform:'capitalize'}}><strong className={OrderStatusClass(order.status)}>{order.status}</strong></td> 
                                                <td>{dateformated(order.created_at)}</td>
                                                <td>
                                                    <button className="btn btn-warning btn-sm" onClick={() => UpdateStatus(order._id,order.status)}><i className="fas fa-edit"></i></button>
                                                    <Link style={{marginLeft:'5px'}} to={`/admin/orders/${order._id}`} className="btn btn-warning btn-sm"><i className="fas fa-eye"></i></Link>
                                                </td>
                                            </tr>                                            
                                        ))}   
                                        </tbody>                               
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AdminFooter/>
            </div>
        </div>        
        <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
        </a>

        <button type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#OrdersUpdateModal" ref={ModalUpdateElement}></button>

        <div className="modal fade" id="OrdersUpdateModal" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Orders</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <form onSubmit={OrdersUpdate}>
                    <div className="modal-body">
                        <input type="hidden" ref={OrdID} />
                        <div className="form-group">
                            <label>Change Status</label>
                            <select className="form-control" name="status" ref={OrdStatus}>
                                <option value="cancel">Cancel</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal" ref={ModalUpdateElementClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>        
    </div>
    )
};

export default AdminOrders;