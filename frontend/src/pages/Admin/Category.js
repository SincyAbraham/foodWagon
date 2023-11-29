import AdminNavbar from "../../components/AdminNavbar";
import AdminHeader from "../../components/AdminHeader";
import AdminFooter from "../../components/AdminFooter";
import { GETDATA,POSTDATA,PUTDATA,DELETEDATA } from '../../API/CommonAPI'
import {useState,useEffect,useRef} from "react"
import Swal from 'sweetalert2'
const AdminCategory = () => {     
    const [categorydata, CategorysetData] = useState([])
    const ModalUpdateElement = useRef()
    const ModalUpdateElementClose = useRef()

    const ModalCreateElement = useRef()
    const ModalCreateElementClose = useRef()

    const CatID = useRef()
    const CatName = useRef()
    const ShowAllCategory = () => {
        let token = localStorage.getItem("token");
        GETDATA('/api/categories',token).then((res) => {
            CategorysetData(res.json.data);
        });
    }
    useEffect(() => {
         ShowAllCategory();       
    },[]);
    const dateformated = (function(d) {
        d = new Date(d);
        return `${(d.getMonth()+1).toString().replace(/^[0-9]$/g, '0$&')}/${(d.getDate()).toString().replace(/^[0-9]$/g, '0$&')}/${d.getFullYear()}`;
    });   

    const UpdateData = (name,id) => {
        CatID.current.value = id;
        CatName.current.value = name;
        ModalUpdateElement.current.click();
    }  
    const CategoryUpdate = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        const info ={
            categoryname:CatName.current.value
        }
        let urldata = '/api/categories/'+CatID.current.value;
        PUTDATA(urldata,info,token).then((res) => {
            console.log(res);
            ModalUpdateElementClose.current.click();
            ShowAllCategory();
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
                let urldata = '/api/categories/'+id;
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
                            ShowAllCategory();
                        }
                    });                    
                });
            }
        })
    }
    const CreateData = () => {
        ModalCreateElement.current.click();
    }
    const CategoryCreate = (event) => {
        event.preventDefault();
        let token = localStorage.getItem("token");
        const info ={
            name:event.target.catname.value
        }
        let urldata = '/api/categories/';
        POSTDATA(urldata,info,token).then((res) => {
            //ShowAllCategory();
            Swal.fire({
                title: 'Success!',
                text: 'Category Created Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((res) => {
                if (res) {
                    ShowAllCategory();
                    ModalCreateElementClose.current.click();
                }
            }); 
        });
    }
    return (
    <div className="AdminCategory">
        <div id="wrapper">
            <AdminNavbar currentpage={{ name: 'categories'}} />          
            <div id="content-wrapper" className="d-flex flex-column">
                <AdminHeader/>                
                <div id="content">
                    <div className="container-fluid">                        
                        <h1 className="h3 mb-4 text-gray-800">Catgeory</h1>
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
                                                <td>Created At</td>
                                                <td>Actions</td>
                                            </tr>
                                        </thead>  
                                        <tbody>  
                                        {categorydata.map((cat, index) => (                                              
                                            <tr key={index}>
                                                <td>{cat.name}</td>                       
                                                <td>{dateformated(cat.createdAt)}</td>
                                                <td>
                                                    <button className="btn btn-warning btn-sm" onClick={() => UpdateData(cat.name,cat._id)}><i className="fas fa-edit"></i></button>
                                                    <button className="btn btn-danger btn-sm mx-2" onClick={() => DeleteData(cat._id)}><i className="fas fa-trash-alt"></i></button>
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

        <button type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#CategoryUpdateModal" ref={ModalUpdateElement}></button>

        <div className="modal fade" id="CategoryUpdateModal" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Category</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <form onSubmit={CategoryUpdate}>
                    <div className="modal-body">
                        <input type="hidden" ref={CatID} />
                        <div className="form-group">
                            <label>Category Name</label>
                            <input type="text" className="form-control" ref={CatName} required="required" autoComplete="off" />
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

        <button type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#CategoryCreateModal" ref={ModalCreateElement}></button>

        <div className="modal fade" id="CategoryCreateModal" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create Category</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <form onSubmit={CategoryCreate} id="create-category-form">
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Category Name</label>
                            <input type="text" className="form-control" name="catname" required="required" autoComplete="off" />
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

export default AdminCategory;