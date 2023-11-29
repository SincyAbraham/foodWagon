import { Link } from 'react-router-dom';
const Footer = () => {
  const FrontEndUrl = () => {
    return window.location.origin+'/assets/frontend/';
  }
  const bgHolder = {
    backgroundImage: 'url('+FrontEndUrl()+'img/gallery/cta-two-bg.png)',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }
  return (
    <div className="Footer">
        <section className="py-0">
            <div className="bg-holder" style={bgHolder}>
            </div>

            <div className="container">
              <div className="row flex-center">
                <div className="col-xxl-9 py-7 text-center">
                  <h1 className="fw-bold mb-4 text-white fs-6">Are you ready to order <br />with the best deals? </h1>
                    <Link className="btn btn-danger" to="/products">
                      View All Products<i className="fas fa-chevron-right ms-2"></i>
                    </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="py-0 pt-7 bg-1000">

            <div className="container">
        
              <hr className="border border-800" />
              <div className="row flex-center pb-3">
                <div className="col-md-6 order-0">
                  <p className="text-200 text-center text-md-start">All rights Reserved &copy; Your Company, 2021</p>
                </div>
                <div className="col-md-6 order-1">
                  <p className="text-200 text-center text-md-end"> Made with&nbsp;
                    <svg className="bi bi-suit-heart-fill" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#FFB30E" viewBox="0 0 16 16">
                      <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"></path>
                    </svg>&nbsp;by&nbsp;<a className="text-200 fw-bold" href="#" >Free Themes </a>
                  </p>
                </div>
              </div>
            </div>

          </section> 
    </div>
  )
};

export default Footer;