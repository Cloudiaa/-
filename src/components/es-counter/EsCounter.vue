<template>
  <div class="counter-container">
    <button type="button" class="btn btn-light btn-sm" @click="onSubClick">
      -
    </button>
    <input
      type="number"
      class="form-control form-control-sm ipt-num"
      v-model.number.lazy="number"
    />
    <button type="button" class="btn btn-light btn-sm" @click="onaddClick">
      +
    </button>
  </div>
</template>

<script>
export default {
  name: "EsCounter",
  props: {
    num: {
      type: Number,
      defalut: 0,
    },
    min: {
      type: Number,
      defalut: NaN,
    },
  },
  data() {
    //   ???为什么props只读，这里的可以改
    return {
      number: this.num,
    };
  },
  emits: ["numChange"],
  watch: {
    number(newVal) {
      // parseInt转为整数
      const parseResult = parseInt(newVal);
      if (isNaN(parseResult) || parseResult < 1) {
        this.number = 1;
        return;
      }
      // 等于-1是什么意思？
      if (String(newVal).indexOf(".") !== -1) {
        this.number = parseResult;
        return;
      }
      //   console.log(this.number);
      this.$emit("numChange", this.number);
    },
  },
  methods: {
    onSubClick() {
      if (!isNaN(this.min) && this.number - 1 < this.min) return;
      this.number--;
    },
    onaddClick() {
      this.number++;
    },
  },
};
</script>

<style lang="less" scoped>
.counter-container {
  display: flex;
  .btn {
    width: 25px;
  }
  .ipt-num {
    width: 34px;
    text-align: center;
    margin: 0 4px;
  }
}
</style>