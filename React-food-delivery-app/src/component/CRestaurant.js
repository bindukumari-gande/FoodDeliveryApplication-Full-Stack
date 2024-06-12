
import {Link} from 'react-router-dom';

import { useState } from 'react';
const CRestaurant=(props)=>{
  
    let imgPath=`/image/${props.rest.restName}.png`;
    //let apiService= new ApiService();
    //let[status,setStatus]=useState('');

return <div>     

<div class="col-md-4 card">
<div class="card-header"><h3><b>
    {props.rest.restName}</b></h3>
       
        </div>

  <div class="card-body">
   
  <img src={imgPath} width="50px"></img>
  <br></br>
    <h4 class="card-text"> Ratings:<font color="red">{props.rest.ratings}</font></h4>
    <Link to={`/cItemList/${props.rest.restId}`}>
        <button>Item List</button>
        </Link>
    </div>
    </div>
  </div>
   
}
export default CRestaurant;