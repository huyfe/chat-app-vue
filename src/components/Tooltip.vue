<template>
  <div class="tooltip">
    <div class="tooltip-popper-arrow"></div>
    <div class="tooltip-template">
      <p>{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
  },
};
</script>
