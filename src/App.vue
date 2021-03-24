<template>
  <v-app>
    <v-main>
      <v-app-bar dense>
        <v-toolbar-title>COVID-19</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon v-on:click="this.getCenter">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
      <KakaoMap ref="map" v-bind:centers='this.centers'></KakaoMap>
    </v-main>
  </v-app>
</template>

<script>
import KakaoMap from "./components/KakaoMap.vue";
const axios = require("axios");

export default {
  name: "App",
  components: { KakaoMap },
  created() {
    
  },
  mounted() {
    window.addEventListener("resize", this.$refs.map.relayout)
    
    // Getting COVID-19 centers
    axios
      .get(
        "https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=30&returnType=json&serviceKey=Wh9E6TJ0KWsdTLHENIaKPd%2FgV%2BLbmPiHfP0f0EmHodCF5xe4mN4PS5qmvnUtG0X9uATyNnKa9EQ76svudHWLwg%3D%3D"
      )
      .then((res) => {
        res.data.data.forEach( el => {
          let center = {
            centerName: el.centerName,
            address: el.address,
            facilityName: el.facilityName,
            sido: el.sido,
            sigungu: el.sigungu,
            zipCode: el.zipCode,
            latitude: el.lng,
            longitude: el.lat
          }

          this.centers.push(center)
        })
      })
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$refs.map.relayout)
  },
  methods: {
    getCenter() {
      console.log(this.$refs.map.getCenter());
    },
  },
  data: () => ({
    mapSize: 0,
    mapCenter: null,
    centers: []
  }),
};
</script>