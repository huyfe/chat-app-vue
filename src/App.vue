<template>
  <Header />
  <Default>
    <div class="wrapper flex h-[100vh]">
      <MenuLeft />
      <router-view />
    </div>
  </Default>

  <notifications />
</template>

<script>
import MenuLeft from "./components/MenuLeft.vue";
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Default from "./layouts/Default";
import { mapGetters, mapActions } from "vuex";
import { checkCookie, getCookie } from "@/helpers/common";
import { authService } from "./services/auth";

export default {
  name: "App",
  sockets: {
    connect: function () {
      console.log("App component socket connected");
    },
    general: function (data) {
      // console.log(
      //   'this method was fired by the socket server. eg: io.emit("customEmit", data): ',
      //   data
      // );
    },
  },

  components: {
    MenuLeft,
    Main,
    Header,
    Default,
  },
  computed: {
    ...mapGetters("client", {
      profile: "clientProfile",
    }),
  },
  async beforeCreate() {
    const isLoggedIn = checkCookie();
    const token = getCookie("token");
    // console.log("Is logged in in App.vue: ", isLoggedIn);
    if (isLoggedIn) {
      const result = await authService.profile(token);
      if (!result) {
        this.$router.push("/login");
        return;
      }
      this.getProfile(result.data.profile);
      this.$socket.emit("usersOnline", result.data.profile.id);
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
