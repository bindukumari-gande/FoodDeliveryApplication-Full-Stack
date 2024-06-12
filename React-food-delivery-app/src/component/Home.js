import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import LoginForm from './LoginForm';
import './Home.css'
import Welcome from './Welcome';
import Admin from './Admin';
import RestaurantForm from './RestaurantForm';
import AllRestaurants from './AllRestaurants';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import UpdateItemForm from './UpdateItemForm';
import CRestaurantList from './CRestaurantList';
import CItemList from './CItemList';
import Cart from './Cart';
import PlaceOrder from './PlaceOrder';
import Logout from './Logout';
import OrderList from './OrderList';
const Home=()=>{
  var isLoggedIn=sessionStorage.getItem("loggedIn");
  console.log("logged in ? " +isLoggedIn)
  let isRole = sessionStorage.getItem("role");
  console.log("role ? "+isRole)

    return <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-#FC8D30">
  <div class="container-fluid">
  
    <a class="navbar-brand" href="#"><b>Food Delivery App</b></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
        <i class="bi bi-house-fill"></i>
          <a class="nav-link active" aria-current="page" href="/"><b>Home</b></a>
        </li>
        
      </ul>
      <ul className="loginMenus navbar-nav navbar-text">
      
      </ul>
      
      </div>
    </div>
    
    <form class="form-inline">
    <ul className="navbar-nav navbar-text">
   
        <li className="nav-item ">
        <i class="bi bi-person-fill-add"></i>
          <a class="nav-link" href="customers"><b>Signup</b></a>
          </li>
          
        <li className="nav-item">
        <i class="bi bi-person-fill-up"></i>
          <a class="nav-link" href="login"><b>Login</b></a>
        </li>
       
        <li className="nav-item">
        <i class="bi bi-box-arrow-right"></i>
          <a class="nav-link" href="logout"><b>Logout</b></a>
        </li>
       
  </ul>
  </form>
    </nav>
   
    <BrowserRouter>
    <Routes>
            <Route path="/" element={<Welcome/>}></Route>  
            <Route path="/customers" element={<CustomerForm/>}></Route>
            <Route path="/login" element={<LoginForm/>}></Route>
            <Route path="/admin" element={<Admin/>}></Route>
            <Route path="/restaurant" element={<RestaurantForm/>}></Route>
            <Route path="/allRestaurant" element={<AllRestaurants/>}></Route>
            <Route path="/itemList/:id" element={<ItemList/>}></Route>
            <Route path="/addItem/:id" element={<AddItemForm/>}></Route>
            <Route path="/updateItem/:id" element={<UpdateItemForm/>}></Route>
            <Route path="/cItemList/:id" element={<CItemList/>}></Route>
            <Route path="/restaurants" element={<CRestaurantList/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/placeOrder/:id" element={<PlaceOrder/>}></Route>
            <Route path="/orders/:id" element={<OrderList/>}></Route>
            <Route path="/logout" element={<Logout/>}></Route>
     </Routes>
    </BrowserRouter>
    </div>
}
export default Home;
        