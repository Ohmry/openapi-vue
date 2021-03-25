<template>
  <v-app>
    <v-main>
      <v-app-bar dense>
        <v-toolbar-title>COVID-19 Vaccine Centers</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon v-on:click="this.getCenter">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
      <v-container>
        <v-row>
          <v-flex xs12 sm12 md6>
            <KakaoMap class='map' ref="map" v-bind:centers="this.centers"></KakaoMap>
          </v-flex>
          <v-flex xs12 sm12 md6 class='list-container'>
            <div class="text-h6">Center List</div>
            <ul>
              <li v-for="center in this.centers" v-bind:key="center.zipCode">
                {{ center.centerName }}
              </li>
            </ul>
          </v-flex>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import KakaoMap from "./components/KakaoMap.vue";
const axios = require("axios");

export default {
  name: "App",
  components: { KakaoMap },
  created() {},
  mounted() {
    window.addEventListener("resize", this.$refs.map.relayout)
    // Getting COVID-19 centers
    axios
      .get(
        "https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=30&returnType=json&serviceKey=Wh9E6TJ0KWsdTLHENIaKPd%2FgV%2BLbmPiHfP0f0EmHodCF5xe4mN4PS5qmvnUtG0X9uATyNnKa9EQ76svudHWLwg%3D%3D"
      )
      .then((res) => {
        let ary = [];
        res.data.data.forEach((el) => {
          let center = {
            centerName: el.centerName,
            address: el.address,
            facilityName: el.facilityName,
            sido: el.sido,
            sigungu: el.sigungu,
            zipCode: el.zipCode,
            latitude: el.lng,
            longitude: el.lat,
          };

          ary.push(center);
          this.centers.push(center);
        });

        setTimeout(() => {
          this.$refs.map.createMarker();
        }, 1000);
      });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$refs.map.relayout);
  },
  methods: {
    getCenter() {
      console.log(this.$refs.map.getCenter());
    },
  },
  data: () => ({
    mapSize: 0,
    mapCenter: null,
    centers: [],
  }),
};
</script>

<style scoped>
.map {
  width: 100%;
  margin: 0 auto;
}
.list-container {
  padding: 12px;
}
</style>