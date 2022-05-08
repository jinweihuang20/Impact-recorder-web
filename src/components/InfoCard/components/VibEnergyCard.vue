<template>
  <b-card class="info-card-sub-card" bg-variant="dark">
    <h4>振動能量趨勢</h4>
    <b-container style="width: 100%; margin: auto 12px; padding: 0" fluid>
      <div>
        <b-row>
          <b-col cols="2">
            <b-row>X軸 </b-row>
            <b-row>
              <div class="value-col">
                {{ dataSet.vibEngX.toFixed(3) }}
              </div>
            </b-row>
            <b-row>Y軸 </b-row>
            <b-row>
              <div class="value-col">
                {{ dataSet.vibEngX.toFixed(3) }}
              </div></b-row
            >
            <b-row>Z軸 </b-row>
            <b-row>
              <div class="value-col">
                {{ dataSet.vibEngX.toFixed(3) }}
              </div>
            </b-row>
          </b-col>
          <b-col class="text-left" cols="10"
            ><div style="margin-top: 8px; width: 100%; height: 170px">
              <chart :dataList="dataSet.chartData.trendDataList"></chart></div
          ></b-col>
        </b-row>
      </div>
    </b-container>
  </b-card>
</template>

<script>
import chart from "../../Chart/lineChartJs.vue";
export default {
  components: { chart },
  data() {
    return {
      options: {
        chart: {
          type: "line",
          animations: {
            enabled: false,
            animateGradually: {
              enabled: false,
            },
            dynamicAnimation: {
              enabled: false,
            },
          },
          background: "rgb(51,51,51)",
          foreColor: "#fff",
        },
        title: {
          text: "Energy",
          align: "left",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#fff",
          },
        },
        xaxis: {
          categories: [],
          title: {
            text: "",
          },
          /**X軸Tick顯示的點數(label數量) */
          tickAmount: 4,
        },
        yaxis: {
          labels: {
            formatter: (value) => {
              return value.toFixed(2);
            },
          },
          title: {
            text: "",
          },
          max: 1,
          min: 0,
        },
        stroke: {
          show: true,
          curve: "straight",
          lineCap: "square",
          colors: undefined,
          width: 2,
          dashArray: 0,
        },
      },
      series: [
        { name: "X", data: [1, 2, 3, 2, 23, 1, 33] },
        { name: "Y", data: [1, 23, 3, 2, 23, 1, 2] },
        { name: "Z", data: [12, 32, 3, 2, 23, 1, 33] },
      ],
    };
  },
  props: {
    dataSet: Object,
  },

  mounted() {},
};
</script>

<style>
.value-col {
  background-color: rgb(21, 21, 21);
  width: 100%;
  border: grey 1px solid;
  margin-bottom: 8px;
  padding: 2px;
  border-radius: 6px;
}
</style>