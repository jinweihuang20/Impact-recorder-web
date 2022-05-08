<template>
  <div class="info-card">
    <div class="card-title">
      <b-row>
        <b-col>
          <b-icon-tools @click="SettingButtonHandle"></b-icon-tools>
          {{ dataSet.sensorIP }}
        </b-col>
        <b-col class="text-right">
          {{ $moment(dataSet.time).format("mm:ss") }}
        </b-col>
      </b-row>
    </div>
    <b-container fluid="auto">
      <b-row class="text-center">
        <b-col cols="2"><state-card :dataSet="dataSet"> </state-card></b-col>
        <b-col cols="2"
          ><day-hit-card
            :sensorIP="dataSet.sensorIP"
            :hitNum="dataSet.eventData.ToDayHit"
          >
          </day-hit-card
        ></b-col>
        <b-col cols="4"
          ><event-table-card :tableData="dataSet.eventData.Events">
          </event-table-card
        ></b-col>
        <b-col cols="4">
          <vib-energy-card :dataSet="dataSet"> </vib-energy-card
        ></b-col>
      </b-row>
    </b-container>
    <el-drawer
      :visible.sync="showSettingDrawer"
      direction="ltr"
      :title="SettingDrawerTitle"
      @close="
        {
          waitForSettingDone = false;
        }
      "
      @open="GetModuleSetting"
    >
      <b-card
        class="text-left h-100"
        body-bg-variant="dark"
        v-loading="!moduleSettingDownloadDone"
      >
        <b-card-header class="text-right">
          <b-button
            :disabled="waitForSettingDone"
            variant="outline-light"
            @click="SaveSettingClickHandle"
          >
            <b-spinner
              v-show="waitForSettingDone"
              label="Spinning"
              small
            ></b-spinner>
            儲存設定
          </b-button>
        </b-card-header>
        <el-divider></el-divider>
        <b-card-body>
          <div class="mb-5">
            <h3>閥值設定</h3>
            <b-row>
              <b-col cols="3" class="pt-3 ml-2"> X軸閥值</b-col>
              <b-col class="pt-2 ml-3 mr-2">
                <el-slider
                  :disabled="waitForSettingDone"
                  :max="100"
                  :show-input="true"
                  :step="0.01"
                  v-model="moduleSettings.thresHold_X"
                ></el-slider>
              </b-col> </b-row
            ><b-row>
              <b-col cols="3" class="pt-3 ml-2"> Y軸閥值</b-col>
              <b-col class="pt-2 ml-3 mr-2">
                <el-slider
                  :disabled="waitForSettingDone"
                  :max="100"
                  :show-input="true"
                  :step="0.01"
                  v-model="moduleSettings.thresHold_Y"
                ></el-slider>
              </b-col> </b-row
            ><b-row>
              <b-col cols="3" class="pt-3 ml-2"> Z軸閥值</b-col>
              <b-col class="pt-2 ml-3 mr-2">
                <el-slider
                  :disabled="waitForSettingDone"
                  :max="100"
                  :show-input="true"
                  :step="0.01"
                  v-model="moduleSettings.thresHold_Z"
                ></el-slider>
              </b-col>
            </b-row>
          </div>
          <div>
            <h3>模組設定</h3>
            <b-row>
              <b-col cols="3" class="pt-3 ml-2"> 量測範圍 </b-col>
              <b-col>
                <b-dropdown
                  :disabled="waitForSettingDone"
                  block
                  variant="outline-light"
                  id="dropdown-1"
                  :text="moduleSettings.selectedRange + 'G'"
                  class="m-md-2 z-index-123123"
                  menu-class="w-100"
                >
                  <b-dropdown-item @click="MeasureRangeSelectedChangeHandler(2)"
                    >2G</b-dropdown-item
                  >
                  <b-dropdown-item @click="MeasureRangeSelectedChangeHandler(4)"
                    >4G</b-dropdown-item
                  >
                  <b-dropdown-item @click="MeasureRangeSelectedChangeHandler(8)"
                    >8G</b-dropdown-item
                  >
                  <b-dropdown-item
                    @click="MeasureRangeSelectedChangeHandler(16)"
                    >16G</b-dropdown-item
                  >
                  <b-dropdown-divider></b-dropdown-divider>
                </b-dropdown>
              </b-col>
            </b-row>
          </div>
        </b-card-body>
      </b-card>
    </el-drawer>
  </div>
</template>

<script>
import StateCard from "./components/StateCard.vue";
import DayHitCard from "./components/DayHitCard.vue";
import EventTableCard from "./components/EventTableCard.vue";
import VibEnergyCard from "./components/VibEnergyCard.vue";

import { Setting } from "../../API/Http";

export default {
  components: { StateCard, DayHitCard, EventTableCard, VibEnergyCard },
  data() {
    return {
      dataSet: {
        vibEngX: 1.23,
        vibEngY: 1.23,
        vibEngZ: 1.23999,
        eventData: {
          Events: [],
        },
        chartData: {
          trendDataList: [[], [], []],
        },
      },
      sensorIP: "",
      showSettingDrawer: false,
      SettingDrawerTitle: "",
      waitForSettingDone: false,
      moduleSettingDownloadDone: false,
      moduleSettings: {
        IP: "",
        selectedRange: 2,
        thresHold_X: 99.0,
        thresHold_Y: 99.0,
        thresHold_Z: 99.0,
      },
    };
  },
  props: {},
  methods: {
    SettingButtonHandle() {
      this.moduleSettings.IP = this.dataSet.sensorIP;
      this.SettingDrawerTitle = "Setting : " + this.dataSet.sensorIP;
      this.showSettingDrawer = !this.showSettingDrawer;
    },
    MeasureRangeSelectedChangeHandler(range) {
      console.log(range);
      this.moduleSettings.selectedRange = range;
    },
    async SaveSettingClickHandle() {
      this.waitForSettingDone = true;
      await Setting.SetModuleSetting(this.moduleSettings);
      this.waitForSettingDone = false;
      this.makeToast(`${this.moduleSettings.IP} 參數設定完成`);
    },
    async GetModuleSetting() {
      this.moduleSettingDownloadDone = false;
      var ret = await Setting.GetModuleSetting(this.dataSet.sensorIP);
      this.moduleSettings = ret;
      this.moduleSettingDownloadDone = true;
    },
    makeToast(message = "", append = false) {
      this.$bvToast.toast(message, {
        title: "碰撞偵測系統",
        autoHideDelay: 3000,
        appendToast: append,
      });
    },
  },
  mounted() {
    console.log("mounted.");
  },
};
</script>

<style>
div.info-card {
  margin: 5px;
  padding: 10px;
  background-color: rgb(27, 27, 27);
  border-radius: 4px;
}

div.card-title {
  text-align: left;
  padding: 2px;
  font-size: 20px;
  font-weight: bold;
}
</style>