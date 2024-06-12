import axios from "axios";
import {useEffect, useState} from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ApiService from "../service/ApiService";
import './UpdateItemForm.css';
const UpdateItemForm=()=>{
    const { id } = useParams();
    let [item,setItem]=useState({});
    let [status,setStatus]=useState('');
    const [show,setShow]=useState(false);
    let apiService=new ApiService();
    const navigate = useNavigate();

    useEffect(()=>{
        console.log("ItemId is "+id)
        apiService.readItemById(id).then((response)=>{
            setItem(prev=>response.data)
        })
    },[]);

function itemNameChangeHandler(event){
    console.log(event.target.value);
    item.itemName=event.target.value;
    setItem((prevState)=>{return {...prevState,item}})
}
function itemTypeChangeHandler(event){
    console.log(event.target.value);
    item.type=event.target.value;
    setItem((prevState)=>{return {...prevState,item}})
}
function itemPriceChangeHandler(event){
    console.log(event.target.value);
    item.price=event.target.value;
    setItem((prevState)=>{return {...prevState,item}})
}
function submitHandler(event){
    alert("Update Item")
    event.preventDefault();
    console.log("form Updated")
        console.log(item)
        apiService.updateItem(item,id).then(
            response=>{
                console.log("success"+response.data);
                setStatus(prev=>"Item Updated")
                setShow(()=>true);
                 }
        )}
        const goBack=()=>{
            navigate("/allRestaurant")
        }

return <div>
    <h1>Update Items</h1>
    <form onSubmit={submitHandler}>
        <div className="upd">
        <table align="center">
        <div class="mb-3">
       <h5> <label for="exampleFormControlInput1" class="form-label">Item ID</label></h5>
    <input type="text"  class="form-control" id="exampleFormControlInput1" value={item.itemId} readOnly>
</input>
</div>      
        <div class="mb-3">
       <h5> <label for="exampleFormControlInput1" class="form-label">Item Name</label></h5>
    <input type="text"  class="form-control" id="exampleFormControlInput1" value={item.itemName} 
    onChange={itemNameChangeHandler}>
</input>
</div>

<div class="mb-3">
        <h5><label for="exampleFormControlInput1" class="form-label">Item Type</label></h5>
        <input type="text" className="form-control" value={item.type}/>
                  
                 </div>
            
                  <div class="mb-3">
                        <h5><label for="exampleFormControlInput1" class="form-label">Price</label></h5>
                        <input type="number" min="1"  class="form-control" id="exampleFormControlInput1" value={item.price} 
                        onChange={itemPriceChangeHandler}>

                        </input>
                        </div>
<button type="submit" className="btn btn-success"> Update </button>&nbsp;
<button type="button" className="btn btn-success" onClick={goBack}> Cancel </button>
                    
        </table>
        </div>
    </form>
</div>
}
export default UpdateItemForm;