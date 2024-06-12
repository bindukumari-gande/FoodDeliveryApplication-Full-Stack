import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ApiService from "../service/ApiService";

const CItem=(props)=>{
    let imgPath=`/image/${props.item.itemName}.png`;
    let [orderData,setOrderData]=useState({});
    let apiService = new ApiService();
    const [show, setShow] = useState(false);
    let [status,setStatus]=useState('');
    let[quantity,setQuantity]=useState(0);

    function quantityHandler(event){
        orderData.quantity=event.target.value;
        setQuantity((prev)=>orderData.quantity);
    }
    function submitHandler(){   
        orderData.price=props.item.price;
        orderData.itemId=props.item.itemId;
        orderData.restId=props.item.restId;
        console.log(orderData.quantity);
        console.log(orderData.price);
        console.log(orderData.itemId);
        console.log(orderData.restId);
        console.log("Orders: "+orderData)
        apiService.addToCart(orderData).then(
                response=>{
                    console.log("Orders: "+orderData)
                    console.log("Item added Successfully"+response.data)
                    setStatus(prevStatus=>"Customer Added")
                    setShow(()=>true);
                }
                
        );
    }
    const handleClose = () => {
        setShow(false)
      };
  

    return<div>
        <div class="col-md-4 card">
            <div class="card-header"><h3><b>
            {props.item.itemName}</b></h3>
            </div>
            <div id="design">
           <img id="ige" src={imgPath} width="300px"></img>
           <br></br>
             <h4 class="card-text">Price:{ props.item.price}</h4>
             <h4><lable>Quantity </lable><input type="number" min="1" max="50" defaultValue="1" onChange={quantityHandler}/>
             <br></br>
             <h4 class="card-text">Price:{ props.item.price*quantity}</h4>
             <br></br>
             <button>Add To Cart
             <i type="submit" class="bi bi-cart-plus-fill" onClick={submitHandler}></i></button></h4>
             <Modal show={show} onHide={handleClose}>

<Modal.Header closeButton>
  <Modal.Title>Confirmation</Modal.Title>
</Modal.Header><div className='pop'>
<Modal.Body>Item Added to your Cart Successfully!!!</Modal.Body>
</div>
<Modal.Footer>          
  <Button variant="primary" onClick={handleClose} >
   OK
  </Button>
</Modal.Footer>
       </Modal>
           </div>    
        </div>
        {

        }
    </div>
}
export default CItem;
