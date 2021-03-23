<template>
  <v-app>
    <v-main>
      <KakaoMap></KakaoMap>
    </v-main>
  </v-app>
</template>

<script>
import KakaoMap from './components/KakaoMap.vue';
// const axios = require('axios');

export default {
  name: "App",
  components: { KakaoMap },
  mounted() {},
  methods: {},
  data: () => ({}),
};
</script>

