<template>
  <div class="cart-container" style="background-color: #41b3a3 ;height: 100vh;">
    <h1>Shopping Cart for: {{ $route.params.userId }}</h1>
    <table  border="3px" style="border-color: red ;background-color: beige; ">
      <thead>
        <tr >
          <th >Product Name</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td>{{ item.productname.toUpperCase() }}</td>
          
          <td>
            <input type="number" v-model="item.quantity" min="1"/>
            <button @click="edit(item.user_id, item.product_id, item.quantity)" style="margin-left: 5px;">Edit</button>
          </td>
          <td>
            <button @click="remove(item.user_id, item.product_id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="placeorder(this.user_id, this.description )">Place Order</button>
    <br>
    <router-link to="/userhome">
    <button> Products Page</button>
    </router-link>
  </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
export default {
  name: 'CartPage',
  data() {
    return {
      cart: [],
      user_id: localStorage.getItem('user_id'),
      product_id: null,
      quantity: 1,
      description: ''
    };
  },
  mounted() {
    this.fetchcart();
  },
  methods: {
    fetchcart() {
      const jwtToken = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
          };
      axios.get('http://localhost:5000/user/get-cart-items/' + this.$route.params.userId, {headers})
        .then(response => {
         
          this.cart = response.data;
          console.log(this.cart);
          this.loading = false; 
        })
        .catch(error => {
          console.error('Error fetching cart:', error);
          this.loading = false;
        });
    },
    remove(user_id,product_id){
      const jwtToken = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
          };
      axios.post('http://localhost:5000/user/delete-from-cart/' + this.$route.params.userId + '/' + product_id, null, {headers})
        .then(response => {
         this.$router.go()
        })
        .catch(error => {
          console.error('Error fetching cart:', error);
          this.loading = false;
        });

    },
    edit(user_id,product_id, quantity){
      const jwtToken = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
          };
      axios.put('http://localhost:5000/user/update-cart-item/' + this.$route.params.userId + '/' + product_id,  { quantity }, { headers })
        .then(response => {
         this.$router.go()
        })
        .catch(error => {
          console.error('Error fetching cart:', error);
          this.loading = false;
        });

    },
    placeorder(user_id, description) {
      description = ''
  const jwtToken = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json',
  };

  axios.post(`http://localhost:5000/user/place-order/` +  this.$route.params.userId, description, { headers })
  
    .then(response => {
      this.$router.go();
    })
    .catch(error => {
      console.error('Error placing order:', error.response); 
      this.loading = false;
    });
},
  },
}
</script>

<style scoped>
.cart-container {
  max-width: 2000px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

button {
  background-color: #009688;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
