import axios from "axios";

import {useEffect, useState} from "react";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ApiService from "../service/ApiService";
import './AddItemForm.css'
const AddItemForm=()=>{
    let[item,setItem]=useState({});
    let[items,setItems]=useState([]);
    let[itemNameError,setItemNameError]=useState('');
    let[itemPriceError,setItemPriceError]=useState('');
    let[status,setStatus]=useState('');
    let[restIdError,setRestIdError]=useState('');
    let[typeError,setTypeError]=useState('');
    const [show,setShow]=useState(false);
    const handleClose = ()=>setShow(false);
    let apiService = new ApiService();
    const {id} = useParams();

    function itemNameHandler(event){
        console.log(event.target.value);
        item.itemName=event.target.value;
    }
    function typeHandler(event){
        console.log(event.target.value);
        item.type=event.target.value;
    }
    function itemPriceHandler(event){
    console.log(event.target.value);
    item.price=event.target.value;
    }
    function restIdHandler(event){
        console.log(event.target.value);
        item.restId=event.target.value;
    } 
    function imagePathHandler(event){
        console.log(event.target.value);
        item.imagePath=event.target.value;
    }
    function validate(){
        let isError=false;
        if(item.itemName===""|| item.itemName===undefined){
            setItemNameError(prev=>"please enter itemName")
            isError=true;
        }
        if(item.itemPrice===""|| item.itemPrice===undefined){
            setItemPriceError(prev=>"please Enter Price")
           //isError=true;
        }
        if(item.restId===""||item.restId===undefined){
            setRestIdError(prev=>"please Enter RestId")
            //isError=true;
        }
        if(item.type===""||item.type===undefined){
            setTypeError(prev=>"please Enter Type")
            //isError=true;
        }
        return isError;
    }
    function submitHandler(event){
            
            event.preventDefault();
            let isError=validate();
            if(isError==false){
                console.log("form submitted")
                console.log(item)
                apiService.addItemToRest(item,id).then(
                    response=>{
                    console.log("success"+response.data);
                    setStatus(prev=>"Item added")
                    setShow(()=>true);
                    }
                    ).catch(error=>setStatus(prevStatus=>"ItemAdded Already exists"))
                }
    }
    return<div>
        <center><h1>Add Item</h1></center>
        <img id="menu" src="/image/menur.png" width="200px"></img>

        
        <form onSubmit={submitHandler}>
            <div className="addit">
        <table align="center">
       <div class="mb-3">
                       <h5> <label for="exampleFormControlInput1" class="form-label">Item Name</label></h5>
                        <input type="text" onChange={itemNameHandler} class="form-control" id="exampleFormControlInput1" placeholder="Enter Name" >

                        </input>
                        <span>{itemNameError}</span>
                    </div> 

                    <div class="mb-3">
                        <h5><label for="exampleFormControlInput1" class="form-label">Price</label></h5>
                        <input type="number" min="1" class="form-control"   placeholder="Enter Price" onChange={itemPriceHandler} >
                        </input>
                        <span>{itemPriceError}</span>
                    </div>

                    <div class="mb-3">
                  <h5><label for="disabledSelect" class="form-label">Type</label></h5>
                  <select id="disabledSelect" class="form-select" onChange={typeHandler}>
                  <option>Select...</option>
                  <option>Starters</option>
                  <option>MainCourse</option>
                  <option> Beverages</option>
                  <option>Desserts</option>
                  </select>
                  <span>{typeError}</span>
                   </div>  
                   <tr>
                   <button type="submit" className="btn btn-success">Add Item</button>&nbsp;
                    
                   <button type="reset" className="btn btn-success">Reset</button>
                   </tr>
                    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Item Added !!!!</Modal.Body>
        <Modal.Footer>          
          <Button variant="primary" onClick={handleClose}>
           OK
          </Button>
        </Modal.Footer>
      </Modal>
      <br></br>
                    <h5>{status}</h5>
                    </table>
                    </div>
                    </form>

    </div>
}
export default AddItemForm;
