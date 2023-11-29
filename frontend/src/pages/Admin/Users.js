import AdminNavbar from "../../components/AdminNavbar";
import AdminHeader from "../../components/AdminHeader";
import AdminFooter from "../../components/AdminFooter";
import { GETDATA,POSTDATA,PUTDATA,DELETEDATA } from '../../API/CommonAPI'
import {useState,useEffect,useRef} from "react"
import Swal from 'sweetalert2'
const AdminUsers = () => {     
    const [userdata, UsersetData] = useState([])
    const [rolesdata, RolesetData] = useState([])
    const ModalUpdateElement = useRef()
    const ModalUpdateElementClose = useRef()

    const ModalCreateElement = useRef()
    const ModalCreateElementClose = useRef()

    const UsrID = useRef()
    const UsrName = useRef()
    const UsrEmail = useRef()
    const UsrRole = useRef()
    const ShowAllUser = () => {
        let token = localStorage.getItem("token");
        GETDATA('/api/users',token).then((res) => {
            UsersetData(res.json.data);
        });
    }
    const ShowAllRoles = () => {
        let token = localStorage.getItem("token");
        GETDATA('/api/users/roles',token).then((res) => {
            RolesetData(res.json.data);
        });
    }
    useEffect(() => {
         ShowAllUser();
         ShowAllRoles();       
    },[]);
    const dateformated = (function(d) {
        d = new Date(d);
        return `${(d.getMonth()+1).toString().replace(/^[0-9]$/g, '0$&')}/${(d.getDate()).toString().replace(/^[0-9]$/g, '0$&')}/${d.getFullYear()}`;
    });   

    const UpdateData = (name,email,role,id) => {
        UsrID.current.value = id;
        UsrName.current.value = name;
        UsrEmail.current.value = email;
        UsrRole.current.value = role;
        ModalUpdateElement.current.click();
    }  
    const UserUpdate = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        const info ={
            name:UsrName.current.value,
            email:UsrEmail.current.value,
            roles:UsrRole.current.value
        }
        let urldata = '/api/users/'+UsrID.current.value;
        PUTDATA(urldata,info,token).then((res) => {
            console.log(res);
            ModalUpdateElementClose.current.click();
            ShowAllUser();
        });        
    }
    const DeleteData = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then((isConfirm) => {
            if(isConfirm.isConfirmed === true){
                //alert('Hello');
                let urldata = '/api/users/'+id;
                let token = localStorage.getItem("token");
                DELETEDATA(urldata,token).then((res) => {
                    //ModalUpdateElementClose.current.click();
                    Swal.fire({
                        title: 'Success!',
                        text: 'Deleted Successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then((res) => {
                        if (res) {
                            ShowAllUser();
                        }
                    });                    
                });
            }
        })
    }
    const CreateData = () => {
        ModalCreateElement.current.click();
    }
    const UserCreate = (event) => {
        event.preventDefault();
        let token = localStorage.getItem("token");
        const info ={
            name        : event.target.name.value,
            email       : event.target.email.value,
            password    : event.target.password.value,
            roles       : event.target.role.value
        }
        let urldata = '/api/users/';
        POSTDATA(urldata,info,token).then((res) => {
            //ShowAllUser();
            Swal.fire({
                title: 'Success!',
                text: 'User Created Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((res) => {
                if (res) {
                    ShowAllUser();
                    ModalCreateElementClose.current.click();
                }
            }); 
        });
    }
    return (
    <div className="AdminUsers">
        <div id="wrapper">
            <AdminNavbar currentpage={{ name: 'users'}} />          
            <div id="content-wrapper" className="d-flex flex-column">
                <AdminHeader/>                
                <div id="content">
                    <div className="container-fluid">                        
                        <h1 className="h3 mb-4 text-gray-800">Users</h1>
                        <div className="card">
                            <div className="card-header">
                                <button className="btn btn-primary btn-sm float-right" onClick={CreateData}>Create</button>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <td>Name</td>
                                                <td>Email</td>
                                                <td>Role</td>                                                
                                                <td>Created At</td>
                                                <td>Actions</td>
                                            </tr>
                                        </thead>  
                                        <tbody>  
                                        {userdata.map((usr, index) => (                                              
                                            <tr key={index}>
                                                <td>{usr.name}</td> 
                                                <td>{usr.email}</td>  
                                                <td style={{ textTransform:'capitalize' }}>{usr.roles[0].name}</td>                      
                                                <td>{dateformated(usr.created_at)}</td>
                                                <td>
                                                    <button className="btn btn-warning btn-sm" onClick={() => UpdateData(usr.name,usr.email,usr.roles[0].name,usr._id)}><i className="fas fa-edit"></i></button>
                                                    <button className="btn btn-danger btn-sm mx-2" onClick={() => DeleteData(usr._id)}><i className="fas fa-trash-alt"></i></button>
                                                </td>
                                            </tr>                                            
                                        ))}   
                                        </tbody>                               
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AdminFooter/>
            </div>
        </div>        
        <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
        </a>

        <button type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#UserUpdateModal" ref={ModalUpdateElement}></button>

        <div className="modal fade" id="UserUpdateModal" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <form onSubmit={UserUpdate} id="update-user-form">
                    <div className="modal-body">
                        <input type="hidden" ref={UsrID} />
                        <div className="form-group">
                            <label>Name</label>
                            <input ref={UsrName} type="text" className="form-control" name="name" required="required" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input ref={UsrEmail} type="email" className="form-control" name="email" required="required" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <select ref={UsrRole} className="form-select form-control" name="role" style={{ textTransform:'capitalize' }}>
                                {rolesdata.map((option) => {
                                    return (
                                        <option key={option._id} value={option.name}>
                                          {option.name}
                                        </option>
                                      );
                                })};
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal" ref={ModalUpdateElementClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>

        <button type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#UserCreateModal" ref={ModalCreateElement}></button>

        <div className="modal fade" id="UserCreateModal" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create User</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <form onSubmit={UserCreate} id="create-user-form">
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" required="required" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" required="required" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" required="required" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <select className="form-select form-control" name="role" style={{ textTransform:'capitalize' }}>
                                {rolesdata.map((option) => {
                                    return (
                                        <option key={option._id} value={option.name}>
                                          {option.name}
                                        </option>
                                      );
                                })};
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal" ref={ModalCreateElementClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
};

export default AdminUsers;