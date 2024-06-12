import { useEffect, useState } from "react";
import Restaurant from"./Restaurant";
import ApiService from "./ApiService";

const RestaurantList=()=>{
   
    let[restaurants,setRestaurants]=useState([]);
    let apiService=new ApiService();
    useEffect(()=>{
        apiService.findAllRestaurants().then(
       
            response=>{
                console.log(response.data)
                setRestaurants(()=>response.data);
            }
        );
    },[]
    )

        let search="";
        function locationHandler(event){
            console.log(event.target.value)
            search=event.target.value
    
        }
        const getLocation=(event)=>{
            event.preventDefault();
            let isError='';
            if(isError==false)
            console.log("searching......"+search)
            apiService.searchByLocation(search).then(
               (response)=>{
                    console.log(response.data)
                    console.log(search)
                    console.log(response.data.length)
                    setRestaurants(()=>response.data);
                }
            ).catch(error=> {setStatus(prev=>"no restaurants in that locality");
            setRestaurants(()=>[]);}
        );
        }
        
        return <div>
            <h1>Restaurant List</h1>
            
            <input type="text" className="form-control" placeholder="Search" onChange={locationHandler} ></input>
             <button class="btn btn-outline-success" onClick={getLocation}>search</button>
    
             {restaurants.length==0 && <div>
                <br></br>
                No restaurants
                </div>
    }
      
            {
            restaurants.map((restaurantList) => <Restaurant rest={restaurantList}/>)
            }
        </div>
    
    }
    export default RestaurantList;






    