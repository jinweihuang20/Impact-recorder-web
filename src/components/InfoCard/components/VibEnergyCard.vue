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
            ><div style="margin-top: 0; width: 100%; height: 170px">
              <!-- <chart :dataList="dataSet.chartData.trendDataList"></chart> -->
              <LineChart
                :styles="chartStyle"
                :chartData="chartData"
                :datasetIdKey="key + '-1'"
              ></LineChart></div
          ></b-col>
        </b-row>
      </div>
    </b-container>
  </b-card>
</template>

<script>
import chart from "../../Chart/TrendChart.vue";
import LineChart from "../../Chart/ReaactiveChart";
export default {
  components: { chart, LineChart },
  data() {
    return {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "X",
            borderColor: "rgb(39, 157, 255)",
            backgroundColor: "rgb(39, 157, 255)",
            data: [40, 39, 10, 40, 39, 80, 0],
            borderWidth: 1,
          },
          {
            label: "Y",
            borderColor: "rgb(66, 158, 100)",
            backgroundColor: "rgb(66, 158, 100)",
            data: [30, 2, 10, 40, 39, 8, 0],
            borderWidth: 1,
          },
          {
            label: "Z",
            borderColor: "rgb(248, 113, 113)",
            backgroundColor: "rgb(248, 113, 113)",
            data: [30, 2, 10, 40, 9, 80, 40],
            borderWidth: 1,
          },
        ],
      },
      key: 1,
      chartStyle: {
        backgroundColor: "black",
      },
    };
  },
  props: {
    dataSet: Object,
  },
  watch: {
    dataSet: {
      deep: true,
      handler: function (newData) {
        if (newData.chartData.trendDataList) {
          var ptLen = newData.chartData.trendDataList[0].length;
          if (this.chartData.labels.length != ptLen) {
            this.chartData.labels = [];
            for (let index = 0; index < ptLen; index++) {
              this.chartData.labels.push(index);
            }
          }

          for (
            let index = 0;
            index < newData.chartData.trendDataList.length;
            index++
          ) {
            this.chartData.datasets[index].data =
              newData.chartData.trendDataList[index];
          }
          this.key = Date.now();
        }
      },
    },
  },

  mounted() {
    // setInterval(() => {
    //   this.chartData.labels[0] = this.key + "";
    //   var rand = Math.random();
    //   this.chartData.datasets[0].data.push(rand * 100);
    //   this.chartData.datasets[0].data = this.chartData.datasets[0].data.slice(
    //     1,
    //     8
    //   );
    //   this.key += 10;
    // }, 1000);
  },
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