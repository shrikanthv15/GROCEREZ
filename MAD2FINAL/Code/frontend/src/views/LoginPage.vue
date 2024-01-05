<template>
  <div style="min-height: 100vh; background-color: #41b3a3;">
    <br>
    <center>
    
 
  <form @submit.prevent="login" class="form" style="width: 800px; height: 500px; align-items: center;">
    <div class="title" >Welcome</div>
  <input v-model="email" required class="input" type="email" name="email" id="email" placeholder="E-mail">
  <input v-model="password" required class="input" type="password" name="password" id="password" placeholder="Password">

  <input class="button-confirm" type="submit" value="Sign In" @click="login()">
</form>
  </center>
  </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
            axios.post('http://127.0.0.1:5000/login', {
                email: this.email,
                password: this.password
            }).then(response => {
                console.log(response.data);
                const message = response.data.message;
                const role = response.data.role
                if (message === 'success' && (role === 'admin' || role ==='manager')) {
                    const token = response.data.access_token;
                    console.log('success')
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', role)
                    localStorage.setItem('email', this.email);
                    localStorage.setItem('user_id', response.data.id)
                    
                    this.$router.push('/products');
                    router.go();
                }
                else if (message === 'success' && (role === 'user' || role ==='manager') ){
                    const token = response.data.access_token;
                    console.log('success')
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', role)
                    localStorage.setItem('email', this.email);
                    localStorage.setItem('user_id', response.data.id)
                    console.log(localStorage.getItem('user_id'));
                    this.$router.push('/userhome');
                    router.go();

                }
                else if (message == 'Deactivated' ){
                    
                  alert("Admin hasn't activated you ");

                }
                else{
                    alert('Invalid Credentials');
                }
            }).catch(error => {
                console.log(error);
            })
    },
  },
};
</script>


<style>
.form {
  --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: beige;
  --main-color: black;
  padding: 20px;
  background: lightblue;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 50px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
}

.title {
  color: var(--font-color);
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 25px;
}

.title span {
  color: var(--font-color-sub);
  font-weight: 600;
  font-size: 17px;
}

.input {
  width: 250px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
}

.input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.input:focus {
  border: 2px solid var(--input-focus);
}

.login-with {
  display: flex;
  gap: 20px;
}

.button-log {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  color: var(--font-color);
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 24px;
  height: 24px;
  fill: var(--main-color);
}

.button-log:active, .button-confirm:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);
}

.button-confirm {
  margin: 50px auto 0 auto;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
}


</style>