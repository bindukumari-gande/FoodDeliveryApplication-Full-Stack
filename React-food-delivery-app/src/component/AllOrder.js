import{useState} from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import ApiService from "../service/ApiService";

const AllOrder=(props)=>{
    const{ id }=useParams();
    const{orderId}=useParams();
    let[order,setOrder]=useState('');
    let[status,setStatus]=useState('');
    let apiService=new ApiService();
    const [show,setShow]=useState(false);
    const handleClose = ()=>setShow(false);
     function StatusHandler(event)
     {
     console.log(event.target.value)
     }
     const updateStatus=(event)=>{
        event.preventDefault();
        let isError='';
        if(isError==false){
        console.log("updating............")
        apiService.updateStatus(id,props.order.orderId).then(
            response=>{
                console.log(response.data)
                setStatus(()=>response.data);
                setShow(()=>true);
            }
        ).catch(error=>{setStatus(prev=>" ")
        setStatus(()=>[]);}
        )}
        
     }
return <div>

        <div class="col-md-4 card">
    <div class="card-header">Restaurant ID:{id}</div>
    <div class="card-body"><b>
    ORDER ID: {props.order.orderId}<br/>
    ORDER DATE: {props.order.orderDate}<br/>
    ORDER TIME: {props.order.orderTime}<br/>
    Payment Mode: {props.order.payment}<br/>
    Total cost: {props.order.totalCost}</b><br></br>
        <a class="btn btn-warning" onClick={updateStatus} >Update Status</a>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pop">Status updated Successfully!!!! <br></br>
        </Modal.Body>
        <Modal.Footer>          
          <Button variant="primary" onClick={handleClose}>
           OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    </div>

}
export default AllOrder;