<template>
  <div class="info-card">
    <div class="card-title">
      <b-icon-app></b-icon-app> {{ dataSet.sensorIP }}
    </div>
    <b-container fluid="auto">
      <b-row class="text-center">
        <b-col cols="2"><state-card :dataSet="dataSet"> </state-card></b-col>
        <b-col cols="2"
          ><day-hit-card :hitNum="dataSet.toDayHitNumber"> </day-hit-card
        ></b-col>
        <b-col cols="4"
          ><event-table-card :tableData="dataSet.eventData.Events">
          </event-table-card
        ></b-col>
        <b-col cols="4"
          ><vib-energy-card :dataSet="dataSet"> </vib-energy-card
        ></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import StateCard from "./components/StateCard.vue";
import DayHitCard from "./components/DayHitCard.vue";
import EventTableCard from "./components/EventTableCard.vue";
import VibEnergyCard from "./components/VibEnergyCard.vue";
export default {
  components: { StateCard, DayHitCard, EventTableCard, VibEnergyCard },
  data() {
    return {};
  },
  props: {
    dataSet: Object,
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