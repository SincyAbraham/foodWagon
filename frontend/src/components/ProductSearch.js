import { Link } from 'react-router-dom';
const ProductSearch = (props) => {  
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
  return (    
    <div className="ProductSearch">
        {props.pagedata ? 
        <div className="searchData">
            <ul className="row cart_items">
            {props.pagedata.datas.map((food, index) => (
                <li className="col-md-12" key={index}>                    
                  <div className="row">
                    <div className="col-md-5">
                      {food.img ? <img alt="" src={food ? readImage(food.img) : ''} className="cart_items_image" /> : '' }
                    </div>
                    <div className="col-md-7 ps-0">
                      <h2 className="cart_items_heading">{food.name}</h2>
                      <p className="cart_items_price">Price : $ {food.price}</p>
                      <a className="btn btn-primary" href={`/productdetails/${food._id}`}>View Details</a>
                    </div>
                  </div>                    
                </li>
            ))} 
            </ul>   
        </div>
        : '' }
    </div>

  )
};

export default ProductSearch;