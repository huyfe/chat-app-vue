<template>
  <div @click.prevent="joinRoom" class="user-online-element cursor-pointer">
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
  </div>
</template>

<script>
import { roomService } from "@/services/room";
export default {
  name: "UserOnlineElement",
  props: {
    user: {
      type: Object,
      required: true,
      default: null,
    },
  },
  methods: {
    async joinRoom() {
      const idFriend = this.user.id;
      try {
        const room = await roomService.findRoom(idFriend);
        if (room.data) {
          return this.$router.push(`/rooms/${room.data._id}`);
        }
      } catch (err) {
        try {
          const createRoom = await roomService.createRoom(idFriend);
          return this.$router.push(`/rooms/${createRoom.data._id}`);
        } catch (err) {}
      }
    },
  },
};
</script>