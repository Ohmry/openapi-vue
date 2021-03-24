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
      latitude: 35.91906512299429,
      longitude: 127.440701973167,
    },
    width: 400,
    height: 400,
    map: null,
    markers: [],
  }),
  watch: {
    // centers: function (value) {
    //   console.log(this.map)
    //   console.log('v')
    //   console.log(value)
    //   setTimeout(() => {
    //     value.forEach((center) => {
    //       let marker = new kakao.maps.Marker({
    //         position: new kakao.maps.LatLng(center.latitude, center.longitude),
    //       });
    //       marker.setMap(this.map)
    //     });
    //   }, 500);
    // },
    // location: function (position) {
    //   if (this.map) {
    //     this.map.setCenter(
    //       new kakao.maps.LatLng(position.latitude, position.longitude)
    //     );
    //     this.map.relayout();
    //   }
    // },
    // size: function () {
    //   if (this.map) {
    //     setTimeout(() => {
    //       this.size = this.$refs.container.clientWidth
    //       console.log(this.size)
    //       this.map.relayout();
    //     }, 500);
    //   }
    // },
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
        level: 100,
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
      this.width = this.$refs.container.clientWidth - 20;
      this.height = this.$refs.container.clientHeight - 20;
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
.container {
  height: 100%;
}
</style>