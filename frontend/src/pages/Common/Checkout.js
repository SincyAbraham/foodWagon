import Header from './Layouts/Header'
import Footer from './Layouts/Footer'
import { Link } from 'react-router-dom';
import { GetCartItems,RemoveCart } from '../../Ecommerce/Cart'
import { IsLoggedInReturn } from '../../API/CommonAPI'
import {useState,useEffect,useRef} from "react"
import { GETDATA,POSTDATA,PUTDATA,DELETEDATA } from '../../API/CommonAPI'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom';
const Checkout = () => {  
  const FrontEndUrl = () => {
    return window.location.origin+'/assets/frontend/';
  }
  const [products, setCount] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
      setCount(GetCartItems());
      const interval = setInterval(() => { 
          setCount(GetCartItems()); 
      }, 1000);
  },[setCount]);
  const _arrayBufferToBase64 = ( buffer ) => {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
  const readImage = (image) => {
      const base64String = `data:image/${image.contentType};base64,${_arrayBufferToBase64(image.data.data)}`;
      return base64String;
  } 
  const TotalAmount = () => {
    let total = 0;
    const newArr = products.map(num => total+= num.item_total);
    return total;
  } 
  const handleSubmit = (event) => {    
    event.preventDefault();
    
    let productdata = [];
    products.forEach((value,index) => {
        productdata.push({
          product: {
            name: value.item_name,
            price: value.item_price,
          },
          quantity: value.item_qty,
          total: value.item_total,
          productdata:`PROD-${value.item_id}`
        });
    });
    let orderid = Date.now();
    let info = {
      'order_id'      : orderid,
      'first_name'    : event.target.first_name.value,
      'last_name'     : event.target.last_name.value,
      'email'         : event.target.email.value,
      'address'       : event.target.address1.value + ' ' + event.target.address2.value,
      'country'       : event.target.country.value,
      'state'         : event.target.state.value,
      'zip'           : event.target.zip.value,
      'payment_type'  : 'Cash On Delivery',
      'user'          : IsLoggedInReturn().user_id,
      'total'         : TotalAmount(),
      'status'        : 'completed',
      'description'   : productdata,

    };
    let token = localStorage.getItem("token");
    let urldata = '/api/orders/';
    //console.log(info);
    POSTDATA(urldata,info,token).then((res) => {
      if(res.json.success === true){
        Swal.fire({
            title: 'Success!',
            text: res.json.message,
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then((res) => {
            if (res) {
                navigate(`/thanks/${orderid}`);
                RemoveCart();
            }
        }); 
      }      
    });
  }
  return (
    <div className="Checkout">
      <main className="main" id="top">
          <Header /> 
            <section className="py-5 overflow-hidden bg-primary" id="home">
            <div className="container">
              <div className="row flex-center">
                <div className="col-md-5 col-lg-6 order-0 order-md-1 mt-8 mt-md-0"><a className="img-landing-banner" href="#!"><img className="img-fluid" src={ FrontEndUrl()+'img/gallery/hero-header.png' } alt="hero-header" /></a></div>
              </div>
            </div>
          </section> 
          <section className="py-5">
            <div className="container">

                {IsLoggedInReturn().status === 'true' && IsLoggedInReturn().type === 'user' ?          
                <div className="row">
                  <div className="col-md-4 order-md-2 mb-4">
                      <h4 className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-muted">Your cart</span>
                          <span className="badge badge-secondary badge-pill">{products.length}</span>
                      </h4>
                      <ul className="list-group mb-3 sticky-top">
                          {products.length === 0 ? <div className="alert alert-danger">Cart Empty</div> : '' }
                          {products.map((food, index) => ( 
                            <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">{food.item_name}</h6>
                                    <small className="text-muted">({food.item_qty} x {food.item_price})</small>
                                </div>
                                <span className="text-muted">$ {food.item_total}</span>
                            </li>
                          ))}           
                          <li className="list-group-item d-flex justify-content-between">
                              <span>Total Amount</span>
                              <strong>$ {TotalAmount()}</strong>
                          </li>
                      </ul>       
                  </div>
                  <div className="col-md-8 order-md-1">
                      <h4 className="mb-3">Billing address</h4>
                      <form className="checkoutForm needs-validation" noValidate="" onSubmit={handleSubmit}>
                          <div className="row">
                              <div className="col-md-6 mb-3">
                                  <label>First name</label>
                                  <input type="text" className="form-control" id="firstName" placeholder="" required="required" name="first_name" />
                                  <div className="invalid-feedback"> Valid first name is required. </div>
                              </div>
                              <div className="col-md-6 mb-3">
                                  <label>Last name</label>
                                  <input type="text" className="form-control" id="lastName" placeholder="" required="required" name="last_name" />
                                  <div className="invalid-feedback"> Valid last name is required. </div>
                              </div>
                          </div>
                          <div className="mb-3">
                              <label>Email <span className="text-muted"></span></label>
                              <input value={IsLoggedInReturn().email} readOnly="readonly" type="email" className="form-control" id="email" placeholder="you@example.com" name="email" required="required" />
                              <div className="invalid-feedback"> Please enter a valid email address for shipping updates. </div>
                          </div>
                          <div className="mb-3">
                              <label>Address</label>
                              <input type="text" className="form-control" id="address" placeholder="1234 Main St" name="address1" required="required" />
                              <div className="invalid-feedback"> Please enter your shipping address. </div>
                          </div>
                          <div className="mb-3">
                              <label>Address 2 <span className="text-muted">(Optional)</span></label>
                              <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" name="address2" />
                          </div>
                          <div className="row">
                              <div className="col-md-5 mb-3">
                                  <label>Country</label>
                                  <select className="custom-select d-block w-100" id="country" required="required" name="country">
                                      <option value="">Choose...</option>
                                      <option>Ireland</option>
                                  </select>
                                  <div className="invalid-feedback"> Please select a valid country. </div>
                              </div>
                              <div className="col-md-4 mb-3">
                                  <label>County</label>
                                  <select className="custom-select d-block w-100" id="state" required="required" name="state">
                                      <option value="">Choose...</option>
                                      <option>Dublin</option>
                                      <option>Limerick</option>
                                      <option>Cork</option>
                                      <option>Clarrina</option>
                                      <option>Mullingar</option>




                                  </select>
                                  <div className="invalid-feedback"> Please provide a valid state. </div>
                              </div>
                              <div className="col-md-3 mb-3">
                                  <label>Zip</label>
                                  <input type="text" className="form-control" id="zip" placeholder="" required="required" name="zip" />
                                  <div className="invalid-feedback"> Zip code required. </div>
                              </div>
                          </div>
                          <hr className="mb-4" />
                          <h4 className="mb-3">Payment</h4>
                          <div className="d-block my-3">
                              <div className="custom-control custom-radio">
                                  <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked="checked" readOnly="readonly" required="required" />
                                  <label className="custom-control-label">Cash On Delivery</label>
                              </div>                                                           
                          </div>                          
                          <hr className="mb-4" />
                          <button className="btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                      </form>
                  </div>
                </div>  
                : <div className="alert alert-danger text-center text-white">
                    <h4>Please login to continue</h4>
                    <Link to="/login" className="btn btn-primary btn-sm">Click to login</Link>
                  </div> 
                }            
            </div>
          </section>
          <Footer /> 
        </main>        
    </div>
  )
};

export default Checkout;