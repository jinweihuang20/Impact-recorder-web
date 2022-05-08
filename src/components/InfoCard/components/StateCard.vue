<template>
  <b-card class="state-card info-card-sub-card" bg-variant="dark">
    <h4>設備資訊</h4>
    <div>
      <b-row class="mb-2">
        <b-col cols="6" class="text-left"
          ><b-icon-list-check></b-icon-list-check> 模組 IP</b-col
        >
        <b-col class="ip-label" cols="6" @click="SensorIPClickHandle">{{
          dataSet.sensorIP
        }}</b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col cols="6" class="text-left">
          <b-icon-list-check></b-icon-list-check> 監控部位</b-col
        >
        <b-col cols="6">{{ dataSet.unitName }}</b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col cols="6" class="text-left">
          <b-icon-link></b-icon-link> 設備運轉</b-col
        >
        <b-col cols="6">
          <b-icon-circle-fill :variant="eqRunState"></b-icon-circle-fill>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col cols="6" class="text-left">
          <b-icon-link></b-icon-link> PLC連線</b-col
        >
        <b-col cols="6"
          ><b-icon-circle-fill :variant="plcConnectedState"></b-icon-circle-fill
        ></b-col>
      </b-row>
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    dataSet: Object,
  },
  computed: {
    eqRunState() {
      return this.dataSet.isRunning ? "success" : "danger";
    },
    plcConnectedState() {
      return this.dataSet.isPLCConnected ? "success" : "danger";
    },
  },
  methods: {
    SensorIPClickHandle() {
      // alert("open website of sensor ");
      window.open(`http://${this.dataSet.sensorIP}`);
    },
  },
};
</script>


<style>
.card-row div {
  margin: 2px;
  padding: 1px;
}

.card-row .col {
  text-align: left;
  padding-left: 10px;
}

.ip-label:hover {
  color: rgb(42, 123, 214);
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
}
</style>