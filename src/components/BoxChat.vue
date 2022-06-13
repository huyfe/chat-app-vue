<template >
  <div class="chat-box h-full flex flex-col justify-end p-6 pt-0 fade-in">
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
    <div
      class="
        chat-box__list
        overflow-auto
        pr-6
        h-[calc(100%-60px)]
        custom-scrollbar
      "
    >
      <!-- Start chat box date -->
      <div class="chat-box-date flex justify-center mb-7 mt-4">
        <span class="block py-1 px-5 bg-blue-dark rounded text-sm text-white">{{
          firstMessageDate || "First Date"
        }}</span>
      </div>
      <!-- End chat box date -->
      <template v-if="room.messagesData && room.messagesData.length">
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
                <p class="chat-box__item__text break-word">
                  {{ message.text }}
                </p>
                <p class="chat-box__item__time position-relative">
                  <Tooltip
                    :title="
                      formatDateToTime(message.time, 'DD/MM/YYYY h:mm:ss')
                    "
                  />
                  <span>{{ formatDateToTime(message.time, "h:mm") }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- End chat box message list -->

    <!-- Start chat box controls -->
    <div class="chat-box__controls mt-8">
      <div>
        <form @submit.prevent="sendMessage" class="relative">
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
            v-model="textMessage"
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

  <aside class="aside-right flex-1 px-[15px]"></aside>
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
import { roomService } from "@/services/room";
import { useRoute } from "vue-router";
import moment from "moment";
import { useStore } from "vuex";
import Tooltip from "./Tooltip.vue";
import { useLoading } from "vue3-loading-overlay";

export default {
  name: "BoxChat",
  components: {
    IconOnline,
    IconOffline,
    IconWorking,
    IconSend,
    IconAttachment,
    IconVoice,
    MenuLeft,
    Tooltip,
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
      if (this.$route.params.id && this.profile.id) {
        this.joinRoom(this.profile.id, this.$route.params.id);
      }
    },
  },
  setup() {
    // const chatBox = ref(room);
    const route = useRoute();
    const room = ref({});
    const friend = ref({});
    const store = useStore();
    const firstMessageDate = ref("");
    const textMessage = ref("");
    let loader = useLoading();
    const getRoomDetailDataByID = async (id) => {
      await roomService
        .detail(id)
        .then((response) => {
          room.value = response.data;
          friend.value = response.data.members.find(
            (member) => member.idMember !== store.state.client.profile.id
          );
          if (response.data.messagesData.length > 0) {
            firstMessageDate.value = formatDateToTime(
              response.data.messagesData[0].messages[0].time,
              "DD/MM/YYYY"
            );
          }
        })
        .finally(() => {});
    };

    const formatDateToTime = (date, format) => {
      return moment(date).format(format);
    };

    watch(route.params.id, () => {
      console.log("RUN WATCH");
      getRoomDetailDataByID(route.params.id);
    });

    onMounted(async () => {
      loader.show({ loader: "dots", color: "#f3ba4a" });
      await getRoomDetailDataByID(route.params.id);
      setTimeout(() => {
        const chatBoxListElement = document.querySelector(".chat-box__list");
        chatBoxListElement.scrollTop = chatBoxListElement.scrollHeight;
        loader.hide();
      }, 0);
    });

    return {
      room,
      friend,
      firstMessageDate,
      textMessage,
      getRoomDetailDataByID,
      formatDateToTime,
    };
  },
  computed: {
    messengerStatus() {
      return MessengerStatus;
    },
    ...mapGetters("client", {
      profile: "clientProfile",
    }),
  },

  watch: {
    "$route.params.id": {
      handler: async function (to, from) {
        console.log("From: ", from);
        console.log("To: ", to);
        if (from !== undefined) {
          console.log("Khác undefined");
          this.leaveRoom(this.profile.id, from);
        }
        if (from && to) {
          let loader = this.$loading.show({ loader: "dots", color: "#f3ba4a" });
          await this.getRoomDetailDataByID(to);
          this.joinRoom(this.profile.id, this.$route.params.id);
          this.scrollToBottomChatBox();
          loader.hide();
        }
      },
      deep: true,
      immediate: true,
    },
    profile: {
      handler: async function (profile) {
        if (profile && this.$route.params.id) {
          let loader = this.$loading.show({ loader: "dots", color: "#f3ba4a" });
          this.leaveRoom(this.profile.id, this.$route.params.id);
          await this.getRoomDetailDataByID(this.$route.params.id);
          this.joinRoom(this.profile.id, this.$route.params.id);
          loader.hide();
        }
      },
    },
  },

  async mounted() {
    if (this.profile) {
      console.log("Mounted");
      this.joinRoom(this.profile.id, this.$route.params.id);
    }
    this.sockets.subscribe("room", function ({ message }) {
      // console.log(data);
      this.$notify({
        type: "success",
        title: "Socket Notification",
        text: message,
      });
    });

    this.subScribeMessageSocket();
  },

  methods: {
    async sendMessage() {
      // Send text to server
      try {
        const result = await roomService.postMessage(
          this.room._id,
          this.textMessage
        );
        if (!result) {
          throw new Error("Something went wrong");
        }
        this.room.messagesData = result.data;
        this.emitMessage(this.room.messagesData);
      } catch (error) {
        this.$notify({
          type: "error",
          title: "Error",
          text: error.response ? error.response.data : "Something went wrong",
        });
      }

      // Scroll to bottom every messages was pushed
      this.scrollToBottomChatBox();
      this.textMessage = "";
    },
    scrollToBottomChatBox() {
      setTimeout(() => {
        const chatBoxListElement = document.querySelector(".chat-box__list");
        if (chatBoxListElement !== null) {
          chatBoxListElement.scrollTop = chatBoxListElement.scrollHeight;
        }
      }, 0);
    },
    joinRoom(idUser, room) {
      this.$socket.emit("joinRoom", { idUser, room });
      console.log("Myself joined", idUser, room);
    },
    leaveRoom(idUser, room) {
      this.$socket.emit("leaveRoom", { idUser, room });
    },
    emitMessage(data) {
      this.$socket.emit("chatMessage", data);
    },
    subScribeMessageSocket() {
      this.sockets.subscribe("message", function ({ message, idRoom }) {
        // this.room.messagesData = message;
        console.log("Current room: ", this.$route.params.id);
        if (idRoom === this.$route.params.id) {
          console.log("Khớp");
          this.room.messagesData = message;
        }
        this.scrollToBottomChatBox();
      });
    },
  },
};
</script>