import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import CRestaurant from"./CRestaurant";

const CRestaurantList=()=>{
   
    let[restaurants,setRestaurants]=useState([]);
    let[status,setStatus]=useState('');
    let apiService=new ApiService();
    useEffect(()=>{
        apiService.viewAllRestaurants().then(
            response=>{
                console.log(response.data)
                setRestaurants(()=>response.data);}
        );
    },[]
    )
    let search="";
    function locationHandler(event){
        console.log(event.target.value)
        restaurants.search=event.target.value

    }
    const getLocation=(event)=>{
        event.preventDefault();
        let isError='';
        if(isError==false)
        console.log("searching......"+restaurants.search)
        apiService.searchByLocation(restaurants.search).then(
           (response)=>{
                console.log(response.data)
                console.log(restaurants.search)
                console.log(response.data.length)
                setRestaurants(()=>response.data);
            }
        ).catch(error=> {setStatus(prev=>"no restaurants in that locality");
        setRestaurants(()=>[]);}
    );
    }
    
    return <div>
        <h1>Restaurant List</h1>
        <li className="nav-item">
        <i class="bi bi-cart4"></i>
          <a class="nav-link" href="cart"><b>Cart</b></a>
        </li>
        <div class="mb-3">
          
      <label for="exampleFormControlInput1" class="form-label">Search By Location</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Search" onChange={locationHandler}></input>
    <button class="btn btn-outline-success" onClick={getLocation}>Search</button>                
    </div>
    {
        restaurants.map((restaurantList) => <CRestaurant rest={restaurantList}/>)
    }
    </div>
}

export default CRestaurantList;