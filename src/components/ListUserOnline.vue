<template>
  <div class="users-online fade-in">
    <div class="users-online__wrapper p-6">
      <h1 class="text-blue-dark text-2xl mb-6 font-bold">Users Online</h1>
      <div class="user-online__list flex flex-wrap gap-4 columns-5">
        <UserOnlineElement
          v-for="user in listUserOnline"
          :key="`user_online_element_key_${user.id}`"
          :user="user"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { userService } from "@/services/user";
import { ref, onMounted } from "vue";
import UserOnlineElement from "@/components/elements/UserOnlineElement.vue";
export default {
  name: "ListUserOnline",
  components: { UserOnlineElement },
  setup() {
    const listUserOnline = ref([]);
    const getListUserOnlineData = async () => {
      await userService.getListUserOnline().then((response) => {
        listUserOnline.value = response.data;
      });
    };
    onMounted(async () => {
      await getListUserOnlineData();
    });

    return { listUserOnline, getListUserOnlineData };
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    usersOnline: function (data) {
      // console.log("List user online: ", data);
      this.listUserOnline = data;
      console.log("List user online in component ListUsersOnline: ", data);
    },
    disconnect: function (data) {
      this.listUserOnline = data;
      console.log("List user online in component ListUsersOnline: ", data);
    },
  },
  mounted() {
    this.$socket.connect();
  },
};
</script>