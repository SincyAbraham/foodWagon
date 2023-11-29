import Header from './Layouts/Header'
import Footer from './Layouts/Footer'
import { Link } from 'react-router-dom';
import { GetCartItems,RemoveCart,CartIncrement,CartDecrement,RemoveCartByID } from '../../Ecommerce/Cart'
import {useState,useEffect,useRef} from "react"
const Cart = () => {  
  const FrontEndUrl = () => {
    return window.location.origin+'/assets/frontend/';
  }
  const [products, setCount] = useState([]);
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
  return (
    <div className="Cart">
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
              <div className="row d-flex justify-content-center ">
                <div className="col-lg-12 mx-auto text-center mt-2 mb-5">
                  <h5 className="fw-bold fs-3 fs-lg-5 lh-sm">Cart</h5>
                </div>
                <div className="col-md-8">
                  <div className="card mb-4">
                    <div className="card-header py-3">
                      <h5 className="mb-0">Cart - {products.length} items</h5>
                    </div>
                    <div className="card-body">
                      {products.length === 0 ? <div className="alert alert-danger">Cart Empty</div> : ''}
                      {products.map((food, index) => ( 
                        <div className="CartItems" key={index}>
                          <div className="row">

                            <div className="col-lg-3 col-md-12 mb-lg-0">
                              <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">                              
                                {food.item_image ? <img alt="" src={food ? readImage(food.item_image) : ''} className="w-100" /> : '' }
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                              <p><strong>{food.item_name}</strong></p>  
                              <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                              title="Remove item" onClick={() => RemoveCartByID(food.item_name)}>
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>

                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 cart_quantity_box">
                              <div className="d-flex mb-4">
                                <button className="btn btn-primary px-3 me-2" onClick={() => CartDecrement(food.item_name)}>
                                  <i className="fas fa-minus"></i>
                                </button>
                                <div className="form-outline">
                                  <input value={food.item_qty} type="text" className="form-control" readOnly="readonly" />
                                </div>
                                <button className="btn btn-primary px-3 ms-2" onClick={() => CartIncrement(food.item_name)}>
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                              <p className="text-start text-md-center">
                                <strong>$ {food.item_price}</strong>
                              </p>
                            </div>

                          </div>
                          <hr className="my-4" />
                        </div>
                      ))}
                    </div>
                  </div>                  
                  
                </div>
                <div className="col-md-4">
                  <div className="card mb-4">
                    <div className="card-header py-3">
                      <h5 className="mb-0">Summary</h5>
                    </div>
                    <div className="card-body">
                      {products.length === 0 ? <div className="alert alert-danger">Cart Empty</div>
                      : '' }
                      <ul className="list-group list-group-flush">
                      {products.map((food, index) => ( 
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          {food.item_name} x {food.item_qty}
                          <span>$ {food.item_total}</span>
                        </li>
                      ))}
                      <li
                          className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong>Total amount</strong>
                           </div>
                          <span><strong>$ {TotalAmount()}</strong></span>
                        </li>
                      </ul>
                      <Link to="/checkout" className="btn btn-primary btn-lg btn-block">
                        Go to checkout
                      </Link>
                    </div>
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

export default Cart;