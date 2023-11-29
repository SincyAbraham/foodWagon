import { Link } from 'react-router-dom';
import { CheckAdminLogin } from '../API/CommonAPI'
import {useState,useEffect,useRef} from "react"
const AdminNavbar = (props) => {
  const logout = () => {
    localStorage.setItem("authenticated", false);
    localStorage.setItem("token", '');
    localStorage.setItem("userType", '');
    window.location.href = '/login';
  }
  CheckAdminLogin();
  return (
    <div className="AdminNavbar bg-gradient-primary">
        <ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">
                
            <Link to="/admin/dashboard" className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fapropss fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Food Delivery APP</div>
            </Link>
            
            <hr className="sidebar-divider my-0" />

            
            <li className={(props.currentpage.name === 'dashboard') ? 'active nav-item' : 'nav-item'}>
                <Link to="/admin/dashboard" className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></Link>
            </li>
            
            <li className={(props.currentpage.name === 'users') ? 'active nav-item' : 'nav-item'}>
                <Link to="/admin/users" className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Users</span></Link>
            </li>

            <li className={(props.currentpage.name === 'categories') ? 'active nav-item' : 'nav-item'}>
                <Link to="/admin/categories" className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Categories</span></Link>
            </li>

            <li className={(props.currentpage.name === 'foods') ? 'active nav-item' : 'nav-item'}>
                <Link to="/admin/foods" className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Foods</span></Link>
            </li>

            <li className={(props.currentpage.name === 'orders') ? 'active nav-item' : 'nav-item'}>
                <Link to="/admin/orders" className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Orders</span></Link>
            </li>

        </ul>

        <div className="modal fade" id="logoutModal" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a className="btn btn-primary" onClick={logout}>Logout</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default AdminNavbar;