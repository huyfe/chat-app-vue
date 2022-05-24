<template>
  <div class="login w-full">
    <div class="container h-[100vh] flex">
      <div class="container__left w-2/4 flex items-center">
        <form @submit.prevent="login" class="form px-20 w-full ml-20">
          <div
            class="
              form__wrapper
              h-[50vh]
              bg-blue-dark
              rounded-lg
              shadow-lg
              pt-4
              px-6
              text-white
            "
          >
            <legend class="text-white text-xl font-bold text-center mb-4">
              Login
            </legend>
            <div class="form__group mb-4">
              <label for="email" class="block mb-3">Email</label>
              <input
                v-model="email"
                type="text"
                class="
                  bg-white-fade
                  w-full
                  px-3
                  py-1
                  outline-0
                  text-black text-base
                "
                placeholder="Email Address"
                name=""
                id="email"
              />
            </div>
            <div class="form__group mb-5">
              <label for="password" class="block mb-3">Password</label>
              <input
                v-model="password"
                type="password"
                class="
                  bg-white-fade
                  w-full
                  px-3
                  py-1
                  outline-0
                  text-black text-base
                "
                placeholder="Password"
                name=""
                id="password"
              />
            </div>
            <div class="form__group mb-4">
              <button
                type="submit"
                class="
                  bg-orange
                  w-full
                  py-1
                  rounded-xs
                  hover:bg-green
                  duration-200
                "
              >
                Log in
              </button>
            </div>
            <div class="link-register text-center text-sm">
              <router-link to="/register"
                >Haven't account? Register</router-link
              >
            </div>
          </div>
        </form>
      </div>
      <div class="container__right w-2/4 flex items-center">
        <img :src="require('@/assets/images/login.png')" alt="" class="h-5/6" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions } from "vuex";
import { authService } from "@/services/auth";
import { checkCookie } from "@/helpers/common";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    return {
      email,
      password,
    };
  },
  async beforeMount() {},

  methods: {
    ...mapActions("client", ["getProfile"]),
    async login() {
      try {
        const result = await authService.login(this.email, this.password);
        this.getProfile(result.data.profile);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>