<template>
  <div>
    <H3>修改个人信息</H3>
    <div>
      姓名：
      <input type="text" v-model="info.name" />
    </div>
    <div>
      手机号：
      <input type="text" v-model="info.mobile" />
    </div>
    <br />
    <div>{{info.msg}}</div>
    <br />
    <div>
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { verify } from "../utils/verify";
interface InfoData {
  name: string;
  mobile: string;
  msg: "";
}

@Component
export default class About extends Vue {
  info: InfoData = {
    name: "",
    mobile: "",
    msg: ""
  };

  @verify
  submit(result: boolean) {
    result && alert("you can you up");
  }
}
</script>

<style>
</style>