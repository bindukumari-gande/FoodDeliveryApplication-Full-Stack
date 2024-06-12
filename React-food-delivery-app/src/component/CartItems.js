import {useState} from "react";
import { useParams } from "react-router-dom";
import ApiService from "../service/ApiService";
import Item from"./Item";
import PlaceOrder from "./PlaceOrder";
const CartItems=(props)=>{
    const { id } = useParams();
    const api = new ApiService();
    let[cart,setCart]=useState([]);
    
    props.storeRestId(props.cart.restId);
    let imgPath=`/image/${props.cart.item.itemName}.png`;
    console.log("cart :",props.cart)
    const delItem=()=>{
      let delConfirm = window.confirm("Do you want to remove :"+props.cart.item.itemName);
      if(delConfirm==true){
          api.deleteItemInCart(props.cart.id).then(
              res=>{
                  console.log("Deleted");
                  window.location.reload();
              }
          );
      }
  }
    const quantityChangeHandler=(event)=>{
    props.cart.quantity=event.target.value;
    setCart((prevState)=>{return {...prevState,cart}})
  }
  function priceChangeHandler(event){
    props.cart.price=event.target.value;
    setCart((prevState)=>{return {...prevState,cart}})
}
    const update=()=>{
      console.log(props.cart.id);
      cart.itemId=props.cart.itemId;
      api.updateItemInCart(props.cart,props.cart.id).then(
        response=>{
            console.log("Updated Successfully"+response.data);
          }
    )}
    return <div>
            
    <div class="col-md-4 card">
          <div class="card-header"><h3><b>{props.cart.item.itemName}
            </b></h3>
            </div>
            <div id="design">
           <img id="ige" src={imgPath} width="300px"></img>
           
             <h4 class="card-text" onChange={priceChangeHandler}>Price:{props.cart.price}</h4>
             <h4><lable>Quantity </lable><input type="number" value={props.cart.quantity}/>
             </h4>
             <a className="bi1 bi-trash-fill" onClick={delItem}></a>
           </div>
           {props.cart.restId}
    </div>
     
   
    </div>

}
export default CartItems;