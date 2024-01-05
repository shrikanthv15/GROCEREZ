<!-- SearchResults.vue -->
<template>
    <div style="background-color: #41b3a3; min-height: 100vh;"> 
      <form class="form-inline">
        <input v-model="searchQuery" @input="handleSearch" class="form-control mr-sm-2"  style="width: 300px;" type="search" placeholder="Search" aria-label="Search">
      </form>
  
      <h2>Search Results</h2>
      
      <!-- Display search results for products -->
      <div v-if="searchResults && searchResults.products && searchResults.products.length > 0" style="width: 300px;">
        <h3>Products</h3>
        <div class="card" v-for="product in searchResults.products" :key="product.id" style="width: 400px;">
          <!-- Display product details in the card -->
          <div class="card-body">
            <h5 class="card-title">Product Name: {{ product.name }}</h5>
            <p class="card-text">Product Manufacturer: {{ product.manufacturer }}</p>
            <div style="margin-top: 15px; justify-content: space-between;">
        <button class="edit-btn" style="background-color:#41b3a3 ; color: beige; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; width: 140px;" @click="addToCart(user_id,product.id)">Add To Cart</button>
      
    </div>
            <!-- Add other product details as needed -->
          </div>
        </div>
      </div>
  
      <!-- Display search results for categories -->
      <div v-if="searchResults && searchResults.categories && searchResults.categories.length > 0">
  <h3>Categories</h3>
  <div class="card" v-for="category in searchResults.categories" :key="category.id" style="width: 400px;">
    <!-- Display category details in the card -->
    <div class="card-body">
      <h5 class="card-title">Category Name: {{ category.name }}</h5>

      <!-- Display products within the category -->
      <div class="card" v-for="product in category.products" :key="product.id" style="width: 400px;">
        <h5 class="card-title">Product Name: {{ product.name }}</h5>
        <!-- Add other product details as needed -->
      </div>
    </div>
  </div>
</div>

    </div>
  </template>
  
  // SearchResults.vue
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      searchResults: Object,
    },
    data() {
      return {
        user_id : localStorage.getItem('user_id'),
        searchResults: {
          products: [],
          categories: [],
        },
        cartdata: { 
            quantity: 1,
           },
        searchQuery: '',
        loading: false,
      };
    },
    methods: {
      async handleSearch() {
        const jwtToken = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
        // Clear previous search results
        this.searchResults.products = [];
        this.searchResults.categories = [];
  
        // Only proceed with the search if the query is not empty
        if (this.searchQuery.trim() !== '') {
          // Set loading state
          this.loading = true;
  
          try {
            // Perform the search API request
            const response = await axios.post(`http://localhost:5000/search/${this.searchQuery}`,null,  {headers});
  
            // Update the search results with the response data
            this.searchResults.products = response.data.products || [];
            this.searchResults.categories = response.data.categories || [];
            for(var i=0; i<response.data.categories.length; i++){
              
            console.log(response.data.categories[i].id)
            }
          } catch (error) {
            console.error('Error searching:', error);
          } finally {
            // Reset loading state
            this.loading = false;
          }
        }
      },
        addToCart(user_id, productId){
          const jwtToken = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
          };

          console.log("click")
          axios.post('http://localhost:5000/user/add-to-cart/' + user_id + '/' + productId, this.cartdata,  {headers})
          .then(response => {
            if(localStorage.getItem("ok") == 1){
              alert('Added to cart');
              this.loading = false;
            }
            else{
              router.go();
              alert('Added to cart');
              this.loading = false; 
            }
            })
            .catch(error => {
              console.error('Error fetching users:', error);
              this.loading = false;
            });
        },
    },
  };
  </script>
  
  
  <style scoped>
    /* Add styling for your cards if needed */
  </style>
  