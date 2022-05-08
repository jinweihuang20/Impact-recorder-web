<template>
  <b-card class="day-hit-card info-card-sub-card" bg-variant="dark">
    <b-row>
      <b-col cols="8" class="text-left">
        <h4>DAY HIT</h4>
      </b-col>
      <b-col cols="4" class="text-center">
        <span class="reset-text" @click="ResetClickHandle">RESET</span>
      </b-col>
    </b-row>

    <div class="progress-bar-container text-center">
      <div class="hit-num-text">{{ HitNUM }} 次</div>
      <div class="progress-bar-div text-center">
        <el-progress
          type="circle"
          :percentage="HitNUM"
          :format="format"
          :show-text="false"
          :color="StatusColor"
        ></el-progress>
      </div>
    </div>
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
    StatusColor() {
      if (this.hitNum == 1) return "green";
      else if (this.hitNum < 50) return "orange";
      else return "red";
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
  z-index: 1;
  width: 100%;
  position: relative;
  bottom: 30px;
}
.progress-bar-container div {
  width: 100%;
  text-align: center;
  margin: 0 auto;
  position: relative;
}

.reset-text {
  color: rgb(197, 197, 197);
}

.reset-text:hover {
  color: rgb(1, 197, 197);
}

.hit-num-text {
  font-size: 21px;
  top: 80px;
  z-index: 2333;
}
</style>