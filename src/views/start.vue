<template>
    <div class="button-container">
      <router-link to="/login">
        <button class="login-button">Login</button>
      </router-link>
      <router-link to="/register">
        <button class="register-button">Register</button>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ButtonPage'
  }
  </script>
  
  <style>
  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .login-button,
  .register-button {
    padding: 10px 20px;
    margin: 0 10px;
    background-color: #4CAF50; 
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .login-button:hover,
  .register-button:hover {
    background-color: #45a049; 
  }
  </style>
  