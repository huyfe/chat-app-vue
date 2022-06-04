<template>
  <div class="wrapper flex h-[100vh]">
    <!-- <router-view /> -->
    <transition name="fade">
      <router-view class="view" />
    </transition>
  </div>
  <notifications />
</template>

<script>
import MenuLeft from "./components/MenuLeft.vue";
import Main from "./components/Main.vue";
import { mapGetters, mapActions } from "vuex";
import { checkCookie, getCookie } from "@/helpers/common";
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
    const isLoggedIn = await checkCookie();
    const token = getCookie("token");
    console.log("Is logged in in App.vue: ", isLoggedIn);
    if (isLoggedIn) {
      const result = await authService.profile(token);
      if (!result) {
        this.$router.push("/login");
        return;
      }
      this.getProfile(result.data.profile);
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
