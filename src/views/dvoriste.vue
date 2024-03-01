<template>
  <div>
    <header>
      <h1>Dvorište</h1>
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
  </div>
</template>

<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

  header {
    background-color: #007bff;
    color: #fff;
    padding: 20px;
    text-align: center;
  }

  .user-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .user-info p {
    margin: 0;
    margin-right: 10px;
  }

  .user-info button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 3px;
    cursor: pointer;
  }

  .user-info button:hover {
    background-color: #c82333;
  }

  nav {
    background-color: #f2f2f2;
    padding: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: inline-block;
    margin-right: 10px;
  }

  li a {
    display: block;
    padding: 10px;
    color: #000;
    text-decoration: none;
  }

  li a:hover {
    background-color: #ddd;
  }

  section {
    padding: 20px;
    text-align: center;
  }
</style>

<script>
import { Auth } from "./index";

export default {
  data() {
    return {
      currentUser: {}, // Initialize currentUser
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("login");
      });
    },
    async getName() {
      this.currentUser = await Auth.getUser(); // Set currentUser
      console.log(this.currentUser);
    },
  },
  async mounted() {
    this.$store.dispatch("setUser", this.$store.getters.currentUser);
    await this.getName(); // Call getName to set currentUser
  },
};
</script>
