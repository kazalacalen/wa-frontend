<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Prijava</h2>
      <div class="form-group">
        <input type="text" v-model="username" placeholder="Korisničko ime">
      </div>
      <div class="form-group">
        <input type="password" v-model="password" placeholder="Lozinka">
      </div>
      <button class="login-btn" @click="login">Prijavi se</button>
      <div class="links">
        <router-link to="SignUp">Registriraj se</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        console.error('Unesite korisničko ime i lozinku.');
        return;
      }

      fetch('http://localhost:3000/LoginPage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            console.log('Prijava uspješna');
            // Preusmjeri na "HomePage"
            this.$router.push('/HomePage');
          } else if (response.status === 401) {
            console.warn('Pogrešno korisničko ime ili lozinka');
          } else {
            console.error('Greška prilikom prijave:', response.status);
          }
        })
        .catch((error) => {
          console.error('Greška prilikom prijave:', error);
        });
    }
  }
};
</script>


<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-form {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px; /* Povećaj ili smanji prema potrebi */
  width: 100%;
}

h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

input {
  width: calc(100% - 20px); /* Smanjio sam širinu za 20px radi sličnosti s Facebookom */
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background-color: #fafafa;
  font-size: 14px;
}

.login-btn {
  width: calc(100% - 20px); /* Smanjio sam širinu za 20px radi sličnosti s Facebookom */
  padding: 10px;
  background-color: #3897f0;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #3578e5;
}

.links {
  margin-top: 10px;
}

.links a {
  color: #385185;
  text-decoration: none;
  font-weight: bold;
}
</style>
