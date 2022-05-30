<template>
  <MenuLeft />

  <div class="chat-box w-1/2 flex flex-col justify-end p-6 pt-0">
    <!-- Start chat box message list -->
    <div class="chat-box__head mb-auto -ml-6 shadow-md px-6">
      <div
        class="
          friend
          h-[60px]
          flex
          items-center
          p-1
          pl-0
          group-hover:bg-blue-dark group-hover:shadow-blue-dark
          rounded
          duration-100
        "
      >
        <div class="messenger-item__avatar mr-3 relative">
          <img
            :src="friend.avatar || require('@/assets/images/avatar.png')"
            alt="user"
            class="rounded-full min-w-[44px] h-[44px] object-cover"
          />
          <IconOffline
            v-if="friend.status === messengerStatus.OFFLINE"
            class="absolute top-0 right-0"
          />
          <IconOnline
            v-if="friend.status === messengerStatus.ONLINE"
            class="absolute top-0 right-0"
          />
          <IconWorking
            v-if="friend.status === messengerStatus.WORKING"
            class="absolute top-0 right-0"
          />
        </div>
        <div class="messenger-item__name w-full overflow-hidden">
          <h3
            class="
              font-semibold
              text-sm text-dark
              group-hover:text-white
              flex
              justify-between
              mb-[3px]
              duration-100
            "
          >
            <span>{{ friend.fullName }}</span>
          </h3>
          <div class="flex">
            <p
              class="
                w-2/3
                text-grayer
                group-hover:text-white
                font-light
                text-xs
                truncate
                duration-100
              "
            >
              {{ friend.offlineAt || "Đang hoạt động" }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Start chat box list message -->
    <div class="chat-box__list overflow-auto pr-6">
      <!-- Start chat box date -->
      <div class="chat-box-date flex justify-center mb-7 mt-4">
        <span class="block py-1 px-5 bg-blue-dark rounded text-sm text-white">{{
          firstMessageDate || "First Date"
        }}</span>
      </div>
      <!-- End chat box date -->
      <div
        v-for="(item, index) in room.messagesData"
        :key="`key_chat_box_${index}`"
        class="chat-box__item"
        :class="
          profile.id !== item.idUser
            ? 'chat-box__item--you'
            : 'chat-box__item--me'
        "
      >
        <div class="chat-box__item__name">
          <!-- {{ `${item.firstName} ${item.lastName}` }} -->
          {{
            room.members.find((member) => member.idMember === item.idUser)
              .fullName
          }}
        </div>
        <div class="chat-box__item__avatar-messages">
          <div class="chat-box__item__avatar">
            <img
              :src="item.avatar || require('@/assets/images/user.png')"
              alt="Avatar"
              title="Avatar"
            />
          </div>
          <div class="chat-box__item__messages">
            <div
              v-for="(message, messageIndex) in item.messages"
              :key="`key_chat_box_message_${messageIndex}`"
              class="chat-box__item__message"
            >
              <p class="chat-box__item__text break-word">{{ message.text }}</p>
              <p class="chat-box__item__time">
                {{ formatDateToTime(message.time, "h:mm") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End chat box message list -->

    <!-- Start chat box controls -->
    <div class="chat-box__controls mt-8">
      <div>
        <form @submit.prevent class="relative">
          <div
            class="
              chat-box__controls__list
              h-full
              absolute
              top-0
              left-[25px]
              flex
              items-center
            "
          >
            <IconAttachment class="mr-4" />
            <IconVoice />
          </div>
          <input
            class="
              block
              w-full
              py-2
              pl-19
              pr-[150px]
              border border-blue-fade
              outline-0
              rounded
              bg-white-fade
              focus:border-blue-dark
              text-sm text-grayer
              placeholder:text-grayer
              mr-5
            "
            placeholder="Type a new message..."
          />
          <button
            type="submit"
            class="
              h-full
              w-[108px]
              absolute
              top-0
              right-0
              bg-blue-dark
              text-white-fade text-sm
              hover:bg-orange
              rounded
              flex
              items-center
              justify-center
              duration-200
            "
          >
            Send <IconSend class="ml-3" />
          </button>
        </form>
      </div>
    </div>
    <!-- End chat box controls -->
  </div>
  <aside class="aside-right flex-1 px-[15px]">
    <button
      class="
        w-[108px]
        h-[40px]
        bg-blue-dark
        text-white-fade text-sm
        hover:bg-orange
        rounded
        flex
        items-center
        justify-center
        duration-200
        mt-[10px]
        ml-auto
      "
      @click.prevent="logout()"
    >
      Log out
    </button>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";
import { ref, reactive, onMounted, watch, computed } from "vue";
import MessengerStatus from "../const/MessengerStatus";
import IconOnline from "./icons/IconOnline.vue";
import IconOffline from "./icons/IconOffline.vue";
import IconWorking from "./icons/IconWorking.vue";
import IconSend from "./icons/IconSend.vue";
import IconAttachment from "./icons/IconAttachment.vue";
import IconVoice from "./icons/IconVoice.vue";
import MenuLeft from "./MenuLeft.vue";
import { userService } from "@/services/user";
import { room } from "@/fakeRoom";
import { deleteCookie } from "@/helpers/common";
import { roomService } from "@/services/room";
import { useRoute } from "vue-router";
import moment from "moment";
import { useStore } from "vuex";

export default {
  components: {
    IconOnline,
    IconOffline,
    IconWorking,
    IconSend,
    IconAttachment,
    IconVoice,
    MenuLeft,
  },
  setup() {
    // const chatBox = ref(room);
    const route = useRoute();
    const room = ref({});
    const friend = ref({});
    const store = useStore();
    const firstMessageDate = ref("");

    const getRoomDetailDataByID = async (id) => {
      await roomService.detail(id).then((response) => {
        room.value = response.data;
        friend.value = response.data.members.find(
          (member) => member.idMember !== store.state.client.profile.id
        );
        firstMessageDate.value = formatDateToTime(
          response.data.messagesData[0].messages[0].time,
          "DD/MM/YYYY"
        );
      });
    };

    const formatDateToTime = (date, format) => {
      return moment(date).format(format);
    };

    watch(route.params.id, () => {
      getRoomDetailDataByID(route.params.id);
    });

    onMounted(async () => {
      await getRoomDetailDataByID(route.params.id);
    });

    return { room, friend, firstMessageDate, formatDateToTime };
  },
  computed: {
    messengerStatus() {
      return MessengerStatus;
    },
    ...mapGetters("client", {
      profile: "clientProfile",
    }),
  },
  methods: {
    logout() {
      deleteCookie("token");
      this.$router.push("/login");
    },
  },
};
</script>