<template>
  <div style="background-color: #41b3a3; min-height: 100vh;"> 
    <br>
    <div v-if="orders.length > 0">
      <div v-for="(order, index) in orders" :key="index" class="card mb-3" style="background-color: beige;">
        <div class="card-body">
          <h5 class="card-title" style="color: #41b3a3;">Order ID: {{ order.id }}</h5>
          <p class="card-text">
            User ID: {{ order.user_id }}
          </p>
          <p class="card-text">
            <!-- <strong>Placed At:</strong> {{ formatDatetime(order.placed_at) }} -->
          </p>
          
          <div v-if="order.products.length > 0">
            <h6 class="card-subtitle mb-2 text-muted">Items:</h6>
            <ul>
              <li v-for="(product, productIndex) in order.products" :key="productIndex">
                {{ product.name }} - {{ product.quantity_ordered }} x ${{ product.rate_per_unit }} = ${{ product.total_price }}
              </li>
            </ul>
          </div>
          <p class="card-text">
            <strong>Total Amount:</strong> {{ order.total_amount }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No order details available.</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 18rem;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: #009688;
}

.card-text {
  margin-bottom: 0.5rem;
}

.card-subtitle {
  color: #6c757d;
  margin-bottom: 0.5rem;
}

ul {
  padding: 0;
  list-style-type: none;
}

ul li {
  margin-bottom: 0.25rem;
}
</style>

<script>
import axios from 'axios';


export default {
  name: 'OrderSummary',
  data() {
    return {
      orders: [],
      userId: localStorage.getItem('user_id'),
    };
  },
  mounted() {
    this.fetchOrderSummary(this.userId);
  },
  methods: {
    fetchOrderSummary(userId) {
      const jwtToken = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      axios.get(`http://localhost:5000/user/get-order-confirmation/${userId}`, { headers })
        .then(response => {
          this.orders = response.data;
        })
        .catch(error => {
          console.error('Error fetching order summary:', error);
          // Handle the error, show an error message, or redirect the user as needed
        });
    },
   
  },
};
</script>
