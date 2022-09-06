<template>
  <div class="home">
    <ForeignExchangeCurrency />
  </div>
</template>

<script>
import ForeignExchangeCurrency from '@/components/ForeignExchangeCurrency.vue';

export default {
  name: 'HomeView',
  components: {
    ForeignExchangeCurrency
  }
};
</script>
