<template>
  <div class="message" v-show="show">
    <div class="cont">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: "toast",
  props: {
    text: {
      type: String,
      default: "你猜"
    },
    show: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      isShow: false
    };
  }
};
</script>

<style scoped>
.message {
  position: fixed;
  width: 300px;
  height: 40px;
  line-height: 40px;
  font-size: 36px;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -20px;
  text-align: center;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  color: #fff;
}
</style>