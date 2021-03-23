<template>
  <v-container>
    <div
      class="map-container"
      ref="map"
      v-bind:style="{ width: layoutWidth + 'px', height: layoutHeight + 'px' }"
    ></div>
  </v-container>
</template>

<script>
export default {
  name: "KakaoMap",
  data: () => ({
    layoutWidth: 500,
    layoutHeight: 400,
    location: {
      latitude: 33.450701,
      longitude: 126.570667,
    },
    map: null,
  }),
  watch: {
    location: function (position) {
      if (this.map) {
        this.map.setCenter(
          new kakao.maps.LatLng(position.latitude, position.longitude)
        );
      }
    },
  },
  components: {},
  methods: {
    declare() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initialize);
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=2c6c89d2c77f9dae13bfa46e7c7c66d8";
      document.head.appendChild(script);
    },
    initialize() {
      this.map = new kakao.maps.Map(this.$refs.map, {
        center: new kakao.maps.LatLng(
          this.location.latitude,
          this.location.longitude
        ),
        level: 3,
      });
    },
  },
  created() {
    this.map = this.$refs.map;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      });
    }
  },
  mounted() {
    window.kakao && window.kakao.maps ? this.initialize() : this.declare();
  },
};
</script>

<style scoped>
.map-container {
  transition: 1s;
}
</style>