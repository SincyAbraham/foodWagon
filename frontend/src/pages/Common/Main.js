import Header from './Layouts/Header'
import Footer from './Layouts/Footer'
import { Link } from 'react-router-dom';
import { GETDATA,POSTDATA,PUTDATA,DELETEDATA,GETCOMMONDATA } from '../../API/CommonAPI'
import { AddCart } from '../../Ecommerce/Cart'
import {useState,useEffect,useRef} from "react"
const Main = () => {  
  const [fooddata, FoodsetData] = useState([])
  const [cartdata, CartsetData] = useState([])
  const FrontEndUrl = () => {
    return window.location.origin+'/assets/frontend/';
  }
  const bgHolder = {
    backgroundImage: 'url('+FrontEndUrl()+'img/gallery/cta-two-bg.png)',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }
  const ShowAllFood = () => {
      GETCOMMONDATA('/api/products').then((res) => {
          FoodsetData(res.json.data);
      });
  }
  useEffect(() => {
    ShowAllFood();  
  },[]);
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
  const AddToCart = (food) => {
    const cartData = {
      'item_id'         : food._id,
      'item_name'       : food.name,
      'item_qty'        : 1,
      'item_price'      : food.price,
      'item_image'      : food.img,
      'item_total'      : food.price,
    };    
    AddCart(cartData);
  }
  return (
    <div className="Main">
        
          <main className="main" id="top">
          <Header />          
          <section className="py-5 overflow-hidden bg-primary" id="home">
            <div className="container">
              <div className="row flex-center">
                <div className="col-md-5 col-lg-6 order-0 order-md-1 mt-8 mt-md-0"><a className="img-landing-banner" href="#!"><img className="img-fluid" src={ FrontEndUrl()+'img/gallery/hero-header.png' } alt="hero-header" /></a></div>
                <div className="col-md-7 col-lg-6 py-8 text-md-start text-center">
                  <h1 className="display-1 fs-md-5 fs-lg-6 fs-xl-8 text-light">Are you starving?</h1>
                  <h1 className="text-800 mb-5 fs-4">Within a few clicks, find meals that<br className="d-none d-xxl-block" />are accessible near you</h1>
                  
                </div>
              </div>
            </div>
          </section>
         
          <section className="py-5 overflow-hidden">

            <div className="container">
              <div className="row h-100">
                <div className="col-lg-7 mx-auto text-center mt-7 mb-5">
                  <h5 className="fw-bold fs-3 fs-lg-5 lh-sm">Foods</h5>
                </div>
                <div className="col-12">
                  <div className="row gx-3 h-100 align-items-center">
                        {fooddata.slice(0,3).map((food, index) => (                      
                          <div key={index} className="col-sm-6 col-md-4 mb-5 h-100">
                            <div className="card card-span rounded-3">
                              {food ? 
                              <img className="card-image-auto img-fluid rounded-3 h-100" src={readImage(food.img)} alt="..." />
                              : ''}
                              <div className="card-body ps-0">
                                <h5 className="fw-bold text-1000 text-truncate mb-1">{ food.name }</h5>
                                <span className="text-1000 fw-bold">€{ food.price }</span>
                              </div>
                            </div>
                            <div className="btn-group">
                              <a className="btn btn-lg btn-primary mr-3 btn-sm" onClick={() => AddToCart(food)}>Add To Cart</a>
                              <Link to={`productdetails/${food._id}`} className="btn btn-lg btn-success btn-sm">View Details</Link>
                            </div>
                          </div>
                        ))}
                        {(fooddata.length === 0) ? <div className="alert alert-danger">Sorry No Data</div> : ''}                                              
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

export default Main;