<template>
  <b-card class="day-hit-card info-card-sub-card" bg-variant="dark">
    <h4>DAY HIT</h4>
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
export default {
  props: {
    hitNum: {
      type: Number,
      default: 0,
    },
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
  },
};
</script>

<style>
.progress-bar-container {
  margin-top: 20px;
  color: white;
}
</style>