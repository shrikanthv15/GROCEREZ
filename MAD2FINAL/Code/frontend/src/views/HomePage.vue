<template>
  <div class="home" style="background-color: #41b3a3;  height: fit-content; ">
    <div class="first">
      <link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet">

      <br><br><br>
      <center>
        <div class="card">GROCEREZ</div>
      
</center>
<br>

    </div>
    <br>

    <div style="background-color: beige;  min-height: none;">
      <br>
<h1 style="margin-left: 200px; font-family: 'Crimson Pro', serif; color: #693d3d;"><strong>WELCOME TO FRESH MARKET</strong></h1>
<br><br>
<h4 style="margin-left: 200px; width: 500px; font-family: 'Roboto', sans-serif; color: #7d685f;">Discover a world of premium groceries and expertly curated selections for the discerning shopper.</h4>
<br><br>
<h4 style="margin-left: 200px; width: 500px; font-family: 'Open Sans', sans-serif; color: #8f796f;">Say goodbye to the hassle of traditional shopping. Fresh Market is your go-to destination, ensuring top-quality products and a seamless browsing experience.</h4>
<br><br>
<h4 style="margin-left: 200px; width: 500px; font-family: 'Nunito', sans-serif; color: #a18c80;">Meanwhile, our dedicated team of administrators works tirelessly to maintain the highest standards – from quality control to ensuring a constantly replenished inventory with the latest products.</h4>
<br><br><br><br><br><br>


<br><br>
<h1 style="margin-left: 200px; font-family: 'Playfair Display', serif; color: #6d2c2c;"><strong>EXPLORE OUR EXCLUSIVE FEATURES</strong></h1>
<br><br><br>
<div class="position-relative" style="min-height: none;">
  <br><br>
  <div class="position-absolute top-0 start-0 translate-middle" style="margin-left: 350px; width: 300px; font-family: 'Lora', serif; color: #7a604e;">
    <br><br>
    <h2>Premium Selection</h2>
    <h5>Discover handpicked fresh produce sourced directly from local farms, delivered to your doorstep.</h5>
  </div>
  <div class="position-absolute top-0 start-50 translate-middle" style="margin-left: 200px; width: 300px; font-family: 'Lora', serif; color: #7a604e;">
    <br><br>
    <h2>Diverse Variety</h2>
    <h5>Indulge in a diverse range of meats, seafood, dairy, bakery, and pantry staples tailored for every palate.</h5>
  </div>
  <div class="position-absolute top-0 start-0 translate-middle" style="margin-left: 350px; width: 300px; margin-top:200px; font-family: 'Lora', serif; color: #7a604e;">
    <br><br>
    <h2>Effortless Shopping</h2>
    <h5>Experience an intuitive cart system and a seamless checkout process that makes shopping a breeze.</h5>
  </div>
  <div class="position-absolute top-0 start-50 translate-middle" style="margin-left: 200px; width: 300px; margin-top:200px; font-family: 'Lora', serif; color: #7a604e;">
    <br><br>
    <h2>Admin Controls</h2>
    <h5>Effortlessly manage the product catalog, add sections, and perform CRUD operations for optimal control.</h5>
  </div>
  <div class="position-absolute top-0 start-0 translate-middle" style="margin-left: 350px; width: 300px; margin-top:400px; font-family: 'Lora', serif; color: #7a604e;">
    <br><br>
    <h2>Secure Payments</h2>
    <h5>Your transactions are securely processed, and multiple payment options are available for your convenience.</h5>
  </div>
  <div class="position-absolute top-0 start-50 translate-middle" style="margin-left: 200px; width: 300px; margin-top:400px; font-family: 'Lora', serif; color: #7a604e;">
    <br><br>
    <h2>Dedicated Support</h2>
    <h5>Our team is ready to assist you, ensuring a smooth and convenient shopping experience at every step.</h5>
  </div>
</div>
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
<h1 style="margin-left: 200px; width: 500px; font-family: 'Playfair Display', serif; color: #6d2c2c;">READY TO TRANSFORM YOUR WEEKLY GROCERY SHOPPING? <br>START TODAY!</h1>
<br>
<center>
  <div class="row" style="background-color: beige; border: 0px;">
    <div class="col-md-6" style="background-color: beige;border: 0px; ">
      <router-link to="/login">
        <button class="btn btn-danger mr-2" @click="login">Login</button>
      </router-link>
      <router-link to="/register">
      <button class="btn btn-primary" style="margin-left: 180px;" @click="register">Register</button>
      </router-link>
    </div>
  </div>
</center>
</div>



  </div>


</template>

<script>
export default {
  name: 'HomeView',
}

</script>


<style scoped>
.card {
  position: relative;
  width: 620px;
  height: 320px;
  background: mediumturquoise;
  color:beige;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 55px;
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;
}

.card::before,
.card::after {
  position: absolute;
  content: "";
  width: 20%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  background-color: beige;
  transition: all 0.5s;
}

.card::before {
  top: 0;
  right: 0;
  border-radius: 0 15px 0 100%;
}

.card::after {
  bottom: 0;
  left: 0;
  border-radius: 0 100%  0 15px;
}

.card:hover::before,
.card:hover:after {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  transition: all 0.5s;
}

.card:hover:after {
  content: "SHOPPING MADE EZ";
  color: mediumturquoise;
}
</style>