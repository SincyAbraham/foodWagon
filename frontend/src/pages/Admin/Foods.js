import AdminNavbar from "../../components/AdminNavbar";
import AdminHeader from "../../components/AdminHeader";
import AdminFooter from "../../components/AdminFooter";
import { GETDATA,POSTDATA,PUTDATA,DELETEDATA } from '../../API/CommonAPI'
import {useState,useEffect,useRef} from "react"
import Swal from 'sweetalert2'
const AdminFoods = () => {     
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [previewUpdate, setPreviewUpdate] = useState()
    const [fooddata, FoodsetData] = useState([])
    const [categorysdata, CatgeorysetData] = useState([])
    const ModalUpdateElement = useRef()
    const ModalUpdateElementClose = useRef()

    const ModalCreateElement = useRef()
    const ModalCreateElementClose = useRef()

    const FdID = useRef()
    const FdName = useRef()
    const FdPrice = useRef()
    const FdCat = useRef()
    const FdDesc = useRef()
    const FdImg = useRef()
    const ShowAllFood = () => {
        let token = localStorage.getItem("token");
        GETDATA('/api/products',token).then((res) => {
            FoodsetData(res.json.data);
        });
    }
    const ShowAllCategory = () => {
        let token = localStorage.getItem("token");
        GETDATA('/api/categories',token).then((res) => {
            CatgeorysetData(res.json.data);
        });
    }
    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
        setPreviewUpdate(undefined)
    }
    useEffect(() => {
         ShowAllFood();
         ShowAllCategory();    
    },[]);
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    const dateformated = (function(d) {
        d = new Date(d);
        return `${(d.getMonth()+1).toString().replace(/^[0-9]$/g, '0$&')}/${(d.getDate()).toString().replace(/^[0-9]$/g, '0$&')}/${d.getFullYear()}`;
    });   

    const UpdateData = (id,name,price,category,description,image) => {
        const base64String = btoa(String.fromCharCode(...new Uint8Array(image.data.data)));
        const imageurl = `data:image/png;base64,${base64String}`;
        FdID.current.value = id;
        FdName.current.value = name;
        FdPrice.current.value = price;
        FdCat.current.value = category;
        FdDesc.current.value = description;
        setPreviewUpdate(imageurl)
        setPreview(undefined)
        ModalUpdateElement.current.click();
    }  
    const FoodUpdate = (event) => {
        event.preventDefault();
        let token = localStorage.getItem("token");
        const dataform = new FormData();
        if(event.target.image.files[0]){
            dataform.append('img',event.target.image.files[0]);
        }else{
            dataform.append('img','');
        }

        dataform.append('name', event.target.name.value);
        dataform.append('price', event.target.price.value);
        dataform.append('category', event.target.category.value);
        dataform.append('description', event.target.description.value);
        let urldata = '/api/products/'+event.target.id.value;
        PUTDATA(urldata,dataform,token,'formData').then((res) => {
            Swal.fire({
                title: 'Success!',
                text: 'Food Updated Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((res) => {
                if (res) {
                    ShowAllFood();
                    ModalUpdateElementClose.current.click();
                }
            }); 
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
                let urldata = '/api/products/'+id;
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
                            ShowAllFood();
                        }
                    });                    
                });
            }
        })
    }
    const CreateData = () => {
        setPreview(undefined);
        document.getElementById("create-food-form").reset();
        ModalCreateElement.current.click();
    }
    const FoodCreate = (event) => {
        event.preventDefault();
        let token = localStorage.getItem("token");
        const data = new FormData();
        data.append('img',event.target.image.files[0]);
        data.append('name', event.target.name.value);
        data.append('price', event.target.price.value);
        data.append('category', event.target.category.value);
        data.append('description', event.target.description.value);
        let urldata = '/api/products/';
        POSTDATA(urldata,data,token,'formData').then((res) => {
            Swal.fire({
                title: 'Success!',
                text: 'Food Created Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((res) => {
                if (res) {
                    ShowAllFood();
                    ModalCreateElementClose.current.click();
                }
            }); 
        });
    }
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
    <div className="AdminFoods">
        <div id="wrapper">
            <AdminNavbar currentpage={{ name: 'foods'}} />          
            <div id="content-wrapper" className="d-flex flex-column">
                <AdminHeader/>                
                <div id="content">
                    <div className="container-fluid">                        
                        <h1 className="h3 mb-4 text-gray-800">Foods</h1>
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
                                                <td>Price</td>
                                                <td>Category</td>   
                                                <td>Image</td>                                             
                                                <td>Created At</td>
                                                <td>Actions</td>
                                            </tr>
                                        </thead>  
                                        <tbody>  
                                        {fooddata.map((food, index) => (                                              
                                            <tr key={index}>
                                                <td>{food.name}</td>
                                                <td>${food.price}</td>    
                                                <td>{food.category}</td>      
                                                <td><img width="75" src={readImage(food.img)} alt="" /></td>                                                                
                                                <td>{dateformated(food.created_at)}</td>
                                                <td>
                                                    <button className="btn btn-warning btn-sm" onClick={() => UpdateData(food._id,food.name,food.price,food.category,food.description,food.img)}><i className="fas fa-edit"></i></button>
                                                    <button className="btn btn-danger btn-sm mx-2" onClick={() => DeleteData(food._id)}><i className="fas fa-trash-alt"></i></button>
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

        <button type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#FoodUpdateModal" ref={ModalUpdateElement}></button>

        <div className="modal fade" id="FoodUpdateModal" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Food</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <form onSubmit={FoodUpdate} id="update-food-form">
                    <div className="modal-body">
                        <input type="hidden" ref={FdID} name="id" />
                        <div className="form-group">
                            <label>Name</label>
                            <input ref={FdName} type="text" className="form-control" name="name" required="required" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input ref={FdPrice} type="text" className="form-control" name="price" required="required" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <select ref={FdCat} className="form-select form-control" name="category" style={{ textTransform:'capitalize' }}>
                                {categorysdata.map((option) => {
                                    return (
                                        <option key={option._id} value={option.name}>
                                          {option.name}
                                        </option>
                                      );
                                })};
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea ref={FdDesc} className="form-control" name="description"></textarea>
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input type="file" className="form-control" name="image" ref={FdImg} onChange={onSelectFile} />
                            {previewUpdate &&  <img alt="" style={{ width:'180px',marginTop:'10px' }} className="img-fluid" src={previewUpdate} /> }
                            {selectedFile &&  <img alt="" style={{ width:'180px',marginTop:'10px' }} className="img-fluid" src={preview} /> }
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

        <button type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#FoodCreateModal" ref={ModalCreateElement}></button>

        <div className="modal fade" id="FoodCreateModal" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create Food</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <form onSubmit={FoodCreate} id="create-food-form">
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" required="required" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input type="text" className="form-control" name="price" required="required" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label>Catgegory</label>
                            <select className="form-select form-control" name="category" style={{ textTransform:'capitalize' }}>
                                {categorysdata.map((option) => {
                                    return (
                                        <option key={option._id} value={option.name}>
                                          {option.name}
                                        </option>
                                      );
                                })};
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" name="description"></textarea>
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input type="file" className="form-control" name="image" onChange={onSelectFile} />                            
                            {selectedFile &&  <img alt="" style={{ width:'180px',marginTop:'10px' }} className="img-fluid" src={preview} /> }
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

export default AdminFoods;