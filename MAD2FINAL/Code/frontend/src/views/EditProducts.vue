    <template>
        <div style="background-color: #41b3a3; min-height: 100vh; align-items: center; ">
        <div class="container" style="align-items: center;">
            <center>
            <form @submit.prevent="submitProduct" class="form" style="width: 800px; height: 700px; align-items: center;">
                <div class="title">Update Product:</div>
    
                <!-- Hidden input fields for existing values -->
                <input type="hidden" v-model="productData.name" id="existingName">
                <input type="hidden" v-model="productData.manufacturer" id="existingManufacturer">
                <input type="hidden" v-model="productData.expiry" id="existingExpiry">
                <input type="hidden" v-model="productData.rate_per_unit" id="existingRatePerUnit">
                <input type="hidden" v-model="productData.available_quantity" id="existingAvailableQuantity">
                <input type="hidden" v-model="productData.units" id="existingUnits">
    
                <!-- Form input fields for updating values -->
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
    
                <input class="button-confirm" type="submit" value="Update" @click="submitProduct()">
            </form>
            </center>
        </div>
        </div>
    </template>
    
    
        
        <script>
        import axios from 'axios';
        
        export default {
        name: 'EditProduct',
        data() {
            return {
                
            productData: {
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
            this.fetchProducts();
        },
        methods: {
            fetchProducts() {
            const productId = this.$route.params.productId;
            const jwtToken = localStorage.getItem('token')
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
            };

            axios.get(`http://localhost:5000/admin/get-product/${productId}`, { headers })
            .then(response => {
            
                this.productData = response.data;
                console.log(this.productData)
                this.loading = false; 
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                this.loading = false;
            });
        },
  submitProduct() {
    // Validate the form fields before sending the request
    if (!this.productData.name || !this.productData.rate_per_unit) {
      alert('Please fill in all required fields.');
      return;
    }

    const productId = this.$route.params.productId;
    const jwtToken = localStorage.getItem('token');
    
    // Assuming your API requires specific headers, replace 'Your-Header-Name' with the actual header name
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      'Your-Header-Name': 'Header-Value',  // Add any other required headers
    };

    // Send a PUT request to your backend API
    axios.put(`http://localhost:5000/admin/update-product/${productId}`, this.productData, { headers })
      .then(response => {
        // Assuming the backend returns the updated product data
        console.log('Product updated successfully:', response.data);

        // Redirect to the ProductsPage after successful submission
        this.$router.push('/products');
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  },
},

        }
        </script>
        
        <style>
    
    
    
    </style>