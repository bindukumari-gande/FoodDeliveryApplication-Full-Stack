import { Link } from 'react-router-dom';
import ApiService from '../service/ApiService';
import './Item.css';

const Item=(props)=>{
    
    let imgPath=`/image/${props.item.itemName}.png`;

    let apiService = new ApiService();
    const delItem=()=>{
        let delConfirm = window.confirm("Do you want to remove :"+props.item.itemName);
        if(delConfirm==true){
            alert("Deleting"+props.item.itemName)
            apiService.deleteItem(props.item.itemId).then(
                res=>{
                    console.log("Deleted");
                    window.location.reload();
                }
            );
        }
    }
    
    return<div>
        <div class="col-md-3 card">
            <div class="card-header"><h2><b>
            {props.item.itemName}</b></h2>
            </div>
            <div id="design">
                
           <img id="ige" src={imgPath} alt="not found" width="100px"></img>
           <h4>Item ID:{props.item.itemId}</h4>
            <h4><p class="card-text">Price:{ props.item.price}</p></h4>
            <h4>Type: {props.item.type}</h4>
            <Link to={`/updateItem/${props.item.itemId}`}>
                <li class="bi bi-pencil-square"></li>
            </Link>
            <a className="bi1 bi-trash-fill" onClick={delItem}></a>
           </div>
           
        </div>
        
    </div>
}
export default Item;
