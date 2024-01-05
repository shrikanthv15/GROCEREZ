<template>
    <div style="background-color: #41b3a3; min-height: 93vh;">
      <br><br>
      <center>
        
      <h2>Manager List</h2>
      <br>
      <div style="background-color: #41b3a3; width: 1400px;">
      <table class="table" style="background-color: #41b3a3; border-color: black;" border="10px">
        <thead style="background-color: #41b3a3;">
          <tr style="background-color: #41b3a3;">
            <th style="background-color: #41b3a3;">ID</th>
            <th style="background-color: #41b3a3;">Username</th>
            <th style="background-color: #41b3a3;">Email</th>
            <th style="background-color: #41b3a3;">Active</th>
            <th style="background-color: #41b3a3;">Activate</th>
            <th style="background-color: #41b3a3;">Deactivate</th>
            <th style="background-color: #41b3a3;">Requests</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(manager, index) in managers" :key="index" style="background-color: #41b3a3;">
            <td style="background-color: #41b3a3;">{{ manager.id }}</td>
            <td style="background-color: #41b3a3;">{{ manager.username }}</td>
            <td style="background-color: #41b3a3;" >{{ manager.email }}</td>
            <td style="background-color: #41b3a3;">{{ manager.active ? 'Yes' : 'No' }}</td>
            <td style="background-color: #41b3a3;">
              <input type="radio" v-model="manager.active"  :checked="manager.active" @click="toggleActivation(manager.id)" style="margin-left: 25px;"/>
            </td>
            <td style="background-color: #41b3a3;">
              <input type="radio" v-model="manager.deactive" :checked="!manager.active"  @click="toggleDeactivation(manager.id)"  style="margin-left: 25px;"/>
              </td>
              <td style="background-color: #41b3a3;">
                <button class="del-btn" style="background-color:rgb(239, 243, 242) ; color: black; border: none; padding: 8px 15px; border-radius: 8px; cursor: pointer; width: 80px; max-height: 40px;">CHECK</button>
              </td>
          </tr>
        </tbody>
      </table>
      </div>
      
    </center>
    </div>
  </template>
  
  <script>
  import router from '@/router';
import axios from 'axios';
  
  export default {
    name: 'ManagerList',
    data() {
      return {
        managers: [],
      };
    },
    mounted() {
      this.fetchManagers();
    },
    methods: {
      fetchManagers() {
        const jwtToken = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };
        axios.get('http://localhost:5000/admin/get-managers', { headers })
          .then(response => {
            this.managers = response.data;
            console.log(this.managers.length)
            if(this.managers.length == 0){
              alert("All Managers Are Active!")
            }
          })
          .catch(error => {
            console.error('Error fetching managers:', error);
          });
      },
      toggleActivation(id){
        const jwtToken = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };
        axios.post('http://localhost:5000/admin/manager-activate/' + id, null,  {headers})
        .then(response => {
            this.managers = response.data;
            console.log(this.managers)
            router.go();
          })
          .catch(error => {
            console.error('Error fetching managers:', error);
          });


      },
      toggleDeactivation(id){
        const jwtToken = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };
        axios.post('http://localhost:5000/admin/manager-deactivate/' + id, null,  {headers})
        .then(response => {
            this.managers = response.data;
            console.log(this.managers)
            router.go();
          })
          .catch(error => {
            console.error('Error fetching managers:', error);
          });


      }
    },
  };
  </script>
  
  <style scoped>
  .switch {
 --false: #E81B1B;
 --true: #009068;
}

input[type=checkbox] {
 appearance: none;
 height: 2rem;
 width: 3.5rem;
 background-color: #fff;
 position: relative;
 border-radius: .2em;
 cursor: pointer;
}

input[type=checkbox]::before {
 content: '';
 display: block;
 height: 1.9em;
 width: 1.9em;
 transform: translate(-50%, -50%);
 position: absolute;
 top: 50%;
 left: calc(1.9em/2 + .3em);
 background-color: var(--false);
 border-radius: .2em;
 transition: .3s ease;
}

input[type=checkbox]:checked::before {
 background-color: var(--true);
 left: calc(100% - (1.9em/2 + .3em));
}
  </style>
  

  