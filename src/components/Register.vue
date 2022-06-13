<template>
  <div class="login w-full">
    <div class="container h-[100vh] flex mx-auto">
      <div class="container__left w-1/2 flex items-center">
        <form
          @submit.prevent="submit"
          class="form max-w-[400px] w-full mx-auto fade-in"
        >
          <div
            class="
              form__wrapper
              h-[55vh]
              bg-blue-dark
              rounded-lg
              shadow-lg
              pt-4
              px-6
              text-white
            "
          >
            <legend class="text-white text-xl font-bold text-center mb-4">
              Register
            </legend>
            <div class="form__group flex gap-3 mb-4">
              <input
                type="text"
                class="
                  bg-white-fade
                  w-full
                  px-3
                  py-1
                  outline-0
                  text-black text-base
                "
                v-model="fullName"
                placeholder="Full Name"
                name=""
                id=""
                autocomplete="off"
              />
            </div>
            <div class="form__group mb-4">
              <input
                v-model="email"
                type="email"
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
                id=""
                autocomplete="off"
              />
            </div>
            <div class="form__group mb-4">
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
                id=""
                autocomplete="off"
              />
            </div>
            <div class="form__group mb-5">
              <input
                v-model="confirmPassword"
                type="password"
                class="
                  bg-white-fade
                  w-full
                  px-3
                  py-1
                  outline-0
                  text-black text-base
                "
                placeholder="Confirm Password"
                name=""
                id=""
                autocomplete="off"
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
                Register
              </button>
            </div>
            <div
              class="
                link-register
                text-center text-sm
                hover:underline
                duration-200
              "
            >
              <router-link to="/login">Have account? Login</router-link>
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
import { mapActions } from "vuex";
import { authService } from "@/services/auth";
export default {
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  beforeMount() {
    // this.getProfile();
    // console.log(this.profile);
  },
  methods: {
    ...mapActions("client", ["getProfile"]),
    async submit() {
      let loader = this.$loading.show({ loader: "dots", color: "#f3ba4a" });
      const user = {
        name: this.fullName,
        email: this.email,
        password: this.password,
      };
      try {
        const result = await authService.register(user);
        console.log(result);
        this.$notify({
          type: "success",
          title: "Register successfully",
          text: "Please login again with email and password you have registered",
          duration: 1000,
        });
        this.$router.push("/login");
      } catch (e) {
        this.$notify({
          type: "error",
          title: "Register failed",
          text: e.response.data,
          duration: 1500,
        });
      } finally {
        loader.hide();
      }
    },
  },
};
</script>