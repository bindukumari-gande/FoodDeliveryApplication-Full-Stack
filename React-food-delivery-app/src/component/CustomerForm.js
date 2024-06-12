import axios from 'axios';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';
import './CustomerForm.css';

const CustomerForm = () => {

    let [customer,setCustomer] = useState({});
    let [status,setStatus]=useState('');
    let [custNameError,setCustNameError]=useState('');
    let [genderError,setGenderError]=useState('');
    let [ageError,setAgeError]=useState('');
    let [addressError,setAddressError]=useState('');
    let [emailError,setEmailError]=useState('');
    let [mobNoError,setMobNoError]=useState('');
    let [usernameError,setUsernameError]=useState('');
    let [passwordError,setPasswordError]=useState('');
    let [confirnPasswordError,setConfirmPasswordError]=useState('');
    let [confirmPassword,setConfirmPassword]=useState('');
    const [show, setShow] = useState(false);
    let apiService= new ApiService();
    const navigate = useNavigate();

    function custNameChangeHandler(event){
        customer.custName=event.target.value;
    }

    function genderChangeHandler(event){
        //customer.gender=event.target.value;
        if(event.target.value=="Male")
        { customer.gender = 'M' }
        if(event.target.value=="Female")
        { customer.gender = 'F' }
    }

    function ageChangeHandler(event){
        customer.age=event.target.value;
    }

    function addressChangeHandler(event){
        customer.address=event.target.value;
    }

    function emailChangeHandler(event){
        customer.email=event.target.value;
    }

    function mobNoChangeHandler(event){
        customer.mobNo=event.target.value;
    }

    function usernameChangeHandler(event){
        customer.username=event.target.value;
    }

    function passwordChangeHandler(event){
        customer.password=event.target.value;
    }
    function confirmPasswordChangeHandler(event){
       confirmPassword=event.target.value;
    }

    function validate(){
      let isError=false;
      if(customer.custName==="" || customer.custName===undefined){
        setCustNameError(prev=>"Please provide a valid name")
        isError=true;
      }

      if(customer.gender==="" || customer.gender===undefined){
        setGenderError(prev=>"Please choose the gender")
        isError=true;
      }

      if(customer.age==="" || customer.age===undefined){
        setAgeError(prev=>"Please provide a valid age")
        isError=true;
      }

      if(customer.address==="" || customer.address===undefined){
        setAddressError(prev=>"Please provide a valid address")
        isError=true;
      }

      if(customer.email==="" || customer.email===undefined){
        setEmailError(prev=>"Please provide a valid email")
        isError=true;
      }

      if(customer.mobNo==="" || customer.mobNo===undefined){
        setMobNoError(prev=>"Please provide a valid Mobile Number")
        isError=true;
      }else if(customer.mobNo.length>10){
        setMobNoError(prev=>"Mobile Number exceeds 10 digits")
        isError=true;
      }

      if(customer.username==="" || customer.username===undefined){
        setUsernameError(prev=>"Please provide a valid username")
        isError=true;
      }

      if(customer.password==="" || customer.password===undefined){
        setPasswordError(prev=>"Please provide a valid password")
        isError=true;
      }
      if(confirmPassword!=customer.password){
        setConfirmPasswordError(prev=>"Password Mismatch.Please enter correct password again")
        isError=true;
      }
      return isError;
      
    }

    function submitHandler(event){
      event.preventDefault();
      let isError=validate();
      if(isError==false)
      {
        apiService.addCustomer(customer).then(
          response=>{
            console.log("Success"+response.data);
            setStatus(prevStatus=>"Customer Added")
            setShow(()=>true);
          }
        )
        console.log("form submitted")
        console.log(customer);
      }
      customer.Submit=event.target.value;
      //navigate("/restaurants")
    }
    const handleClose = () => {
      setShow(false)
      navigate("/login")
    };

    return <div className="signup">
        <div className='content'>
        <form onSubmit={submitHandler} class="row g-3">
        
        <img id="i" src="Images/signup.png" height="5%" width="20%"></img>
        <div class="col-md-4">
    <label class="form-label">Name</label>
    <input type="text" class="form-control" value={customer.custName} onChange={custNameChangeHandler}/>
    <span className="invalid-feedback d-block" role="alert">{custNameError}</span>
    </div>
    
    <div class="col-md-4">
    <label class="form-label">Gender</label>
    <select class="form-select" value={customer.gender} onChange={genderChangeHandler}>
      <option selected disabled >Choose...</option>
      <option>Male</option>
      <option>Female</option>
    </select>
    <span className="invalid-feedback d-block" role="alert">{genderError}</span>
  </div>

  <div class="col-md-4">
  <label class="form-label">Age</label>
    <input type="number" min="12" class="form-control" value={customer.age} onChange={ageChangeHandler}/>
    <span className="invalid-feedback d-block" role="alert">{ageError}</span>
  </div>

  <div class="col-md-6">
  <label class="form-label">Address</label>
    <input type="text" class="form-control" value={customer.address} onChange={addressChangeHandler}/>
    <span className="invalid-feedback d-block" role="alert">{addressError}</span>
  </div>

  <div class="col-md-6">
  <label class="form-label">Email</label>
  <div class="input-group has-validation">
    <input type="email" class="form-control" value={customer.email} onChange={emailChangeHandler}/>
    <span className="invalid-feedback d-block" role="alert">{emailError}</span>
  </div>
  </div>

  <div class="col-md-6">
  <label class="form-label">Mobile Number</label>
    <input type="number" pattern="[6-9]{1}[0-9]{9}" class="form-control" value={customer.mobNo} onChange={mobNoChangeHandler}/>
    <span className="invalid-feedback d-block" role="alert">{mobNoError}</span>
  </div>

  <div class="col-md-6">
    <label class="form-label">UserName</label>
    <input type="text" class="form-control" value={customer.username} onChange={usernameChangeHandler}/>
    <span className="invalid-feedback d-block" role="alert">{usernameError}</span>
    </div>

    <div class="col-md-6">
    <label class="form-label">Password</label>
    <input type="password" class="form-control" value={customer.password} onChange={passwordChangeHandler}/>
    <span className="invalid-feedback d-block" role="alert">{passwordError}</span>
    </div>

    <div class="col-md-6">
    <label class="form-label">Confirm Password</label>
    <input type="password" class="form-control"  onChange={confirmPasswordChangeHandler}/>
    <span className="invalid-feedback d-block" role="alert">{passwordError}</span>
    </div>

  <div class="col-md-12">
    <button class="btn btn-success" type="submit">SignUp</button>
    </div>
    <Modal show={show} onHide={handleClose}>

<Modal.Header closeButton>
  <Modal.Title>Confirmation</Modal.Title>
</Modal.Header><div className='pop'>
<Modal.Body>Customer Registered Successfully!!!</Modal.Body>
</div>
<Modal.Footer>          
  <Button variant="primary" onClick={handleClose} >
   OK
  </Button>
</Modal.Footer>
       </Modal>
       
</form></div>
    </div>
    
}

export default CustomerForm;