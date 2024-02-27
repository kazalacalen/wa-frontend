<template>
    <div>
      <header>
        <h1>Dobrodošli u admina</h1>
        <div>
          <p>Prijavljeni korisnik: {{ currentUser }}</p>
          <button @click="logout">Odjava</button>
        </div>
      </header>
  
  
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
        usersData: "",
      };
    },
    methods: {
      logout() {
        this.$store.dispatch("logout").then(() => {
          this.$router.push("login");
        });
      },
      async getName() {
        this.usersData = await Auth.getUser();
        console.log(this.usersData);
      },
    },
    async mounted() {
   
      this.$store.dispatch("setUser", this.$store.getters.currentUser);
      this.usersData = await Auth.getName();
    },
  };
  </script>
  
  