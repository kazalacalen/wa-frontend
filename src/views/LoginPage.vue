<!-- Login.vue -->

<template>
  <div>
    <h2>Prijava</h2>
    <div class="form-group">
      <input type="text" v-model="username" placeholder="Korisničko ime">
    </div>
    <div class="form-group">
      <input type="password" v-model="password" placeholder="Lozinka">
    </div>
    <button class="login-btn" @click="login">Prijavi se</button>
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
.form-group {
  margin-bottom: 20px;
}
input {
  width: 15%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.login-btn {
  width: 10%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.login-btn:hover {
  background-color: #0056b3;
}
</style>
