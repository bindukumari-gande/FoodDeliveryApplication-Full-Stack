import { useState,useEffect } from "react";
import{useParams} from "react-router-dom";
import ApiService from "../service/ApiService";
import AllOrder from "./AllOrder";
const OrderList=()=>{
    const{ id }=useParams();
    let[orders,setOrders]=useState([]);
    let api=new ApiService();
    useEffect(()=>{
        console.log("Restaurant Id:"+ id)
        api.findAllOrders(id).then(
            (response)=>{
                console.log(response.data);
                setOrders(()=>response.data)
            }
        );
    },[])
    return <div>
        <h1>Order Details</h1>
        {
          orders.map((orderList)=><AllOrder order={orderList}/> )   
        }
    </div>
}
export default OrderList;