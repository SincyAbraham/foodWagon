import { Link } from 'react-router-dom';
import { GETDATA } from '../API/CommonAPI'
import {useState,useEffect,useRef} from "react"
const RenderImage = (props) => {
  const [image, ImagesetData] = useState([])
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
  const GetIMGSrc = () => {
    let id = props.value.replace('PROD-','');
    GETDATA('/api/products/getdata/'+id).then((res) => {
        ImagesetData(res.json.data);
    });
  }
  useEffect(() => {
      GetIMGSrc();       
  },[]);
  return (
    <div className="RenderImage">
      {image.img ? <img alt="" className="order_image_thumb" src={readImage(image.img)} /> : '' }
    </div>
  )
};

export default RenderImage;