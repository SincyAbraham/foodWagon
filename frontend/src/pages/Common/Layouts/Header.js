import { Helmet, HelmetProvider } from 'react-helmet-async';
import { IsLoggedInReturn } from '../../../API/CommonAPI'
import { GetCartItems,RemoveCart } from '../../../Ecommerce/Cart'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; 
import ProductSearch from '../../../components/ProductSearch'
import { GETDATA,POSTDATA,PUTDATA,DELETEDATA,GETCOMMONDATA } from '../../../API/CommonAPI'
const Header = () => {
  const [products, setCount] = useState([]); 
  const [productsSearch, setCountProducts] = useState([]); 
  const FrontEndUrl = () => {
    return window.location.origin+'/assets/frontend/';
  }
  const Logout = () => {
    localStorage.setItem("authenticated", false);
    localStorage.setItem("token", '');
    localStorage.setItem("userType", '');
    localStorage.setItem("userName", '');
    window.location.href = '/';
  }

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
  const ClearCart = (event) => {
    event.preventDefault();
    RemoveCart();
    setCount(GetCartItems());
  }
  const SearchProduct = async (e) => {
    //console.log(e.target.value);
    //const products = await Product.findByIdAndRemove(req.params.id);
    //console.log(products)
    GETCOMMONDATA(`/api/products/search/${e.target.value}`).then((res) => {
      //console.log(res.json.length);
      if(res.json.length > 0){
        setCountProducts(res.json);
      }
    });
  }
  return (
    <div className="Header">
        <HelmetProvider>
          <Helmet>
            <link rel="apple-touch-icon" sizes="180x180" href={FrontEndUrl()+'img/favicons/apple-touch-icon.png'} />
            <link rel="icon" type="image/png" sizes="32x32" href={FrontEndUrl()+'img/favicons/favicon-32x32.png'} />
            <link rel="icon" type="image/png" sizes="16x16" href={FrontEndUrl()+'img/favicons/favicon-16x16.png'} />
            <link rel="shortcut icon" type="image/x-icon" href={FrontEndUrl()+'img/favicons/favicon.ico'} />
            <link rel="manifest" href={FrontEndUrl()+'img/favicons/manifest.json'} />
            <meta name="msapplication-TileImage" content={FrontEndUrl()+'img/favicons/mstile-150x150.png'} />
            <meta name="theme-color" content="#ffffff" />
            <link href={FrontEndUrl()+'css/theme.css'} rel="stylesheet" />
          </Helmet>
        </HelmetProvider>  
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" data-navbar-on-scroll="data-navbar-on-scroll">
            <div className="container"><Link className="navbar-brand d-inline-flex" to="/"><img className="d-inline-block" src={ FrontEndUrl()+'img/gallery/logo.svg' } alt="logo" /><span className="text-1000 fs-3 fw-bold ms-2 text-gradient">foodwaGon</span></Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"> </span></button>
              <div className="collapse navbar-collapse border-top border-lg-0 my-2 mt-lg-0" id="navbarSupportedContent">
                <div className="mx-auto pt-5 pt-lg-0 d-block d-lg-none d-xl-block">
                  
                </div>
                <form className="d-flex mt-4 mt-lg-0 ms-lg-auto ms-xl-0">
                  <div className="serachdataHanger input-group-icon pe-2"><i className="fas fa-search input-box-icon text-primary"></i>
                    <input onChange={SearchProduct} className="form-control border-0 input-box bg-100" type="search" placeholder="Search Food" aria-label="Search" />
                    <ProductSearch pagedata={{ datas: productsSearch}} />
                  </div>
                  {IsLoggedInReturn().status === 'false' ? 
                    <Link to='/login' className="btn btn-white shadow-warning text-warning" type="submit"> <i className="fas fa-user me-2"></i>Login</Link>
                    :
                    <button onClick={Logout} className="btn btn-white shadow-warning text-warning"><i className="fas fa-user me-2"></i> ({IsLoggedInReturn().name }) Logout</button>
                  } 

                  {IsLoggedInReturn().status === 'false' ? 
                    <Link to='/register' className="btn btn-white shadow-warning text-warning" type="submit"> <i className="fas fa-user me-2"></i>Register</Link>
                  : '' }                  

                  <div className="dropdown">
                    <button className="btn btn-white shadow-warning text-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    { products.length === 0 ? '0 Items' : products.length +' Items' }
                    </button>
                    <div className="dropdown-menu cart_items_menu" aria-labelledby="dropdownMenuButton">
                      <ul className="row cart_items">
                        { products.map((food, index) => ( 
                        <li className="col-md-12" key={index}>
                          <div className="row">
                            <div className="col-md-5">
                              {food.item_image ? <img alt="" src={food ? readImage(food.item_image) : ''} className="cart_items_image" /> : '' }
                            </div>
                            <div className="col-md-7 ps-0">
                              <h2 className="cart_items_heading">{food.item_name}</h2>
                              <p className="cart_items_qty">QTY : {food.item_qty}</p>
                              <p className="cart_items_price">Price : $ {food.item_total}</p>
                            </div>
                          </div>
                        </li>
                        ))}
                        {products.length > 0 ?
                        <li className="col-md-12">
                          <Link to="/cart" className="btn btn-primary btn-sm">Cart</Link>
                          <button onClick={ClearCart} className="btn btn-danger btn-sm ms-2">Clear Cart</button>
                        </li>
                        : '' }
                      </ul>
                    </div>
                  </div>  

                  {IsLoggedInReturn().status === 'true' && IsLoggedInReturn().type === 'user' ? 
                    <Link to='/user/dashboard' className="btn btn-warning shadow-warning text-white" type="submit"> <i className="fas fa-user me-2"></i>Dashboard</Link>
                    : ''}              
                  </form>
              </div>
            </div>
          </nav>
    </div>
  )
};

export default Header;