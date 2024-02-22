<template>
  <div class="signup-container">
    <h2>Registracija</h2>
    <div class="form-group">
      <input type="text" v-model="username" placeholder="Korisničko ime" :class="{ 'invalid': !isUsernameValid }">
      <div v-if="!isUsernameValid" class="error-msg">Mora sadržavati barem 6 znakova.</div>
    </div>
    <div class="form-group">
      <input type="password" v-model="password" placeholder="Lozinka" :class="{ 'invalid': !isPasswordValid }">
      <div v-if="!isPasswordValid" class="error-msg">Mora sadržavati barem 6 znakova.</div>
    </div>
    <div class="form-group">
      <label>Datum dolaska:</label>
      <input type="date" v-model="arrivalDate" :class="{ 'invalid': !isArrivalDateValid }">
      <div v-if="!isArrivalDateValid" class="error-msg">Molimo unesite datum dolaska.</div>
    </div>
    <div class="form-group">
      <label>Datum odlaska:</label>
      <input type="date" v-model="departureDate" :class="{ 'invalid': !isDepartureDateValid }">
      <div v-if="!isDepartureDateValid" class="error-msg">Molimo unesite datum odlaska.</div>
    </div>
    <button class="signup-btn" @click="signUp">Registriraj se</button>
    <router-link to="/">
      <button class="login-page-btn">Idi na Login</button>
    </router-link>
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
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      arrivalDate: '',
      departureDate: ''
    };
  },
  computed: {
    isUsernameValid() {
      return this.username.length > 6;
    },
    isPasswordValid() {
      return this.password.length > 6;
    },
    isArrivalDateValid() {
      return !!this.arrivalDate;
    },
    isDepartureDateValid() {
      return !!this.departureDate;
    }
  },
  methods: {
    async signUp() {
      if (!this.isUsernameValid || !this.isPasswordValid || !this.isArrivalDateValid || !this.isDepartureDateValid) {
        console.error('Neispravni podaci za registraciju.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/SignUp', {
          username: this.username,
          password: this.password,
          arrivalDate: this.arrivalDate,
          departureDate: this.departureDate,
        });

        console.log('Registracija uspješna:', response.data);
        this.$router.push('/');
      } catch (error) {
        console.error('Greška prilikom registracije:', error.message);
      }
    }
  },
};
</script>
