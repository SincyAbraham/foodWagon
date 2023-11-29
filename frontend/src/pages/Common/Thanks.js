import Header from './Layouts/Header'
import Footer from './Layouts/Footer'
import { Link,useParams } from 'react-router-dom';
const Thanks = () => {    
  const { id } = useParams(); 
  const FrontEndUrl = () => {
    return window.location.origin+'/assets/frontend/';
  } 
  return (
    <div className="Thanks">
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

                <div className="alert alert-success text-center text-white">
                  <h4>Thanks for your order. Your order ID IS : {id}</h4>
                  <div className="button button-group">
                    <Link to="/" className="btn btn-primary btn-sm">Home</Link>
                  </div>
                </div>            
            </div>
          </section>
          <Footer /> 
        </main>        
    </div>
  )
};

export default Thanks;