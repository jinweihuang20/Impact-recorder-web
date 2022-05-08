<template>
  <b-card class="day-hit-card info-card-sub-card" bg-variant="dark">
    <b-row>
      <b-col cols="8" class="text-left">
        <h4>DAY HIT</h4>
      </b-col>
      <b-col  cols="4" class="text-center">
        <span class="reset-text" @click="ResetClickHandle">RESET</span>
      </b-col>
    </b-row>

    <b-container>
      <div class="progress-bar-container">
        <el-progress
          type="circle"
          :percentage="HitNUM"
          :format="format"
        ></el-progress>
      </div>
    </b-container>
  </b-card>
</template>

<script>
import { Setting } from "../../../API/Http";
export default {
  props: {
    hitNum: {
      type: Number,
      default: 0,
    },
    sensorIP: String,
  },
  computed: {
    HitNUM() {
      return this.hitNum < 0 ? 0 : this.hitNum;
    },
  },
  methods: {
    format(value) {
      return value + "次";
    },

    ResetClickHandle() {
      Setting.ResetHitNumToday(this.sensorIP);
    },
  },
};
</script>

<style>
.progress-bar-container {
  margin-top: 20px;
  color: white;
}

.reset-text {
  color: rgb(197, 197, 197);
}

.reset-text:hover {
  color: rgb(1, 197, 197);
}
</style>