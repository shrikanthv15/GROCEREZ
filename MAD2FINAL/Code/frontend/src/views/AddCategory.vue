<template>
    <div style="background-color: #41b3a3; height: 100vh;">
      <center>
      <h1>Add Category</h1>
      <form @submit.prevent="login" class="form" style="width: 800px; height: 500px; align-items: center;">
    <div class="title" >Category Name:</div>
    <!-- <label for="name">Name:</label> -->
    <input v-model="name" type="text" id="name" required> 

  <input class="button-confirm" type="submit" value="Add" @click="addcategory">
</form>
</center>
    </div>

  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'AddCategoryPage',
    data() {
      return {
        name: '',
      };
    },
    methods: {
        addcategory() {
          const jwtToken = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
          };
    axios.post('http://127.0.0.1:5000/admin/add-category',{
        name: this.name,
    }, { headers }).then(response => {
        console.log(response.data); 

        // Check the response structure and adjust the condition accordingly
        const message = response.data.message;
        if (message === 'success') {
            // Redirect to the correct route
            this.$router.push('/products');
          
        } else {
            alert('Invalid Category Creation');
        }
    }).catch(error => {
        console.log(error);
    });
},

    },
  };
  </script>
  