<template>
  <header id="header" class="fixed top-0 right-0 p-[20px] z-10">
    <nav class="flex items-center">
      <router-link class="px-3" to="/">Home</router-link>
      <router-link class="px-3" to="/users-online">Users Online</router-link>
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
          ml-auto ml-3
        "
        @click.prevent="logout()"
      >
        <img
          class="w-[20px] mr-2"
          :src="require('../assets/images/exit.png')"
          alt=""
        />
        Log out
      </button>
    </nav>
  </header>
</template>
<script>
import { deleteCookie } from "@/helpers/common";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("client", ["getProfile"]),
    logout() {
      this.$router.push("/login");
      this.getProfile(null);
      deleteCookie("token");
      this.$socket.disconnect();
    },
  },
};
</script>