<template>
  <v-container ref="container">
    <div
      class="map"
      ref="map"
      v-bind:style="{ width: this.width + 'px', height: this.height + 'px' }"
    ></div>
  </v-container>
</template>

<script>
export default {
  name: "KakaoMap",
  props: ["centers"],
  data: () => ({
    location: {
      latitude: 35.93782110073764,
      longitude: 127.35002098673817,
    },
    width: 400,
    height: 400,
    map: null,
    markers: [],
  }),
  watch: {
    location: function(loc) {
      if(this.map) this.map.setCenter(new kakao.maps.LatLng(loc.latitude, loc.longitude));
    }
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
        level: 12,
      });

      this.relayout()
      if(this.centers) this.createMarker()
    },
    getCenter() {
      if (!this.map) return { latitude: 0, longitude: 0 };

      let position = this.map.getCenter();
      return { latitude: position.Ma, longitude: position.La };
    },
    relayout() {
      let width = this.$refs.container.clientWidth - 24
      this.width = width
      this.height = width > 400 ? 400 : width
      setTimeout(() => {
        this.map.relayout();
      }, 500);
    },
    createMarker() {
      this.centers.forEach(center => {
        let marker = new kakao.maps.Marker({
          map: this.map,
          position: new kakao.maps.LatLng(center.latitude, center.longitude),
          title: center.centerName,
        })
        this.markers.push(marker)     
      })
    }
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
.map {
  transition: 0.5s;
}
</style>