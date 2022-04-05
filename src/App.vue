<template>
  <div class="app-container">
    <es-header title="购物车案例"></es-header>
    <es-goods
      v-for="item in goodslist"
      :key="item.id"
      :id="item.id"
      :thumb="item.goods_img"
      :title="item.goods_name"
      :price="item.goods_price"
      :count="item.goods_count"
      :checked="item.goods_state"
      @stateChange="onGoodsStateChange"
      @countChange="onGoodsCountChange"
    ></es-goods>
    <es-footer :amount="amount" :total="total" @fullChange="onFullStateChange"
      >esfooter 组件</es-footer
    >
  </div>
</template>

<script>
import EsHeader from "./components/es-header/EsHeader.vue";
import EsFooter from "./components/es-footer/EsFooter.vue";
import EsGoods from "./components/es-goods/EsGoods.vue";
export default {
  name: "MyApp",
  data() {
    return {
      goodslist: [],
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // async和await是来简化**的（不懂）
    async getGoodsList() {
      // 通过组件实例 this 访问到全局挂载的 $http 属性，并发起Ajax数据请求
      const { data: res } = await this.$http.get("/api/cart");
      if (res.status !== 200) return alert("数据请求失败");
      this.goodslist = res.list;
    },
    // 监听选中状态变化的事件???
    onFullStateChange(isFull) {
      // console.log(isFull);
      this.goodslist.forEach((x) => (x.goods_state = isFull));
    },
    // 监听商品选中状态变化的事件
    onGoodsStateChange(e) {
      // 根据id进行查找，？？？语法不懂
      const findResult = this.goodslist.find((x) => x.id === e.id);
      if (findResult) {
        findResult.goods_state = e.value;
      }
    },
    // 监听商品数量变化的事件
    onGoodsCountChange(e) {
      const findResult = this.goodslist.find((x) => x.id === e.id);
      if (findResult) {
        findResult.goods_count = e.value;
      }
    },
  },
  computed: {
    amount() {
      let a = 0;
      this.goodslist
        // 语法不懂
        .filter((x) => x.goods_state)
        .forEach((x) => {
          a += x.goods_price * x.goods_count;
        });
      return a;
    },
    total() {
      let t = 0;
      this.goodslist
        .filter((x) => x.goods_state)
        .forEach((x) => {
          t += x.goods_count;
        });
      return t;
    },
  },
  components: {
    EsHeader,
    EsFooter,
    EsGoods,
  },
};
</script>

<style lang='less' scoped>
.app-container {
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>