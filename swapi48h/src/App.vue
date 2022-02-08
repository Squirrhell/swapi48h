<script setup defer>
import Header from './components/Header.vue';
import Home from './components/Home.vue'
</script>

<template>
<div class="page">
  <header>
    <Header />
  </header>

  <main>
    <router-view />

  </main>

  <footer>

  </footer>
</div>
</template>


<style>
body {
  background-color: #EEEEEE;
  margin: 0;
}
header {
  background-color: #182840;
}


html {
  min-height: 100vh ;
  /*background-color: #182840;*/
}
/*@import './assets/base.css';
#app {
  max-width: 0px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}
@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}
@media (min-width: 1024px) {
  body {
    display: flex;
  }
  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  .logo {
    margin: 0 2rem 0 0;
  }
}*/
</style>