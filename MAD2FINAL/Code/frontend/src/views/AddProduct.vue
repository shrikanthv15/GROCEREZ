<template>
  <div style="background-color: #41b3a3; min-height: 100vh; align-items: center; ">
  <div class="container" style="align-items: center;">
    <center>
      <h4>ADD PRODUCT</h4>
    <form @submit.prevent="login" class="form" style="width: 800px; height: 1000px; align-items: center;">
    <div class="title" >Category Name:</div>
    <div class="inputBox">
        <label for="category">Category:</label>
        <select v-model="productData.category_id" id="category" required style="background-color: peachpuff;">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id" style="background-color: peachpuff;">{{ cat.name }}</option>
        </select>
      </div>
      <div class="inputBox">
        <label for="productName">Product Name:</label>
        <input type="text" v-model="productData.name" id="productName" required>
      </div>

      <div class="inputBox">
        <label for="manufacturer">Manufacturer:</label>
        <input type="text" v-model="productData.manufacturer" id="manufacturer">
      </div>
      <div class="inputBox">
        <label for="expiry">Expiry Date:</label>
        <input type="date" v-model="productData.expiry" id="expiry">
      </div>

      <div class="inputBox">
        <label for="ratePerUnit">Rate Per Unit:</label>
        <input type="number" v-model="productData.rate_per_unit" id="ratePerUnit" required>
      </div>

      <div class="inputBox">
        <label for="availableQuantity">Available Quantity:</label>
        <input type="number" v-model="productData.available_quantity" id="availableQuantity">
      </div>

      <div class="inputBox">
        <label for="units">Units:</label>
        <input type="text" v-model="productData.units" id="units">
      </div>

    
<input class="button-confirm" type="submit" value="Add" @click="submitProduct()">
</form>
    </center>
  </div>
</div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AddProduct',
    data() {
      return {
        productData: {
          category_id: '',
          name: '',
          manufacturer: '',
          expiry: '',
          rate_per_unit: null,
          available_quantity: null,
          units: '',
        },
        categories: [], // Store the list of categories
      };
    },
    mounted() {
      // Fetch the list of categories when the component is mounted
      this.fetchCategories();
    },
    methods: {
      fetchCategories() {
        const jwtToken = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
          };
        axios.get('http://127.0.0.1:5000/admin/get-categories', {headers})
          .then(response => {
            // Assuming the JSON response contains an array of products
            this.categories = response.data;
            console.log(this.category.id)
            console.log("success")
            this.loading = false; 
            
          })
          .catch(error => {
            console.error('Error fetching category:', error);
            this.loading = false;
          });
      },
      submitProduct() {
        // Validate the form fields before sending the request
        if (!this.productData.name || !this.productData.rate_per_unit) {
          alert('Please fill in all required fields.');
          return;
        }
        const jwtToken = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
          };
        // Send a POST request to your backend API
        axios.post('http://localhost:5000/admin/add-product', this.productData, {headers})
          .then(response => {
            // Assuming the backend returns the added product data
            console.log('Product added successfully:', response.data);
  
            // Redirect to the ProductsPage after successful submission
            this.$router.push('/products');
          })
          .catch(error => {
            console.error('Error adding product:', error);
          });
      },
    },
  };
  </script>
  
  <style>



</style>