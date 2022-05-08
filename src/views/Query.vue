<template>
  <div
    class="query-page page"
    v-loading="isLoading"
    element-loading-text="數據查詢中...請稍後"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <b-row class="mt-3">
      <b-col lg="3" class="text-left w-100">
        <condition-selector
          @onQueryButtonClick="QueryBtnClickHandler"
        ></condition-selector>
      </b-col>
      <b-col lg="9" class="text-center">
        <div class="result-container">
          <b-row>
            <b-col><h3 class="text-left mt-2 mb-4">查詢結果</h3> </b-col>
            <b-col class="text-right pt-3">
              <el-button size="small" type="danger" @click="tableData = []"
                >清除</el-button
              >
              <el-button :disabled="tableData.length == 0" size="small" type=""
                >匯出CSV</el-button
              >
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col cols="2" class="text-center pt-1"
              >共 {{ totalItemNum }} 筆</b-col
            >
            <b-col cols="9" class="text-left">
              <!-- 分頁 -->
              <div class="block text-left mb-3" style="color: white">
                <el-pagination
                  :current-page.sync="currentPage"
                  :page-size="pageItemNum"
                  :pager-count="11"
                  layout="prev, pager, next"
                  :total="totalItemNum"
                >
                </el-pagination>
              </div>
            </b-col>
          </b-row>

          <el-table
            :key="tableData"
            :data="pageData"
            max-height="800"
            empty-text="沒有資料"
          >
            <el-table-column
              prop="Time"
              label="TIME"
              :formatter="timeformat"
              sortable=""
              width="150"
            ></el-table-column>
            <el-table-column
              prop="IP"
              sortable=""
              label="IP"
              width="128"
            ></el-table-column>
            <el-table-column prop="Location" label="Location"></el-table-column>
            <el-table-column prop="Event" label="Event"></el-table-column>
            <el-table-column
              prop="AxisAlarmStateXAxis"
              label="X軸碰撞"
              width="75"
              align="center"
              :formatter="AxisStateValFormat"
            ></el-table-column>
            <el-table-column
              prop="AxisAlarmStateYAxis"
              label="Y軸碰撞"
              align="center"
              width="75"
              :formatter="AxisStateValFormat"
            ></el-table-column>
            <el-table-column
              prop="AxisAlarmStateZAxis"
              label="Z軸碰撞"
              width="75"
              align="center"
              :formatter="AxisStateValFormat"
            ></el-table-column>
            <el-table-column
              prop="FeatureXAxis"
              label="X軸能量值"
              align="center"
              :formatter="EngValFormat"
            ></el-table-column>
            <el-table-column
              prop="FeatureYAxis"
              label="Y軸能量值"
              align="center"
              :formatter="EngValFormat"
            ></el-table-column>
            <el-table-column
              prop="FeatureZAxis"
              label="Z軸能量值"
              align="center"
              :formatter="EngValFormat"
            ></el-table-column>
            <el-table-column
              prop="Level"
              label="Level"
              align="center"
              sortable=""
            ></el-table-column>
          </el-table>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ConditionSelector from "../components/Condition.vue";
import { Query } from "../API/Http";
import { env } from "process";
export default {
  components: { ConditionSelector },
  data() {
    return {
      isLoading: false,
      currentPage: 0,
      pageItemNum: 20, //每一頁顯示的資料筆數
      pageDataMap: {},
      tableData:
        env.NODE_PROCESS == "prodution"
          ? []
          : [
              {
                Time: "2022-05-06T10:11:40",
                Event: "This is fake",
                Location: "SP",
                IP: "123.123.123.123",
                FeatureXAxis: 0,
                FeatureYAxis: 0,
                FeatureZAxis: 0,
                Level: 1,
              },
            ],
    };
  },
  computed: {
    totalItemNum() {
      return this.tableData.length;
    },
    pageData() {
      if (this.pageDataMap.length == 0) return [];
      return this.pageDataMap[this.currentPage];
    },
  },
  methods: {
    async QueryBtnClickHandler(condition) {
      this.isLoading = true;
      Query.QueryData(condition).then((data) => {
        this.isLoading = false;
        if (data != "error") {
          this.currentPage = 1;
          this.tableData = data;
          this.SplitPageData();
        }
      });
    },
    /**產生分頁 */
    SplitPageData() {
      this.pageDataMap = {};
      this.currentPage = 2;
      var pageIndex = 1;
      for (
        let index = 0;
        index < this.tableData.length;
        index += this.pageItemNum
      ) {
        let pageDatLs = [];
        for (let i = index; i < index + this.pageItemNum; i++) {
          pageDatLs.push(this.tableData[i]);
        }
        this.pageDataMap[pageIndex] = pageDatLs;
        pageIndex += 1;
      }
      this.currentPage = 1;
    },
    timeformat(row = -1, column, cellValue, index) {
      return this.$moment(cellValue).format("yyyy-MM-DD HH:mm:ss");
    },
    EngValFormat(row, column, cellValue, index) {
      return cellValue.toFixed(5);
    },
    AxisStateValFormat(row, column, cellValue, index) {
      return cellValue ? "V" : "X";
    },
  },
};
</script>

<style>
.query-page {
  height: 100%;
}

.result-container {
  background-color: rgb(33, 33, 33);
  width: 100%;
  height: 100vh;
  padding: 3px 20px;
  border: 1px solid grey;
  border-radius: 6px;
}
</style>