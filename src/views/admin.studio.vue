<template>
    <div>
        <header>
        <h1>Admin sučelje</h1>
        <div class="user-info">
          <p>Prijavljeni korisnik: {{ currentUser.username }}</p>
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
        <h2>Prikaz podataka iz kolekcije: Studio</h2>
  
        <div>
          <div v-for="(data, index) in fetchedData" :key="index" class="data-container">
            <div class="data-card">
              <p><strong>User:</strong> {{ data.user }}</p>
              <p><strong>Date:</strong> {{ data.date }}</p>
              <p><strong>Tip:</strong> {{ data.tip }}</p>
              <p><strong>Opis:</strong> {{ data.opis }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Auth } from "./index";
  
  export default {
    data() {
      return {
        fetchedData: [],
        currentUser: {}
      };
    },
    async mounted() {
      await this.getName();
      this.fetchDataFromBackend();
    },
    methods: {
      async getName() {
        this.currentUser = await Auth.getUser();
      },
      async fetchDataFromBackend() {
        try {
          const response = await axios.get('https://wa-backend-fuue.onrender.com/studioget');
          this.fetchedData = response.data;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      logout() {
        Auth.logout();
        this.$router.push("/login");
      }
    }
  };
  </script>
  
  <style scoped>
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
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .user-info {
      display: flex;
      align-items: center;
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
  
    .user-info p {
      margin-right: 10px; 
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
    
    .data-container {
      display: flex;
      flex-wrap: wrap;
    }
    
    .data-card {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      margin: 10px;
      width: 300px;
      background-color: #f9f9f9;
    }
  </style>