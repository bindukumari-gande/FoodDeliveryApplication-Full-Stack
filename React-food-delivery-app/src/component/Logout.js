
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Logout=()=>{
const navigate=useNavigate();
const [show, setShow] = useState(false);
sessionStorage.removeItem("token");
sessionStorage.setItem("loggedIn","false");
const handleClose = () => {
    setShow(false)
    navigate("/login");
  };
 return <div>
 
 <img src="https://i.stack.imgur.com/djlWI.png"></img>
 <Modal show={show} onHide={handleClose}>

<Modal.Header closeButton>
  <Modal.Title>Confirmation</Modal.Title>
</Modal.Header><div className='pop'>
<Modal.Body>Logged out Successfully</Modal.Body>
</div>
<Modal.Footer>          
  <Button variant="primary" onClick={handleClose} >
   OK
  </Button>
</Modal.Footer>
       </Modal>
 </div>
}
export default Logout;



