<template>
  <div class="user-online-element">
    <router-link :to="`/rooms/${user.id}`">
      <div class="user-online-element__template">
        <div class="user-online-element__avatar">
          <img
            :src="user.avatar || require('@/assets/images/avatar.png')"
            alt=""
          />
        </div>
        <div class="user-online-element__infor">
          <h3 class="user-online-element__fullname">{{ user.fullName }}</h3>
          <p class="user-online-element__status">{{ user.status }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "UserOnlineElement",
  props: {
    user: {
      type: Object,
      required: true,
      default: null,
    },
  },
};
</script>