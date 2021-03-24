<template>
  <div>
    <avatar round name="Smith, Bob" :size="24"></avatar>
    <span class="text-bold"> Bob Smith</span>
    <ul>
      <li>
        <router-link to="/home">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/anotherLink">Link</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Avatar from "@/components/Avatar.vue";

export default Vue.extend({
  name: "main-menu",
  components: {
    Avatar,
  },
});
</script>

<style lang="scss" scoped>
div {
  display: block;
}
a {
  color: green;
  text-decoration: none;
}
ul {
  list-style: none;
}
</style>