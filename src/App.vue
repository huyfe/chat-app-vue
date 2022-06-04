<template>
  <header id="header" class="mt-[-10px] fixed top-0 right-0 p-[20px] z-10">
    <button
      class="
        w-[108px]
        h-[40px]
        bg-blue-dark
        text-white-fade text-sm
        hover:bg-orange
        rounded
        flex
        items-center
        justify-center
        duration-200
        mt-[10px]
        ml-auto
      "
      @click.prevent="logout()"
    >
      <img
        class="w-[20px] mr-2"
        :src="require('./assets/images/exit.png')"
        alt=""
      />
      Log out
    </button>
  </header>
  <div class="wrapper flex h-[100vh]">
    <router-view />
  </div>
  <notifications />
</template>

<script>
import MenuLeft from "./components/MenuLeft.vue";
import Main from "./components/Main.vue";
import { mapGetters, mapActions } from "vuex";
import { checkCookie, getCookie } from "@/helpers/common";
import { authService } from "./services/auth";
import { deleteCookie } from "@/helpers/common";

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
    logout() {
      deleteCookie("token");
      this.$router.push("/login");
    },
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
