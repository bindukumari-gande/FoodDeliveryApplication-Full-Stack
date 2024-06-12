import axios from "axios";

class ApiService{
    BASE_CUST_URL="http://localhost:9999/customer";
    BASE_REST_URL="http://localhost:9999/restaurant";

    addCustomer(customer){
        return axios.post(`${this.BASE_CUST_URL}/customersignup`,customer)
    }
    viewAllRestaurants(){
        return axios.get(`${this.BASE_CUST_URL}/restaurants`)
    }
    searchByLocation(location){
        return axios.get(`${this.BASE_CUST_URL}/${location}`,this.getToken());
    }
    viewAllItems(restId){
        return axios.get(`${this.BASE_CUST_URL}/${restId}/List`)
    }
    addToCart(data){
        let token="Bearer "+sessionStorage.getItem("token");
        const config={
            headers:{
                "Authorization":token
            }
        }
        return axios.post(`${this.BASE_CUST_URL}/item`,data,config)
    }
    listAllCart(){
        let token="Bearer "+sessionStorage.getItem("token");
        const config={
            headers:{
                "Authorization":token
            }
        }
        return axios.get(`${this.BASE_CUST_URL}/orderitems`,config)
    }
    totalCost(){
        let token="Bearer "+sessionStorage.getItem("token");
        const config={
            headers:{
                "Authorization":token
            }
        }
        return axios.get(`${this.BASE_CUST_URL}/order/totalCost`,config)
    }
    placeOrder(restId,pay){
        
        return axios.post(`${this.BASE_CUST_URL}/placeorder/${restId}/${pay}`,'',this.getToken())
    }
    updateItemInCart(data,id){
        let token="Bearer "+sessionStorage.getItem("token");
        const config={
            headers:{
                "Authorization":token
            }
        }
        return axios.put(`${this.BASE_CUST_URL}/update/${id}`,data);
    }
    deleteItemInCart(iid){
        return axios.delete(`${this.BASE_CUST_URL}/delete/${iid}`)
    }




    addNewRestaurants(restaurant){
        let token="Bearer "+sessionStorage.getItem("token");
        const config={
            headers:{
                "Authorization":token
            }
        }
        return axios.post(this.BASE_REST_URL,restaurant,config)
    }
    getAllRestaurants(){
        let token="Bearer "+sessionStorage.getItem("token");
        const config={
            headers:{
                "Authorization":token
            }
        }
        return axios.get(this.BASE_REST_URL,config)
    }
    readAllItems(restId){
        return axios.get(`${this.BASE_REST_URL}/${restId}`)
    }
    addItemToRest(item,restId){
        return axios.post(`${this.BASE_REST_URL}/${restId}/Item`,item)
    }
    updateItem(item,itemId){
        return axios.put(`${this.BASE_REST_URL}/${itemId}/Item`,item)
    }
    readItemById(itemId){
        return axios.get(`${this.BASE_REST_URL}/view/${itemId}`);
    }
    deleteItem(itemId){
        return axios.delete(`${this.BASE_REST_URL}/${itemId}/delete`)
    }
    findAllOrders(restId){
        return axios.get(`${this.BASE_REST_URL}/orders/${restId}`,this.getToken());
    }
    updateStatus(restId,orderId){
        return axios.put(`${this.BASE_REST_URL}/${restId}/${orderId}/statusUpdate`,'',this.getToken());
    }

   



    login(login)
    {
        return axios.post("http://localhost:9999/login",login);
    }
    getToken(){
        let token="Bearer "+sessionStorage.getItem("token");
        const config={
            headers:{
                "Authorization":token
            }
        }
        return config;
    }

}

export default ApiService; 