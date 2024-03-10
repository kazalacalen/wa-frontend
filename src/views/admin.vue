<template>
  <div>
    <header>
      <h1>Admin sučelje</h1>
      <div class="header-right">
        <div class="user-info">
          <p>Prijavljeni korisnik: {{ currentUser.username }}</p>
        </div>
        <button @click="logout" class="logout-btn">Odjava</button>
      </div>
    </header>

    <nav>
      <ul>
        <li><router-link to="/admin">Početna</router-link></li>
        <li><router-link to="/admin.apartman">Apartmani</router-link></li>
        <li><router-link to="/admin.studio">Studio</router-link></li>
        <li><router-link to="/admin.bazen">Bazen</router-link></li>
        <li><router-link to="/admin.igraonica">Igraonica</router-link></li>
        <li><router-link to="/admin.dvoriste">Dvorište</router-link></li>
      </ul>
    </nav>

    <section>
      <h2>Dobrodošli u admina</h2>
      <p>Odaberite kolekciju za koju želite prikaz</p>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-right {
    display: flex;
    align-items: center;
  }

  .user-info {
    margin-right: 10px;
  }

  .logout-btn {
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }

  .logout-btn:hover {
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
      currentUser: {}, 
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("login");
      });
    },
    async getName() {
      this.currentUser = await Auth.getUser();
      console.log(this.currentUser);
    },
  },
  async mounted() {
    this.$store.dispatch("setUser", this.$store.getters.currentUser);
    await this.getName(); 
  },
};
</script>
