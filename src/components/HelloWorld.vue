<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="showToast">点击toast</button>

    <div>
      <h2>天王盖地虎</h2>
      <button @click="$store.commit('add')">添加</button>
      {{$store.state.counter}}
      <button @click="$store.dispatch('minus')">减少</button>
    </div>
    <p>（总价）: {{$store.getters.total}}</p>
    <div v-for="c in list" :key="c">{{c}}</div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String
  },
  methods: {
    showToast() {
      console.log(this.$showToast);
      this.$showToast();
    }
  },
  data() {
    return {
      list: [1, 2]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
