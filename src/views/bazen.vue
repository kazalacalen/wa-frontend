<template>
  <div>
    <header>
      <h1>Bazen</h1>
      <div class="user-info">
        <p>Prijavljeni korisnik: {{ currentUser.username }}</p>
        <button @click="logout">Odjava</button>
      </div>
    </header>

    <nav>
      <ul>
        <li><router-link to="/home">Početna</router-link></li>
        <li><router-link to="/apartman">Apartmani</router-link></li>
        <li><router-link to="/studio">Studio</router-link></li>
        <li><router-link to="/bazen">Bazen</router-link></li>
        <li><router-link to="/igraonica">Igraonica</router-link></li>
        <li><router-link to="/dvoriste">Dvorište</router-link></li>
      </ul>
    </nav>

    <section>
      <h2>Dobrodošli u naše objekte</h2>
      <p>Odaberite jednu od ponuđenih opcija iz izbornika.</p>
    </section>

    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="user">User:</label>
        <input type="text" id="user" :value="currentUser.username" readonly>
      </div>
      <div class="form-group">
        <label for="tip">Tip:</label>
        <input type="text" id="tip" v-model="tip" readonly>
      </div>
      <div class="form-group">
        <label for="date">Date:</label>
        <input type="text" id="date" :value="currentDate" readonly>
      </div>
      <div class="form-group">
        <label for="opis">Opis:</label>
        <textarea id="opis" v-model="formData.opis" required></textarea>
      </div>
      <button type="submit" class="submit-btn">Send</button>
    </form>
  </div>
</template>


<script>
import { Auth, Service } from "./index";

export default {
  data() {
    return {
      currentUser: {},
      currentDate: "",
      formData: {
        opis: ""
      },
      tip: ""
    };
  },
  methods: {
    logout() {
      Auth.logout();
      this.$router.push("/login");
    },
    async getName() {
      this.currentUser = await Auth.getUser();
    },
    async submitForm() {
      try {
        await Service.post("/bazen", this.formData);
        console.log("Form data sent successfully to the backend");
      } catch (error) {
        console.error("Error sending form data to the backend:", error);
      }
    }
  },
  mounted() {
    this.$store.dispatch("setUser", this.$store.getters.currentUser);
    this.getName();
    this.currentDate = new Date().toLocaleString();
    this.tip = this.$route.name;
  }
};
</script>

<style scoped>
.form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.submit-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
