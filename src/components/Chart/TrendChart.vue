<template>
  <div class="trendChart">
    <div class="chart-container">
      <trend
        :height="50"
        :width="400"
        :data="dataList[0]"
        auto-draw
        autoDrawEasing="none"
        :gradient="['#FFFFFF']"
        :max="0.01"
      ></trend>
    </div>
    <div class="chart-container">
      <trend
        :height="50"
        :width="400"
        :data="dataList[1]"
        auto-draw
        autoDrawEasing="none"
        :gradient="['#FFFFFF']"
        :max="0.01"
      ></trend>
    </div>
    <div class="chart-container">
      <trend
        :height="50"
        :width="400"
        :data="dataList[2]"
        auto-draw
        autoDrawEasing="none"
        :gradient="['#FFFFFF']"
        :max="0.01"
      ></trend>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataSet: [
        0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 5, 10, 3, 5, 0, 0, 5, 10, 3, 5, 0, 0,
        5, 10, 3, 5, 0, 0, 8, 2, 9, 0,
      ],
    };
  },
  props: {
    dataList: {
      type: Array,
      default() {
        return [
          [1, 2],
          [1, 2],
          [1, 0],
        ];
      },
    },
  },
  mounted() {
    setInterval(() => {
      this.dataSet.splice(0, 1);
      this.dataSet.push(Math.random());
    }, 500);
  },
};
</script>

<style>
.chart-container {
  background-color: rgb(34, 34, 34);
  margin-bottom: 11px;
}

.trendChart {
}
</style>