import axios from "axios";
import { useEffect, useState } from "react";
import './RestaurantForm.css';
import { Modal, Button } from "react-bootstrap";
const RestaurantForm=()=>{
    let [restaurant,setRestaurant]=useState({});
    let [restaurants,setRestaurants]=useState([]);
    let [restIdError,setrestIdError]=useState('');
    let [restNameError,setrestNameError]=useState('');
    let [mobNoError,setmobNoError]=useState('');
    let [emailError,setemailError]=useState('');
    let [startTimeError,setstartTimeError]=useState('');
    let [endTimeError,setendTimeError]=useState('');
    let [locationError,setlocationError]=useState('');
    let [ratingsError,setratingsError]=useState('');
    let [status,setStatus]=useState('');
    const [show,setShow]=useState(false);
    const handleClose = ()=>setShow(false);

    

    function restIdHandler(event){
        console.log(event.target.value);
        restaurant.restId=event.target.value;
    }
    function restNameHandler(event){
        console.log(event.target.value);
        restaurant.restName=event.target.value;
    }
    function mobNoHandler(event){
        console.log(event.target.value);
        restaurant.mobNo=event.target.value;
    }
    function emailHandler(event){
        console.log(event.target.value);
        restaurant.email=event.target.value;
    }
    function startTimeHandler(event){
        console.log(event.target.value);
        restaurant.startTime=event.target.value;

    }
    function endTimeHandler(event){
        console.log(event.target.value);
        restaurant.endTime=event.target.value;
    }
    function locationHandler(event){
        console.log(event.target.value);
        restaurant.location=event.target.value;
    }
    function ratingsHandler(event){
        console.log(event.target.value);
        restaurant.ratings=event.target.value;
    }
    function validate(){
        let isError=false;
        if(restaurant.restId==""|| restaurant.restId==undefined){
            setrestIdError(prev=>"please enter restId")
            isError=true;
        }
        if(restaurant.restName==""|| restaurant.restName==undefined){
            setrestNameError(prev=>"please enter restName")
            isError=true;
        }
        if(restaurant.mobNo==""|| restaurant.mobNo==undefined){
            setmobNoError(prev=>"please enter mobileNo")
            isError=true;
        }
        else if(restaurant.mobNo.length>10){
            setmobNoError(prev=>"mobile number exceeds 10 digits")
            isError=true;
        }
        if(restaurant.startTime==""|| restaurant.startTime==undefined){
            setstartTimeError(prev=>"please enter start time")
            isError=true;
        }
        if(restaurant.endTime==""|| restaurant.endTime==undefined){
            setendTimeError(prev=>"please enter end time")
            isError=true;
        }
        if(restaurant.location==""|| restaurant.location==undefined){
            setlocationError(prev=>"please enter location")
            isError=true;
        }
        if(restaurant.ratings==""|| restaurant.ratings==undefined){
            setratingsError(prev=>"please enter ratings")
            isError=true;
        }
        return isError;
    }
    function submitHandler(event){
        event.preventDefault();
        let isError=validate();
        if(isError==false){
            console.log("form submitted")
            console.log(restaurant);
            axios.post("http://localhost:9999/restaurant",restaurant).then(
                response=>{
                    console.log("Success"+response.data)
                    setStatus(prevStatus=>"Restaurant added")
                    setShow(() => true);                   
                }
            ).catch(error=>setStatus(prevStatus=>("Restaurant already exist")))
        }
    }
    return<div className="rest">
        <h2><b>ADD RESTAURANT</b></h2>
        <form onSubmit={submitHandler}>
            
            <div className="resform">
                    <div class="col-md-12">
       <h5><label for="exampleFormControlInput1" class="form-label"><b>Restaurant ID</b></label></h5>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter RestId" onChange={restIdHandler}>
                        </input>
                        <span>{restIdError}</span>
                    </div>
                    <div class="col-md-12">
                       <h5> <label for="exampleFormControlInput1" class="form-label"><b>Restaurant Name</b></label></h5>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter RestName" onChange={restNameHandler}>
                            
                        </input>
                        <span>{restNameError}</span>
                    </div>
                    <div class="col-md-12">
                        <h5><label for="exampleFormControlInput1" class="form-label"><b>Mobile Number</b></label></h5>
                        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Enter MoblieNo" onChange={mobNoHandler}>
                            
                        </input>
                        <span>{mobNoError}</span>
                    </div>
                    <div class="col-md-12">
                        <h5><label for="exampleFormControlInput1" class="form-label"><b>Email</b></label></h5>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Email" onChange={emailHandler}>
                            
                        </input>
                        <span>{emailError}</span>

                    </div>
                    <div class="col-md-12">
                        <h5><label for="exampleFormControlInput1" class="form-label"><b>Opening Time</b></label></h5>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter StartTime" onChange={startTimeHandler}>
                            
                        </input>
                        <span>{startTimeError}</span>
                    </div>
                    <div class="col-md-12">
                        <h5><label for="exampleFormControlInput1" class="form-label"><b>Closing Time</b></label></h5>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter EndTime" onChange={endTimeHandler}>
                            
                        </input>
                        <span>{endTimeError}</span>
                    </div>
                    <div class="col-md-12">
                        <h5><label for="exampleFormControlInput1" class="form-label"><b>Location</b></label></h5>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Location" onChange={locationHandler}>
                            
                        </input>
                        <span>{locationError}</span>
                    </div>
                    <div class="col-md-12">
                        <h5><label for="exampleFormControlInput1" class="form-label"><b>Rating</b></label></h5>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Rating" onChange={ratingsHandler}>
                            
                        </input>
                        <span>{ratingsError}</span>
                    </div>
                    <br></br>
                    
                        <h5><button type="submit" className="btn btn-success">Add Restaurant</button></h5> &nbsp;
                        
                    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header><div className='pop'>
        <Modal.Body>Restaurant Added Successfully!!!!</Modal.Body>
        </div>
        <Modal.Footer>          
          <Button variant="primary" onClick={handleClose}>
           OK
          </Button>
        </Modal.Footer>
      </Modal>
        
            </div>
        </form>
            
    </div>
}
export default RestaurantForm;