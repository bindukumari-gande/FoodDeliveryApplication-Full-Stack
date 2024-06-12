import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import ApiService from "../service/ApiService";
import './Admin.css'

const Admin = () => {

    return <div className="adm" >
       <div className="adminn">
       
        <div className="t">
        
            <h1><b><Link to={"/restaurant"}>Add Restaurant</Link>
            <br></br>
            <br></br>
            <Link to={"/allRestaurant"}>Restaurant List</Link></b></h1>
        
        </div>
        <br></br><br></br>
        </div>
    </div>
}
export default Admin;

