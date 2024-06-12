import './Cart.css';
import {useEffect, useState} from"react";
import Item from "./Item";
import CartItems from "./CartItems";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../service/ApiService";
const Cart=()=>{
    const{custId}=useParams();
    let apiService=new ApiService();
    let[cartList,setCartList]=useState([]);
    const navigate = new useNavigate();
    let [restaurantId,setRestaurantId]=useState(0);
useEffect(()=>{
    apiService.listAllCart().then(
    response=>{
    console.log(response.data)
    setCartList(()=>response.data);
    
}
);
    },[])

const goTo=()=>{
    navigate(`/placeOrder/${restaurantId}`);
}
const setRestId=(id)=>{
console.log("rest id : "+id);
setRestaurantId(()=>id);
}

    return<div className='c'>
        <div>
        <h1>CART ITEMS</h1><br></br><br></br>
    {
        cartList.map((cart)=><CartItems cart={cart}  storeRestId={setRestId}/>)
    }
    <br></br>
    <br></br>
    <br></br>
    </div>
    <div className="proceed">
        <a class="btn btn-success" onClick={goTo}>Proceed</a>

    </div>
    </div>
    
}
export default Cart;