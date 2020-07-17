<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li
        v-for="feature in features"
        :key="feature.id"
        :class="{selected : feature.selected}"
      >{{feature.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
interface Feature {
  id: number;
  name: string;
}

interface Select {
  selected: boolean;
}
type FeatureSelect = Feature & Select;

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  //属性将成为data中的数据
  features: FeatureSelect[] = [
    { id: 1, name: "asd", selected: false },
    { id: 2, name: "123123", selected: true }
  ];
}

// options-style 不推荐
// export default Vue.extend({
//   props: ['msg'],
//   mounted () {
//     this.msg;
//   },
// })
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.selected {
  background: #42b983;
}
a {
  color: #42b983;
}
</style>
