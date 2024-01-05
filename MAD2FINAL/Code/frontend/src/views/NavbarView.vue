<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #41b3a3; width: 1481px;">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">GROCEREZ</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" v-if="!isLoggedIn">Home</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
          
          
          <li class="nav-item" v-if="isLoggedIn && (userRole === 'manager' || userRole ==='user')">
  <router-link to="/userhome" class="nav-link">UserHome</router-link>
</li>
<li class="nav-item" v-if="isLoggedIn && (userRole === 'manager' || userRole === 'admin')">
  <router-link to="/products" class="nav-link">AdminHome</router-link>
</li>

<li class="nav-item" v-if="isLoggedIn && userRole === 'admin'">
  <router-link to="/managerlist" class="nav-link">Managers</router-link>
</li>
          <li class="nav-item" v-if="iscart && isLoggedIn">
            <router-link :to="{ name: 'CartPage', params: { userId: this.user_id } }" class="nav-link">Cart</router-link>
          </li>
           
          <li class="nav-item" v-if="isLoggedIn && userRole != 'admin'">
            <router-link :to="{ name: 'userorder', params: { userId: this.user_id } }" class="nav-link">Orders</router-link>
          </li>
          <li>
  <form class="form-inline"  v-if="isLoggedIn">
    <router-link :to="{ name: 'SearchResults', params: { searchResults: searchResults } }" class="nav-link">
     Search
    </router-link>
    
  </form>
</li>

<button class="Btn" @click="logout()" v-if="isLoggedIn" style="margin-left: 900px;">
  
  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div class="text">Logout</div>
</button>


        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import router from '@/router';
import axios from 'axios';

export default {
  data() {
    return {
      // Assuming you have a variable to determine if the user is logged in
      isLoggedIn: false,
      iscart: false, 
      searchQuery: '',
      userRole: localStorage.getItem('role'),
      user_id: localStorage.getItem("user_id")// Set this to true when the user is logged in
    };
    
  },
  mounted() {
    this.check();
    this.isCart();
  },
  methods: {
    handleSearch() {
      // You may want to add some debounce logic here to avoid making too many requests in a short time
      if (this.searchQuery.trim() !== '') {
        this.performSearch();
      } else {
        console.log("what?")
      }
    },
  check(){
    if(localStorage.getItem('token')){
      console.log("hello")
      this.isLoggedIn = true;
      
    }
    else{
      this.isLoggedIn = false;
    }
  },
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('role');
    localStorage.removeItem("ok");
    
    this.$router.push('/');
    
    this.isLoggedIn = false;
  },
  isCart(){
    if(localStorage.getItem('role') == 'admin'){
      this.iscart = false;
    }
    else{
    const jwtToken = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
          };
    axios.get("http://localhost:5000/user/get-cart-items/" + this.user_id, {headers} )
    .then(response => {
    if(response.data.len =='0'){
      this.iscart = false;
      localStorage.setItem('ok', 0) 

    }
    else{
      this.iscart = true;
      localStorage.setItem('ok', 1) 
    }
  })
  .catch(error => {
            console.error('Error fetching products:', error);
            this.loading = false;
          });
  }
},

// Inside your existing component
performSearch() {
  const jwtToken = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  axios.post(`http://localhost:5000/search/${this.searchQuery}`, {}, { headers })
    .then(response => {
      // Redirect to the search results page with the search results as props
      this.$router.push({
        name: 'SearchResults',
        params: { searchResults: response.data },
      });
    })
    .catch(error => {
      console.error('Error searching:', error);
    });
},

  }
}
</script>

<style scoped>
.Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(255, 65, 65);
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: white;
}
/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: .3s;
}
/* hover effect on button width */
.Btn:hover {
  width: 125px;
  border-radius: 40px;
  transition-duration: .3s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: .3s;
  padding-left: 20px;
}
/* hover effect button's text */
.Btn:hover .text {
  font-size: 15px;
  opacity: 1;
  width: 70%;
  transition-duration: .3s;
  padding-right: 10px;
}
/* button click effect*/
.Btn:active {
  transform: translate(2px ,2px);
}
</style>