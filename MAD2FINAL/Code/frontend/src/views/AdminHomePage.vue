<template>
  <div style="background-color: #41b3a3; min-height: 100vh;">
    <div v-for="cat in category" :key="cat.name">
      <br>
      <div style="display: flex;">
      <h1>{{ cat.name }}</h1> 
      
      <button class="del-btn" style=" margin-left: 15px;background-color:rgb(226, 64, 64) ; color: black; border: none; padding: 8px 15px; border-radius: 8px; cursor: pointer; width: 100px; max-height: 50px;" @click="deleteCategory(cat.id) ">Delete</button>
      <button class="del-btn" style=" margin-left: 15px;background-color:rgb(226, 64, 64) ; color: black; border: none; padding: 8px 15px; border-radius: 8px; cursor: pointer; width: 100px; max-height: 50px;" @click="EditCategory(cat.id) ">Edit</button>
    </div>
      <br>
      <div style="display: flex; flex-wrap: wrap; ">
       
<div v-for="product in filteredProducts(cat.id)" :key="product.id">
<div class="container">
  <div class="card" style="background-color: beige; color: #693d3d; border-radius: 10px; padding: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-height: 500px;">
    <span class="title" style="font-size: 1.5em; font-weight: bold; text-transform: uppercase;">{{ product.name }}</span>
    <div style="margin-top: 10px;" >
        <strong>PRICE: {{ product.rate_per_unit }}</strong>
        <br>
        <strong>QUANTITY: {{ product.available_quantity }}</strong>
    </div>
    <div style="margin-top: 15px; justify-content: space-between;">
        <button class="edit-btn" style="background-color:#41b3a3 ; color: beige; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; width: 100px;" @click="editproduct(product.id)">Edit</button>
       <br><br> <button class="delete-btn" style="background-color: #41b3a3 ; color: beige; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;width: 100px;" @click="deleteProduct(product.id)">Delete</button>
    </div>
</div>

</div>
</div>

<div style="align-items: center; margin-top: 110px;" @click="addProduct()">
  
<button class="button" type="button">
  <span class="button__text">Add Product</span>
  <span class="button__icon" style="margin-left: 10px;"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
</button>
</div>
</div>

        
</div>
<br><br>
<div style="align-items: end; display: flex;">
  <div style="align-items: center;" @click="AddCategory()">
  

    <button class="button" type="button" style="margin-left: 30px;">
  <span class="button__text">Add Category</span>
  <span class="button__icon" style="margin-left: 15px;"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
</button>
  </div>
  </div>
  <br><br><br>
  <div v-if="isManager">
    <button class="download-btn" @click="triggerCsvDownload(this.userId)">Download CSV</button>
    <input type="text">
    <button class="download-btn" @click="triggerCsvDownload(this.userId)">Download CSV</button>
  </div>
</div>
  </template>
  
  <script>
  import Vue from 'vue';
  import router from '@/router';
import axios from 'axios';
import EditCategory from './EditCategory.vue';
  
  export default {
    name: 'ProductsPage',
    data() {
      return {
        selectedProduct: null,
        quantity: 1,
        loading: true,
        products: [],
        category: [],
        userId: localStorage.getItem('user_id'),
        role: localStorage.getItem('role'),
        
      };
    },
    computed: {
    isManager() {
      if(this.role === 'manager'){

      return true
      }
    else{
      return false
    }
    },
  },
    mounted() {
      this.fetchProducts();
      this.fetchCategory();
      this.filteredProducts();
      // this.deleteCategory();
    },
    methods: {
      showQuantityInput(productId) {
      // Set selectedProduct to the clicked product's id
      this.selectedProduct = productId;
    },
  
      fetchProducts() {
        const jwtToken = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
          };

        axios.get('http://localhost:5000/admin/get-products', {headers})
          .then(response => {
          
            this.products = response.data;
            console.log(response.data)
            this.loading = false; 
          })
          .catch(error => {
            console.error('Error fetching products:', error);
            this.loading = false;
          });
      },
      deleteProduct(productId) {
        const jwtToken = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
          };
      // Make an HTTP DELETE request to your backend API endpoint
      axios.post(`http://localhost:5000/admin/delete-product/` + productId, null, {headers})
        .then(response => {
          // Handle success
          console.log('Product deleted successfully:', response.data);
          this.$router.go();
         
        })},
      fetchCategory() {
        const jwtToken = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
          };
        axios.get('http://127.0.0.1:5000/admin/get-categories', {headers})
          .then(response => {
            // Assuming the JSON response contains an array of products
            this.category = response.data;
            console.log(this.category.id)
            console.log("success")
            this.loading = false; 
            
          })
          .catch(error => {
            console.error('Error fetching category:', error);
            this.loading = false;
          });
      },
      filteredProducts(categoryId) {
      return this.products.filter(product => product.category_id === categoryId);
    },
    deleteCategory(categoryId) {
      const jwtToken = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
          };
    axios.post('http://localhost:5000/admin/delete-category/' + categoryId, null, {headers})
      .then(response => {
        this.$router.go();
        // Assuming the JSON response contains an updated list of categories
        this.category = response.data;
        console.log(response.data)
        this.loading = false;
      })
      .catch(error => {
        console.error('Error:', error);
        this.loading = false;
      });
      
  },

  addProduct() {
    this.$router.push('/addproduct');
  },
  AddCategory() {
    this.$router.push('/addcategory');
  },
  editproduct(productId){
    this.$router.push({ name: 'EditProduct', params: { productId: productId } });

  },
  EditCategory(categoryId){
    this.$router.push({ name: 'EditCategory', params: { categoryId: categoryId } });

  },
  triggerCsvDownload(id) {
    console.log("hello")
      axios.post(`http://localhost:5000/download-data/` + id)
      
        .then(response => {
        
          const taskId = response.data.task_id;
          console.log(this.taskId)
          // Poll the status of the task until it's ready
          this.pollTaskStatus(taskId);
        })
        .catch(error => {
          console.error('Error triggering CSV download:', error);
        });
    },
    pollTaskStatus(taskId) {
      // Poll the status of the task every 2 seconds
      // const pollInterval = setInterval(() => {
        axios.get(`http://localhost:5000/get-users-csv/` + taskId, null)
          .then(response => {
            if (response.data.message === 'FAILURE') {
              // Task failed, handle accordingly
              // clearInterval(pollInterval);
              console.error('CSV download task failed');
            } else if (response.headers['content-type'] === 'application/zip') {
              // CSV file is ready for download
              // clearInterval(pollInterval);
              const blob = new Blob([response.data], { type: 'application/zip' });
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = 'users.csv';
              link.click();
            }
          })
          .catch(error => {
            console.error('Error checking CSV download status:', error);
            // clearInterval(pollInterval);
          });
      // }, 2000);
    },
}
  }
  </script>
 

 <style>
 
 </style>