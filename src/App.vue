<template>
  <div class="wrapper flex h-[100vh]">
    <router-view />
  </div>
</template>

<script>
import MenuLeft from "./components/MenuLeft.vue";
import Main from "./components/Main.vue";
import { mapGetters, mapActions } from "vuex";
import { checkCookie } from "@/helpers/common";
import { authService } from "./services/auth";

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
  async beforeMount() {
    // this.getProfile();
    // console.log(this.profile);
    const isLoggedIn = await checkCookie();
    console.log(isLoggedIn);
    if (isLoggedIn) {
      this.getProfile(isLoggedIn);
    }
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
