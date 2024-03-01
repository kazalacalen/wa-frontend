<template>
  <div class="signup-container">
    <h2>Registracija</h2>
    <form @submit.prevent="register">  
    <div class="form-group">
      <input type="text" v-model="username" placeholder="Korisničko ime" :class="{ 'invalid': !isUsernameValid }">
      <div v-if="!isUsernameValid" class="error-msg">Mora sadržavati barem 6 znakova.</div>
    </div>
    <div class="form-group">
      <input type="password" v-model="password" placeholder="Lozinka" :class="{ 'invalid': !isPasswordValid }">
      <div v-if="!isPasswordValid" class="error-msg">Mora sadržavati barem 6 znakova.</div>
    </div>
 

    <button class="signup-btn" type="submit">Registriraj se</button>
    <router-link to="/">
      <button class="login-page-btn">Idi na Login</button>
    </router-link>
  </form>
  </div>
</template>

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.form-group {
  margin-bottom: 20px;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

label {
  display: block; 
  font-weight: bold;
}

.signup-btn, .login-page-btn {
  width: 200px; /* Postavite fiksnu širinu gumba prema potrebi */
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.signup-btn {
  background-color: #007bff;
  color: #fff;
}

.signup-btn:hover {
  background-color: #0056b3;
}

.login-page-btn {
  background-color: #555;
  color: #fff;
}

.login-page-btn:hover {
  background-color: #333;
}

.invalid {
  border-color: red;
}

.error-msg {
  color: red;
  margin-top: 5px;
}
</style>

<script>
import { Auth } from "./index";



export default {
  data() {
    return {
      username: "",
      password: "",
     
    };
  },
  computed: {
    isUsernameValid() {
      return this.username.length > 6;
    },
    isPasswordValid() {
      return this.password.length > 6;
    }
  },
  methods: {
    async register() {
      console.log();
      let success = await Auth.register(
   
        this.username,
        this.password,
   
      );

      if (success == true) {
        this.$router.push({ name: "login" }); 

   
      }
    },
  },
};
</script>
