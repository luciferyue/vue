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
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
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
  // 装饰器：加括号说明prop是一个装饰器工厂，返回的才是装饰器，参数一般是对象
  // 以Prop为例，就是vue传递props选项
  @Prop({ type: String, required: true })
  private msg!: string; // 这行约束是给ts编译器的

  //属性将成为data中的数据
  features: FeatureSelect[] = [];

  @Emit() // 默认事件名称是方法名，返回值是参数
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

    // 告诉父，添加了一个Features
    // this.$emit("add-feature" );

    //相当于 this.$emit("add-feature" data);
    return data;
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
