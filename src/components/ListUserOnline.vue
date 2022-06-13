<template>
  <div class="users-online fade-in">
    <div class="users-online__wrapper p-6">
      <h1 class="text-blue-dark text-2xl mb-6 font-bold">
        Users Online
        <span class="text-xl align-middle">({{ listUserOnline.length }})</span>
      </h1>
      <div
        v-if="listUserOnline.length"
        class="user-online__list flex flex-wrap gap-4 columns-5"
      >
        <UserOnlineElement
          v-for="user in listUserOnline"
          :key="`user_online_element_key_${user.id}`"
          :user="user"
        />
      </div>
      <NoResult
        class="mt-[10%]"
        v-else
        message="Sorry, there is no user online now"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { userService } from "@/services/user";
import UserOnlineElement from "@/components/elements/UserOnlineElement.vue";
import NoResult from "@/components/NoResult.vue";

export default {
  name: "ListUserOnline",
  components: { UserOnlineElement, NoResult },
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
  mounted() {
    this.$socket.connect();
  },
};
</script>