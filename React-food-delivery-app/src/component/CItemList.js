import ApiService from "../service/ApiService";
import {useState ,useEffect} from "react";
import CItem from "./CItem";
import { Link, useParams } from "react-router-dom";

const CItemList=()=>{
    const { id }=useParams();
    let[items,setItems]=useState([]);
    let api = new ApiService();
    useEffect(()=>{
        api.viewAllItems(id).then(
            response=>{
                console.log(response.data)
                setItems(()=>response.data);
            }
        );
    },[])
    return <div>
        <h1>Item List</h1>
        <br></br>
        <br></br>
        {
            items.map((itemList)=><CItem item={itemList}/>)
        }
    </div>
}
export default CItemList;