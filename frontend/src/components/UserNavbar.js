import { Link } from 'react-router-dom';
import { CheckUserLogin } from '../API/CommonAPI'
const UserNavbar = (props) => {
  CheckUserLogin();
  return (
    <div className="UserNavbar">
      <ul className="list-group">
        <li className={(props.currentpage.name === 'dashboard') ? 'list-group-item active' : 'list-group-item'}><Link to="/user/dashboard">Dashboard</Link></li>
        <li className={(props.currentpage.name === 'profile') ? 'list-group-item active' : 'list-group-item'}><Link to="/user/profile">Profile</Link></li>
        <li className={(props.currentpage.name === 'orders') ? 'list-group-item active' : 'list-group-item'}><Link to="/user/orders">Orders</Link></li>
      </ul>
    </div>
  )
};

export default UserNavbar;