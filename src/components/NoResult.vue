<template>
  <div class="no-result mx-auto flex justify-center items-center">
    <div class="no-result__background flex flex-col items-center">
      <img
        :src="require('@/assets/images/no-result.svg')"
        alt=""
        class="max-w-[75px]"
      />
      <p class="mt-4 text-xl">{{ message }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: "Sorry, No result found :(",
    },
  },
};
</script>