<template>
  <div style="background-color: #41b3a3; min-height: 100vh">
    <div v-for="cat in category" :key="cat.name">
      <br />
      <div style="display: flex">
        <h1>{{ cat.name }}</h1>
      </div>
      <br />
      <div style="display: flex; flex-wrap: wrap">
        <div v-for="product in filteredProducts(cat.id)" :key="product.id">
          <div class="container">
            <div
              class="card"
              style="
                background-color: beige;
                color: #693d3d;
                border-radius: 10px;
                padding: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                height: 300px;
              "
            >
              <span
                class="title"
                style="
                  font-size: 1.5em;
                  font-weight: bold;
                  text-transform: uppercase;
                "
                >{{ product.name }}</span
              >
              <div style="margin-top: 10px">
                <strong>PRICE: {{ product.rate_per_unit }}</strong>
                <br />
                <strong>QUANTITY: {{ product.available_quantity }}</strong>
              </div>
              <div style="margin-top: 15px; justify-content: space-between">
  <button
    class="edit-btn"
    style="
      background-color: #41b3a3;
      color: beige;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      width: 140px;
    "
    @click="addToCart(user_id, product.id, productQuantity[product.id])"
  >
    Add To Cart
  </button>
  Quantity: 
  <input type="number"  v-model="productQuantity[product.id]" class="quantity" min="1"  style="width: 70px; height: 30px; background-color: beige; border-color: #41b3a3;"/>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import router from "@/router";
import axios from "axios";

export default {
  name: "UserHome",
  data() {
    return {
      selectedProduct: null,
      quantity: 1,
      loading: true,
      products: [],
      category: [],
      user_id: localStorage.getItem("user_id"),
      cartdata: {
        quantity: 1,
      },
      productQuantity: {},
    };
  },
  mounted() {
    this.fetchProducts();
    this.fetchCategory();
    this.filteredProducts();
  },
  methods: {
    addToCart(user_id, productId, quantity) {
      quantity = quantity || 1;
      const jwtToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      console.log("click");
      axios
        .post(
          "http://localhost:5000/user/add-to-cart/" +
            user_id +
            "/" +
            productId,
          { quantity }, // Send quantity along with the request
          { headers }
        )
        .then((response) => {
          const message = response.data.message;
          if(message == 'incart'){
            alert("You have already added this product!")
          }
          else{
            router.go();
          }
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          this.loading = false;
        });
    },
    showQuantityInput(productId) {
      // Set selectedProduct to the clicked product's id
      this.selectedProduct = productId;
    },

    fetchProducts() {
      const jwtToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      axios
        .get("http://localhost:5000/admin/get-products", { headers })
        .then((response) => {
          this.products = response.data;
          console.log(response.data);
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          this.loading = false;
        });
    },
    fetchCategory() {
      const jwtToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      axios
        .get("http://127.0.0.1:5000/admin/get-categories", { headers })
        .then((response) => {
          // Assuming the JSON response contains an array of products
          this.category = response.data;
          console.log(this.category.id);
          console.log("success");
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
          this.loading = false;
        });
    },
    filteredProducts(categoryId) {
      return this.products.filter(
        (product) => product.category_id === categoryId
      );
    },
    ordersummary(userid) {
      this.$router.push({ name: "userorder", params: { userId: userid } });
    },
    
  },
  
};
</script>

<style>
.book {
  position: relative;
  border-radius: 10px;
  width: 220px;
  height: 300px;
  background-color: whitesmoke;
  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  -webkit-transform: preserve-3d;
  -ms-transform: preserve-3d;
  transform: preserve-3d;
  -webkit-perspective: 2000px;
  perspective: 2000px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #000;
}

.cover {
  top: 0;
  position: absolute;
  background-color: lightgray;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform-origin: 0;
  -ms-transform-origin: 0;
  transform-origin: 0;
  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.book:hover .cover {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform: rotatey(-80deg);
  -ms-transform: rotatey(-80deg);
  transform: rotatey(-80deg);
}

p {
  font-size: 20px;
  font-weight: bolder;
}

.card {
  width: 190px;
  height: 154px;
  padding: 0.8em;
  background: peachpuff;
  position: relative;
  overflow: visible;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.card-img {
  background-color: peachpuff;
  height: 40%;
  width: 100%;
  border-radius: 0.5rem;
  transition: 0.3s ease;
}

.card-info {
  padding-top: 10%;
}

svg {
  width: 30px;
  height: 30px;
}

.card-footer {
  width: 100%;
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid peachpuff;
}

/*Text*/
.text-title {
  font-weight: 900;
  font-size: 1.2em;
  line-height: 1.5;
}

.text-body {
  font-size: 0.9em;
  padding-bottom: 10px;
}

/*Button*/
.card-button {
  border: 1px solid peachpuff;
  display: flex;
  padding: 0.3em;
  cursor: pointer;
  border-radius: 50px;
  transition: 0.3s ease-in-out;
}

/*Hover*/
.card-img:hover {
  transform: translateY(-25%);
  box-shadow: rgba(226, 196, 63, 0.25) 0px 13px 47px -5px,
    rgba(180, 71, 71, 0.3) 0px 8px 16px -8px;
}

.card-button:hover {
  border: 1px solid #ffcaa6;
  background-color: #ffcaa6;
}

.quantity {
  background-color: peachpuff;
  padding: 0;
  width: 50px;
  height: 50px;
  margin-top: 10px;
}
</style>
