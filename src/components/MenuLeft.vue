<template>
  <aside class="menu-left w-70">
    <!-- Start Main User Header -->
    <div
      class="
        user
        sticky
        top-0
        flex
        items-center
        pt-6
        pr-4
        pb-5
        pl-7
        bg-blue-light
        rounded-b
        min-h-[100px]
        mb-2
      "
    >
      <div
        class="
          user__avatar
          rounded-full
          min-w-[44px]
          h-[44px]
          overflow-hidden
          mr-3
        "
      >
        <img
          :src="profile.avatar || require('@/assets/images/messenger-1.png')"
          alt="user"
          class="object-cover w-full h-full"
        />
      </div>
      <div class="user__name overflow-hidden">
        <h3 class="font-semibold text-base overflow-hidden mr-6">
          {{ `${profile.name}` }}
        </h3>
        <div
          class="
            user__status
            w-fit
            min-h-[20px]
            flex
            items-center
            space-x-[8px]
            bg-blue-dark
            px-[7px]
            rounded-full
          "
        >
          <div class="w-[8px] h-[8px] rounded-full bg-orange"></div>
          <span class="text-white text-xs leading-none capitalize">{{
            profile.status || "Online"
          }}</span>
          <IconCaretDown />
        </div>
      </div>
      <div class="user__action self-start ml-auto">
        <IconAction />
      </div>
    </div>
    <!-- End Main User Header -->

    <!-- Start Messenger List -->
    <div
      class="
        messenger-list
        sticky
        top-[110px]
        h-[calc(100vh-195px)]
        overflow-y-scroll
        custom-scrollbar
        px-4
        py-5
        rounded-t
        bg-blue-light
      "
    >
      <router-link
        v-for="messenger in roomList"
        :key="`key_mess_${messenger.slug}`"
        :to="`/rooms/${messenger.slug}`"
        class="group group--messenger-item cursor-pointer"
      >
        <div
          class="
            messenger-item
            h-[75px]
            flex
            items-center
            p-3
            group-hover:bg-blue-dark group-hover:shadow-blue-dark
            rounded
            duration-100
          "
        >
          <div class="messenger-item__avatar mr-3 relative">
            <img
              :src="messenger.avatar || require('@/assets/images/avatar.png')"
              alt="user"
              class="rounded-full min-w-[44px] h-[44px] object-cover"
            />
            <IconOffline
              v-if="messenger.status === messengerStatus.OFFLINE"
              class="absolute top-0 right-0"
            />
            <IconOnline
              v-else-if="messenger.status === messengerStatus.ONLINE"
              class="absolute top-0 right-0"
            />
            <IconWorking
              v-else-if="messenger.status === messengerStatus.WORKING"
              class="absolute top-0 right-0"
            />
            <IconWorking v-else class="absolute top-0 right-0" />
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
              <span>{{ messenger.fullName || "Firstname Lastname" }}</span>
              <span
                class="
                  font-normal
                  text-xs text-grayer
                  group-hover:text-white
                  duration-100
                "
                >{{ formatDate(messenger.lastTime) || "17/06/2020" }}</span
              >
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
                {{ messenger.lastText || "Last text" }}
              </p>
              <div
                class="
                  w-1/3
                  messenger-item__action
                  text-right
                  flex
                  items-center
                  invisible
                  group-hover:visible
                  duration-100
                "
              >
                <IconActionMessenger class="ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <!-- End Messenger List -->

    <!-- Start Sticky Menu -->
    <div
      class="
        menu
        sticky
        top-[calc(100vh-85px)]
        h-[85px]
        bg-blue-light
        pt-5
        px-7
        border-t border-gray
      "
    >
      <ul class="h-full flex justify-between">
        <li class="flex-1">
          <router-link to="/messenger/" class="block h-full menu-item"
            ><IconPersonal class="mx-auto" />
            {{ $route.query.messenger }}
          </router-link>
        </li>
        <li class="flex-1">
          <router-link to="/groups/" class="block h-full menu-item"
            ><IconGroups class="mx-auto"
          /></router-link>
        </li>
        <li class="flex-1">
          <router-link to="/stared/" class="block h-full menu-item"
            ><IconStar class="mx-auto"
          /></router-link>
        </li>
        <li class="flex-1">
          <router-link to="/search/" class="block h-full menu-item"
            ><IconLookup class="mx-auto"
          /></router-link>
        </li>
      </ul>
    </div>
    <!-- End Sticky Menu -->
  </aside>
