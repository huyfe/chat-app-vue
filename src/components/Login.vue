<template>
  <div class="login w-full">
    <div class="container h-[100vh] flex mx-auto">
      <div class="container__left w-1/2 flex items-center">
        <form
          @submit.prevent="login"
          class="form max-w-[350px] w-full mx-auto fade-in"
        >
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
              <router-link class="hover:underline duration-200" to="/register"
                >Haven't account? Register</router-link
              >
            </div>
          </div>
        </form>
      </div>
      <div class="container__right w-1/2 flex items-center">
        <img
          :src="require('@/assets/images/login.png')"
          alt=""
          class="fade-in"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions } from "vuex";
import { authService } from "@/services/auth";
import { checkCookie } from "@/helpers/common";
// import { socket } from "@/helpers/socket";
import axios from "axios";

export default {
  name: "Login",
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
      let loader = this.$loading.show({ loader: "dots", color: "#f3ba4a" });

      try {
        const result = await authService.login(this.email, this.password);
        this.getProfile(result.data.profile);
        axios.defaults.headers.common["auth-token"] = result.data.profile.token;
        this.$socket.connect();
        this.$socket.emit("usersOnline", result.data.profile.id);
        this.$router.push("/");

        this.$notify({
          duration: 1000,
          type: "success",
          title: "Success",
          text: "Login successfully",
        });
      } catch (error) {
        console.log(error);
        this.$notify({
          type: "error",
          title: "Error",
          text: error.response ? error.response.data : "Something went wrong",
        });
      } finally {
        loader.hide();
      }
    },
  },
};
</script>