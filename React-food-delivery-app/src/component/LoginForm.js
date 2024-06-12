import { useState } from "react"
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import './LoginForm.css'

const LoginForm = () => {
  
    let[login,setLogin]=useState({});
    let isLoggedIn = sessionStorage.getItem("loggedIn");
    let[usernameError,setUsernameError]=useState('');
    let[passwordError,setPasswordError]=useState('');
    let[roleError,setRoleError]=useState('');
    const navigate = useNavigate();
    let api=new ApiService;

    function usernameChangeHandler(event){
        login.username=event.target.value;
    }
    function passwordChangeHandler(event){
        login.password=event.target.value;
    }
    function roleChangeHandler(event){
        login.role=event.target.value;
    }

    function validate(){
        let isError=false;
        if(login.username==="" || login.username===undefined){
          setUsernameError(prev=>"Please provide a valid username")
          isError=true;
        }
        if(login.password==="" || login.password===undefined){
          setPasswordError(prev=>"Please provide a valid password")
          isError=true;
        }
        if(login.role==="" || login.role===undefined){
          setRoleError(prev=>"Please choose the role")
          isError=true;
        }
        
        return isError;
      }
      function submitHandler(event){
        event.preventDefault();
        console.log(login)

        let isError=validate();
        api.login(login).then ((response )=>{
        
          console.log(response.data);
          sessionStorage.setItem ("token",response.data.token)
          sessionStorage.setItem("role",response.data.role)
          sessionStorage.setItem("loggedIn",true)
          
          if(login.role=="admin")
          { navigate("/admin")}
          if(login.role=="customer")
          { navigate("/restaurants")}
        });
    }
    return <div className="bg">
      
      <img src="Images/logi.jfif" width="700px"></img>
        <form onSubmit={submitHandler} class="row g-3">
        <div className="loginform">
        <div >
        <h1><b>LOGIN FORM</b></h1>
        <br></br>
   <h3><label class="form-label"><b>Username</b></label></h3> 
   
    <input type="text" class="form-control" value={login.username} onChange={usernameChangeHandler}/>
    <span className="invalid-feedback d-block" role="alert">{usernameError}</span>
    </div>

  <h3><label class="form-label"><b>Password</b></label></h3>
    <input type="password" class="form-control" value={login.password} onChange={passwordChangeHandler}/>   
    <span className="invalid-feedback d-block" role="alert">{passwordError}</span>
  
    <h3><label class="form-label"><b>Role</b></label></h3> 
     <select class="form-select" value={login.role} onChange={roleChangeHandler}>
     
      <option selected disabled >Choose...</option>
      <option>customer</option>
      <option>admin</option>
      
    </select>
    <span className="invalid-feedback d-block" role="alert">{roleError}</span>
    <br></br>
    <div class="col-md-12">
    <button class="btn btn-success" type="submit">Submit</button>
    </div>
  </div>
  </form>
    </div>
    
}
export default LoginForm;