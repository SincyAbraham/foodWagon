import AdminNavbar from "../../components/AdminNavbar";
import AdminHeader from "../../components/AdminHeader";
import AdminFooter from "../../components/AdminFooter";
const AdminProfile = () => {
  return (
    <div className="AdminProfile">
        <div id="wrapper">
            <AdminNavbar currentpage={{ name: 'profile'}} />          
            <div id="content-wrapper" className="d-flex flex-column">
                <AdminHeader/>                
                <div id="content">
                    <div className="container-fluid">                        
                        <h1 className="h3 mb-4 text-gray-800">Profile</h1>
                    </div>
                </div>
                <AdminFooter/>
            </div>
        </div>        
        <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
        </a>
    </div>
  )
};

export default AdminProfile;