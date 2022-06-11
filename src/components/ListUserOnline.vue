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
import { ref, onMounted, computed } from "vue";
import UserOnlineElement from "@/components/elements/UserOnlineElement.vue";
import { useStore } from "vuex";

export default {
  name: "ListUserOnline",
  components: { UserOnlineElement },
  setup() {
    const listUserOnline = ref([]);
    const store = useStore();
    const profile = computed(() => store.state.client.profile);
    const getListUserOnlineData = async () => {
      await userService.getListUserOnline().then((response) => {
        const idClient = profile.value.id;
        console.log("Id client: ", idClient);
        listUserOnline.value = response.data.filter(
          (user) => user.id !== idClient
        );
      });
    };
    onMounted(async () => {
      await getListUserOnlineData();
    });

    return { listUserOnline, profile, getListUserOnlineData };
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    usersOnline: function ({ usersOnlineListData, message }) {
      console.log(this.listUserOnline.length);
      console.log(usersOnlineListData.length);
      this.listUserOnline =
        usersOnlineListData.length &&
        usersOnlineListData.filter((user) => user.id !== this.profile.id);
      console.log(
        "List user online in component ListUsersOnline: ",
        usersOnlineListData
      );
    },
  },
};
</script>