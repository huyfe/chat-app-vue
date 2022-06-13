<template>
  <div class="users-online-page w-full overflow-hidden">
    <ListUserOnline />
  </div>
</template>
<script>
import ListUserOnline from "@/components/ListUserOnline";
export default {
  components: { ListUserOnline },
};
</script>