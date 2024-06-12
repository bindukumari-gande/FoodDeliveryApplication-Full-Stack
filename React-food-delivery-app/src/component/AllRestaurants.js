import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import ApiService from "../service/ApiService";

const AllRestaurants=()=>{
    let [restaurants,setRestaurants]=useState([]);

    let apiService = new ApiService();
    useEffect(()=>{
        apiService.getAllRestaurants().then(
            response=>{
                setRestaurants(prevState=>response.data)
            }
        ).catch(error=>console.log(error));
    },[]);

    return <div>
        <h1>RESTAURANT LIST</h1>
        <div id="allRestaurant">
            <table className='table table-striped'>
                
                <tbody>
                    {
                        restaurants.map(r => <tr> 
                        <td><b>{r.restName}</b></td><td><b>{r.restId}</b></td>
                        <td><Link to={`/addItem/${r.restId}`}>Add Item</Link></td>
                        <td><Link to={`/itemList/${r.restId}`}>All Items</Link></td>
                        <td><Link to={`/orders/${r.restId}`}>Orders</Link></td>
                        </tr>)
                    }
                    
                </tbody>
            </table>
        </div>
    </div>
}
export default AllRestaurants;