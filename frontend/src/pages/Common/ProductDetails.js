import Header from './Layouts/Header'
import Footer from './Layouts/Footer'
import { Link } from 'react-router-dom';
import { GETDATA,POSTDATA,PUTDATA,DELETEDATA,GETCOMMONDATA } from '../../API/CommonAPI'
import {useState,useEffect,useRef} from "react"
import { useParams } from 'react-router-dom';
import { AddCart } from '../../Ecommerce/Cart'
const ProductDetails = () => { 
  const { id } = useParams();   
  const FrontEndUrl = () => {
    return window.location.origin+'/assets/frontend/';
  }
  const [fooddata, FoodsetData] = useState([])
  const ShowAllFoodWithID = () => {
      GETCOMMONDATA('/api/products/getdata/'+id)
      .then((res) => {
          FoodsetData(res.json.data);       
      });
  }
  useEffect(() => {
    ShowAllFoodWithID();    
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
    <div className="ProductDetails">
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
                        <h5 className="fw-bold fs-3 fs-lg-5 lh-sm">{fooddata.name}</h5>
                      </div>                      
                   </div>
              </div>
              <div className="container">
                <div className="row align-items-start">
                  <div className="col-lg-12 m-15px-tb">
                      <article className="article row">
                          <div className="article-img col-md-5">                          
                              {fooddata.img ? <img alt="" src={fooddata ? readImage(fooddata.img) : ''} className="card-img-top " /> : '' }
                          </div>                          
                          <div className="article-content col-md-7">
                              <p>{fooddata.description}</p>
                              <div className="btn-group mt-4">
                                <a className="btn btn-lg btn-primary mr-3 btn-sm" role="button" onClick={() => AddToCart(fooddata)}>Add To Cart</a>
                              </div>
                          </div>                          
                      </article>
                    </div>
                  </div>
                </div>      
            </section>  
          <Footer /> 
        </main>
    </div>
  )
};

export default ProductDetails;