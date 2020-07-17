<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <input type="text" @keyup.enter="addFeature" />
    </div>
    <ul>
      <li
        v-for="feature in features"
        :key="feature.id"
        :class="{selected : feature.selected}"
      >{{feature.name}}</li>
    </ul>
    <div>总数: {{total}}</div>
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
  features: FeatureSelect[] = [];

  addFeature(e: KeyboardEvent) {
    const inpt = e.target as HTMLInputElement; //类型断言
    const len: number = this.features.length;
    const data: FeatureSelect = {
      id: len + 1,
      name: inpt.value,
      selected: Boolean(this.features.length % 2)
    };

    this.features.push(data);

    inpt.value = "";
  }

  created() {
    // this.features = [
    //   { id: 1, name: "asd", selected: true },
    //   { id: 2, name: "123123", selected: false }
    // ];
  }

  async mounted() {
    const reuslt = await this.$http.get<FeatureSelect[]>("/api/list");
    console.log(reuslt);
    this.features = reuslt.data;
  }

  // 存储器作为计算属性
  get total() {
    return this.features.length;
  }
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
