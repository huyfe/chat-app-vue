<template>
  <div
    class="
      chat-box
      w-[calc(100%
      -
      320px
      -350px)]
      flex flex-col
      justify-end
      p-6
      pt-0
    "
  >
    <!-- Start chat box message list -->
    <div class="chat-box__head -ml-6 shadow-md px-6">
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
            :src="friend.avatar"
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
            <!-- <span>{{ friend.firstName + " " + friend.lastName }}</span> -->
            <span>{{ $route.params.name }}</span>
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
        <span class="block py-1 px-5 bg-blue-dark rounded text-sm text-white"
          >17/06/2020</span
        >
      </div>
      <!-- End chat box date -->
      <div
        v-for="(item, index) in chatBox"
        :key="`key_chat_box_${index}`"
        class="chat-box__item"
        :class="
          profile.id !== item.id ? 'chat-box__item--you' : 'chat-box__item--me'
        "
      >
        <div class="chat-box__item__name">
          {{ `${item.firstName} ${item.lastName}` }}
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
              <p class="chat-box__item__time">{{ message.time }}</p>
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
</template>

<script>
import { mapGetters } from "vuex";
import { ref } from "vue";
import MessengerStatus from "../const/MessengerStatus";
import IconOnline from "./icons/IconOnline.vue";
import IconOffline from "./icons/IconOffline.vue";
import IconWorking from "./icons/IconWorking.vue";
import IconSend from "./icons/IconSend.vue";
import IconAttachment from "./icons/IconAttachment.vue";
import IconVoice from "./icons/IconVoice.vue";
export default {
  components: {
    IconOnline,
    IconOffline,
    IconWorking,
    IconSend,
    IconAttachment,
    IconVoice,
  },
  setup() {
    const chatBox = ref([
      {
        id: "you123",
        avatar: require("@/assets/images/messenger-1.png"),
        firstName: "Phillip",
        lastName: "Torff",
        messages: [
          {
            text: "Hello m8!",
            time: "15:02",
            isReplay: false,
          },
          {
            text: "I have send the files back to ya it only took me about 60 mins this time was with testing too.",
            time: "15:03",
            isReplay: true,
          },
        ],
      },
      {
        id: "me123",
        avatar: require("@/assets/images/user.png"),
        firstName: "Mehmet",
        lastName: "Revnaki",
        messages: [
          {
            text: "Thank you Phillip!",
            time: "15:07",
            isReplay: false,
          },
        ],
      },
      {
        id: "you123",
        avatar: require("@/assets/images/messenger-1.png"),
        firstName: "Phillip",
        lastName: "Torff",
        messages: [
          {
            text: "Hello m8!",
            time: "15:02",
            isReplay: false,
          },
          {
            text: "I have send the files back to ya it only took me about 60 mins this time was with testing too.",
            time: "15:03",
            isReplay: true,
          },
        ],
      },
      {
        id: "you123",
        avatar: require("@/assets/images/messenger-1.png"),
        firstName: "Phillip",
        lastName: "Torff",
        messages: [
          {
            text: "Hello m8!",
            time: "15:02",
            isReplay: false,
          },
          {
            text: "I have send the files back to ya it only took me about 60 mins this time was with testing too.",
            time: "15:03",
            isReplay: true,
          },
        ],
      },
    ]);
    const friend = ref({
      id: 0,
      firstName: "Phillip",
      lastName: "Torff",
      slug: "phillip-torff",
      gender: "male",
      offlineAt: new Date() || "",
      lastMessage: "Thank you Phillip!",
      status: "offline",
      avatar: require("@/assets/images/messenger-1.png"),
      avatarColor: "",
    });
    return { chatBox, friend };
  },
  computed: {
    messengerStatus() {
      return MessengerStatus;
    },
    ...mapGetters("client", {
      profile: "clientProfile",
    }),
  },
  mounted() {
    console.log(this.chatBox);
  },
};
</script>