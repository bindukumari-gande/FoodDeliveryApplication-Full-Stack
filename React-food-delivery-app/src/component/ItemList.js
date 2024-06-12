
import {useState ,useEffect} from "react";
import Item from "./Item";
import { useParams } from "react-router-dom";
import ApiService from "../service/ApiService";
const ItemList=()=>{
    const { id }= useParams();
    let[items,setItems]=useState([]);
    let apiService = new ApiService();

    useEffect(()=>{
        apiService.readAllItems(id).then(
            
            response=>{
                console.log(response.data)
                setItems(()=>response.data);
            }
        );
    },[])
    return <div>
        <h1>Item List</h1>
        {
            items.map((itemList)=><Item item={itemList}/>)
        }
    </div>
}
export default ItemList;