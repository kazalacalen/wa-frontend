<template>
  <div>
    <header>
      <h1>Dobrodošli na početnu stranicu</h1>
      <div>
        <p>Prijavljeni korisnik: {{ currentUser }}</p>
        <button @click="logout">Odjava</button>
      </div>
    </header>

    <nav>
      <ul>
        <li><router-link to="/apartmani">Apartmani</router-link></li>
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
export default {
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    },
  },
  mounted() {
    // Dodajte ovo kako biste ažurirali trenutnog korisnika prilikom ponovnog učitavanja stranice
    this.$store.dispatch('setUser', this.$store.getters.currentUser);
  },
};
</script>
