<template>
  <div class="login w-full">
    <div class="container h-[100vh] flex">
      <div class="container__left w-2/5 flex items-center">
        <form @submit.prevent class="form px-20 w-full">
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
                type="email"
                class="
                  bg-white-fade
                  w-full
                  px-3
                  py-1
                  outline-0
                  rounded-xs
                  text-black text-base
                "
                placeholder="Email Address"
                name=""
                id=""
              />
            </div>
            <div class="form__group mb-5">
              <label for="password" class="block mb-3">Password</label>
              <input
                type="password"
                class="
                  bg-white-fade
                  w-full
                  px-3
                  py-1
                  outline-0
                  rounded-xs
                  text-black text-base
                "
                placeholder="Password"
                name=""
                id=""
              />
            </div>
            <div class="form__group">
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
          </div>
        </form>
      </div>
      <div class="container__right w-3/5">
        <img
          :src="require('@/assets/images/login.png')"
          alt=""
          class="h-full"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  beforeMount() {
    // this.getProfile();
    // console.log(this.profile);
  },
  methods: {
    ...mapActions("client", ["getProfile"]),
  },
};
</script>