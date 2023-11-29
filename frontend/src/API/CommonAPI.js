import { POST, PUT, DELETE, GET,GETCOMMON,POSTLOGIN } from "../utils/http";
import {useNavigate} from 'react-router-dom';
const IsLoggedInReturn = () => {
  let getLoggedInDetails = localStorage.getItem("authenticated");
  let getLoggedKey = localStorage.getItem("token");
  let getLoggedType = localStorage.getItem("userType");
  let getName = localStorage.getItem("userName");
  let getUserID = localStorage.getItem("userID");
  let getUserEmail = localStorage.getItem("userEmail");
  return {
  	'status' 	: getLoggedInDetails,
  	'key' 		: getLoggedKey, 
  	'type' 		: getLoggedType, 
  	'name' 		: getName,
  	'user_id'	: getUserID,
  	'email'		: getUserEmail 
  };
}

async function LoginAPI(url,info){
	return await POSTLOGIN(url,info);
}

function IsLoggedIn(){
	const navigate = useNavigate();
	if(IsLoggedInReturn().status === 'true' && IsLoggedInReturn().type === 'admin'){
			window.location.href = '/admin';
	}else if(IsLoggedInReturn().status === 'true' && IsLoggedInReturn().type === 'user'){
			window.location.href = '/';
	}
}

function CheckAdminLogin(){
	const navigate = useNavigate();
	if(IsLoggedInReturn().status !== 'true' && IsLoggedInReturn().type !== 'admin'){
		window.location.href = '/login';
	}
}

function CheckUserLogin(){
	const navigate = useNavigate();
	if(IsLoggedInReturn().status !== 'true' && IsLoggedInReturn().type !== 'user'){
		window.location.href = '/login';
	}
}

async function GETDATA(url,token){
	return await GET(url,token);
}
async function POSTDATA(url, info, token, type){
	return await POST(url, info, token, type);
}
async function PUTDATA(url, info, token, type){
	return await PUT(url, info, token, type);
}
async function DELETEDATA(url, token){
	return await DELETE(url, token);
}

async function GETCOMMONDATA(url){
	return await GETCOMMON(url);
}


export { 
	LoginAPI,
	IsLoggedIn,
	CheckAdminLogin,
	IsLoggedInReturn,
	CheckUserLogin,

	GETDATA,
	POSTDATA,
	PUTDATA,
	DELETEDATA,
	GETCOMMONDATA
};