</template>
<script>
// Import Icons
import IconCaretDown from "./icons/IconCaretDown.vue";
import IconAction from "./icons/IconAction.vue";
import IconOnline from "./icons/IconOnline.vue";
import IconOffline from "./icons/IconOffline.vue";
import IconWorking from "./icons/IconWorking.vue";
import IconActionMessenger from "./icons/IconActionMessenger.vue";
import IconPersonal from "./icons/IconPersonal.vue";
import IconGroups from "./icons/IconGroups.vue";
import IconStar from "./icons/IconStar.vue";
import IconLookup from "./icons/IconLookup.vue";

// Import constant
import MessengerStatus from "../const/MessengerStatus";

import { mapGetters } from "vuex";

import { userService } from "@/services/user";
import { roomService } from "@/services/room";
import moment from "moment";

export default {
  components: {
    IconCaretDown,
    IconAction,
    IconOnline,
    IconOffline,
    IconWorking,
    IconActionMessenger,
    IconPersonal,
    IconGroups,
    IconStar,
    IconLookup,
  },
  data() {
    return {
      messengerList: [
        {
          id: 0,
          fullName: "Phillip Torff",
          slug: "phillip-torff",
          gender: "male",
          lastTime: "17/06/2020",
          lastMessage: "Thank you Phillip!",
          status: "offline",
          avatar: require("@/assets/images/messenger-1.png"),
          avatarColor: "",
        },
        {
          id: 1,
          fullName: "Alfredo Vetrovs",
          slug: "alfredo-vetrovs",
          gender: "male",
          lastTime: "18/06/2020",
          lastMessage: "OMW bro...!",
          status: "online",
          avatar: require("@/assets/images/messenger-2.png"),
          avatarColor: "",
        },
        {
          id: 2,
          fullName: "Kierra Press",
          slug: "kierra-press",
          gender: "female",
          lastTime: "19/06/2020",
          lastMessage: "Did you see the new movie of",
          status: "working",
          avatar: require("@/assets/images/messenger-3.png"),
          avatarColor: "",
        },
        {
          id: 3,
          fullName: "Jocelyn Donin",
          slug: "jocelyn-donin",
          gender: "female",
          lastTime: "20/06/2020",
          lastMessage: "Our new project will be awesome",
          status: "working",
          avatar: require("@/assets/images/messenger-4.png"),
          avatarColor: "",
        },
        {
          id: 4,
          fullName: "Davis Dorwart",
          slug: "davis-dorwart",
          gender: "male",
          lastTime: "17/06/2020",
          lastMessage: "Davis please call me when you",
          status: "online",
          avatar: require("@/assets/images/messenger-5.png"),
          avatarColor: "",
        },
        {
          id: 5,
          fullName: "Rayna Bator",
          slug: "rayna-bator",
          gender: "female",
          lastTime: "17/06/2020",
          lastMessage: "I did it yesterday.",
          status: "working",
          avatar: require("@/assets/images/messenger-6.png"),
          avatarColor: "",
        },
        {
          id: 6,
          fullName: "James Kenter",
          slug: "james-kenter",
          gender: "male",
          lastTime: "17/06/2020",
          lastMessage: "No way :)",
          status: "online",
          avatar: require("@/assets/images/messenger-7.png"),
          avatarColor: "",
        },
        {
          id: 7,
          fullName: "Jaylon Botosh",
          slug: "jaylon-botosh",
          gender: "male",
          lastTime: "17/06/2020",
          lastMessage: "I’ll send you the files today.",
          status: "online",
          avatar: require("@/assets/images/messenger-8.png"),
          avatarColor: "",
        },
        {
          id: 8,
          fullName: "Livia Herwitz",
          slug: "livia-herwitz",
          gender: "female",
          lastTime: "17/06/2020",
          lastMessage: "Hi. I’m in a meeting now.",
          status: "offline",
          avatar: require("@/assets/images/messenger-9.png"),
          avatarColor: "",
        },
      ],
      roomList: [],
    };
  },
  computed: {
    messengerStatus() {
      return MessengerStatus;
    },
    ...mapGetters("client", {
      profile: "clientProfile",
    }),
    moment() {
      return moment;
    },
  },
  async mounted() {
    // await userService
    //   .getAll()
    //   .then((response) => {
    //     this.messengerList = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    await roomService
      .getRoomList()
      .then((response) => {
        const isSuccess = response.data;
        if (!isSuccess) {
          throw new Error("Something went wrong");
        }
        this.roomList = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },
};
</script>
