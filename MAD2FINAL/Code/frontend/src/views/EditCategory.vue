<template>
    <div style="background-color: #41b3a3; min-height: 100vh; align-items: center;">
      <div class="container" style="align-items: center;">
        <center>
          <form @submit.prevent="submitCategory" class="form" style="width: 800px; height: 500px; align-items: center;">
            <div class="title">Update Category: {{ categoryData.name }}</div>
  
            <div class="inputBox">
              <label for="categoryName">Category Name:</label>
              <input type="text" v-model="categoryData.name" id="categoryName" required>
            </div>
  
            <input class="button-confirm" type="submit" value="Update">
          </form>
        </center>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditCategory',
    data() {
      return {
        categoryData: {
          name: '',
        },
      };
    },
    mounted() {
      this.fetchCategory();
    },
    methods: {
      fetchCategory() {
        const categoryId = this.$route.params.categoryId;
        const jwtToken = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };
  
        axios.get(`http://localhost:5000/admin/get-category/${categoryId}`, { headers })
          .then(response => {
            this.categoryData = response.data;
            console.log(this.categoryData);
          })
          .catch(error => {
            console.error('Error fetching category details:', error);
          });
      },
      submitCategory() {
        if (!this.categoryData.name) {
          alert('Please fill in the category name.');
          return;
        }
  
        const categoryId = this.$route.params.categoryId;
        const jwtToken = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };
  
        axios.put(`http://localhost:5000/admin/update-category/${categoryId}`, this.categoryData, { headers })
          .then(response => {
            console.log('Category updated successfully:', response.data);
            this.$router.push('/products');
          })
          .catch(error => {
            console.error('Error updating category:', error);
          });
      },
    },
  };
  </script>
  
  <style>
  /* Your styles here */
  </style>
  