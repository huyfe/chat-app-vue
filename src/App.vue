<template>
  <div class="wrapper flex h-[100vh]">
    <MenuLeft />
    <!-- <Main /> -->
    <router-view />
  </div>
</template>

<script>
import MenuLeft from "./components/MenuLeft.vue";
import Main from "./components/Main.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    MenuLeft,
    Main,
  },
  computed: {
    ...mapGetters("client", {
      profile: "clientProfile",
    }),
  },
  beforeMount() {
    this.getProfile();
  },
  methods: {
    ...mapActions("client", ["getProfile"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: $font-primary;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
