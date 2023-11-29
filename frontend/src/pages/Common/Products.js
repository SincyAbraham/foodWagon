import Header from './Layouts/Header'
import Footer from './Layouts/Footer'
import { Link } from 'react-router-dom';
import { GETDATA,POSTDATA,PUTDATA,DELETEDATA,GETCOMMONDATA } from '../../API/CommonAPI'
import {useState,useEffect,useRef} from "react"
import { AddCart } from '../../Ecommerce/Cart'
const Products = () => {  
  const FrontEndUrl = () => {
    return window.location.origin+'/assets/frontend/';
  }
  const [fooddata, FoodsetData] = useState([])
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
  const CardImageTop = {
    flexGrow:'1',
    objectFit:'cover',
    maxHeight:'300px !important',
    height:'300px !important',
    borderRadius:'0px',
    flexShrink: 'unset'
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
    <div className="Products">
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
                   <div className="row row-cols-2 row-cols-md-4">
                      <div className="col-lg-12 mx-auto text-center mt-2 mb-5">
                        <h5 className="fw-bold fs-3 fs-lg-5 lh-sm">Foods</h5>
                      </div>
                      {fooddata.map((food, index) => (
                      <div key={index} className="col-md-4 mb-4">
                          <div className="card p-2 no-border">
                              <img src={readImage(food.img)} className="card-img-top card-image-300" style={CardImageTop} alt="" />
                              <div className="card-body ps-0">
                                <h5 className="fw-bold text-1000 text-truncate mb-1">{ food.name }</h5>
                                <span className="text-1000 fw-bold">€{ food.price }</span>
                              </div>
                              <div className="btn-group">
                                <a className="btn btn-lg btn-primary mr-3 btn-sm" role="button" onClick={() => AddToCart(food)}>Add To Cart</a>
                                <Link to={`/productdetails/${food._id}`} className="btn btn-lg btn-success btn-sm">View Details</Link>
                              </div>
                          </div>
                      </div>
                      ))}
                      {(fooddata.length === 0) ? <div className="alert alert-danger">Sorry No Data</div> : ''}  
                   </div>
              </div>
            </section>  
          <Footer /> 
        </main>        
    </div>
  )
};

export default Products;