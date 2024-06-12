import{useState} from "react";
import {Modal,Button} from "react-bootstrap";
import { useParams } from "react-router-dom";
import ApiService from "../service/ApiService";
import './PlaceOrder.css'
const PlaceOrder=()=>{
    const {id}  = useParams();
    let[customerOrder,setCustomerOrder]=useState({});
    let[viewcustorders,setViewCustOrders]=useState([]);
    let apiService=new ApiService();
    let[paymentError,setPaymentError]=useState('');
    let[cost,setCost]=useState('');
    let [status,setStatus]=useState('');
    const[show,setShow]=useState(false);
    const handleClose= ()=>setShow(false);

    function paymentHandler(event){
        console.log(event.target.value);
        customerOrder.payment=event.target.value;
    }
    
    function totalCost(event){
        apiService.totalCost().then(
            response=>{
                console.log(response.data)
                setCost(()=>response.data);
            }
        );
    }
    
    function validate(){
        let isError=false;
        
        if(customerOrder.payment===""||customerOrder.payment===undefined){
            setPaymentError(prev=> <font color="red">"Please Select Payment"</font>) 
            isError=true;
        }       
        return isError;
    }
    function submitHandler(event){     
        event.preventDefault();
        let isError=validate();
        if(isError==false){
            
            apiService.placeOrder(id,customerOrder.payment).then(
                response=>{
                    console.log("form submitted")
                    console.log("Place Order: "+customerOrder)
                    console.log("Order Placed Successfully"+response.data)
                    setStatus(prevStatus=>"Customer Added")
                    setShow(()=>true);
                }
            )
        }
        customerOrder.Submit=event.target.value;       
    }
    

return <div className="po">
    <h1>Place the Order</h1>
    <br></br>
    <form onSubmit={submitHandler} class="row g-3"> 
    <div className="place">
        <table>  
        <button type="button" class="btn btn-success" onClick={totalCost}>Total Cost</button>
        <br></br><br></br>
                    <h2><input type="number" value={cost}></input></h2>
                    <div class="mb-3">
                    <label for="disabledSelect" class="form-label"><b><h4>Payment</h4></b></label>
                  <select id="disabledSelect" class="form-select"  onChange={paymentHandler}>
                  <option>Select</option>
                  <option>COD</option>
                  <option>UPI</option>
                  <option> CARDS</option>
                  
                  </select>
                  <span>{paymentError}</span>
                  </div>
                  
                  <button type="submit" className="btn btn-success">Confirm Order</button>           
                  <Modal show={show} onHide={handleClose}>

<Modal.Header closeButton>
  <Modal.Title>Confirmation</Modal.Title>
</Modal.Header><div className='pop'>
<Modal.Body>Order Placed Successfully!!!</Modal.Body>
</div>
<Modal.Footer>          
  <Button variant="primary" onClick={handleClose} >
   OK
  </Button>
</Modal.Footer>
       </Modal>
      



        </table>
        </div>
    </form>
    </div>
}
export default PlaceOrder;