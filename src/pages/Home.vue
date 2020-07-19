<template>
  <div class="home">
    <!-- <HelloWorld @add-feature="addFeature" msg="Welcome to Your Vue.js App" /> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>

<style>
</style>