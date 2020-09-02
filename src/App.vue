<template>
  <div id="app">
    <ForeignExchangeCurrency msg="Foreign Exchange Currency using Vue.js Framework" />
  </div>
</template>

<script>
import ForeignExchangeCurrency from './components/ForeignExchangeCurrency.vue';

export default {
  name: 'app',
  components: {
    ForeignExchangeCurrency
  }
};
</script>

<style lang="scss">
@import './assets/sass/main.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
