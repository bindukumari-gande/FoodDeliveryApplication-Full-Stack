import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";

const ViewOrders=()=>{
    let [orders,setOrders]=useState([]);
    let apiService = new ApiService();
    useEffect(()=>{
        apiService.findAllOrders().then(

        )
    })
    return <div>
        <img src="public/Images/cheese.jpg" width="300px"></img>
        <h2>ORDERS LIST</h2>
        
    </div>
}
export default ViewOrders;