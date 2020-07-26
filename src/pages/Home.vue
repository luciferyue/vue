<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <button @click="addMoreArr">添加</button>
    <ul>
      <li v-for="c in list" :key="c">{{c}}</li>
    </ul>
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";
function addArr() {
  let arr = [];
  for (let i = 0; i < 99999; i++) {
    arr.push(i);
  }
  return arr;
}
function addArr2() {
  let arr = [];
  for (let i = 0; i < 100000; i++) {
    arr.push(i * 2);
  }
  return arr;
}
export default {
  name: "home",
  // components: {
  //   HelloWorld
  // }
  data() {
    return {
      list: addArr(),
    };
  },
  updated() {
    console.timeEnd("计时器1");
  },
  methods: {
    addMoreArr() {
      console.time("计时器1");
      this.$data.list = addArr2();
    },
  },
};
</script>

<style>
li {
  text-align: left;
}
</style>