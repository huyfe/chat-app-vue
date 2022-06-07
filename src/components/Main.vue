<template>
  <MenuLeft />
  <main class="main flex-1 fade-in">
    <div class="flex flex-col h-full items-center justify-center">
      <router-view />

      <h1 class="text-4xl font-second">Welcome To My Chat App !</h1>
      <img :src="require('@/assets/images/chat.webp')" alt="" class="w-2/5" />
    </div>
  </main>
</template>

<script>
import MenuLeft from "./MenuLeft.vue";
import { deleteCookie } from "@/helpers/common";

export default {
  components: {
    MenuLeft,
  },
  methods: {
    logout() {
      deleteCookie("token");
      this.$router.push("/login");
    },
  },
};
</script>