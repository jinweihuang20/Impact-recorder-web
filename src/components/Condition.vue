<template>
  <div class="condition-setting p-3">
    <h3 class="mb-4">條件設定</h3>
    <el-divider></el-divider>
    <b-row class="mb-4"
      ><b-col cols="3">SENSOR</b-col
      ><b-col>
        <b-form-select
          style="background-color: black; color: white"
          v-model="condition.IP"
          :options="IPOptions"
        ></b-form-select> </b-col
    ></b-row>
    <b-row class="mb-3"
      ><b-col cols="3">START</b-col
      ><b-col>
        <b-form-datepicker
          id="start-datepicker"
          v-model="condition.QuStart"
          class="mb-2"
        ></b-form-datepicker>
        <b-form-timepicker
          v-model="condition.QuStart_Time"
          locale="en"
        ></b-form-timepicker> </b-col
    ></b-row>
    <b-row class="mb-3"
      ><b-col cols="3">END</b-col
      ><b-col>
        <b-form-datepicker
          id="end-datepicker"
          v-model="condition.QuEnd"
          class="mb-2"
        ></b-form-datepicker>
        <b-form-timepicker
          v-model="condition.QuEnd_Time"
          locale="en"
        ></b-form-timepicker> </b-col
    ></b-row>
    <b-row
      ><b-button
        :disabled="condition.QuStart == null || condition.QuEnd == null"
        id="query-button"
        block
        @click="QueryBtnClickHandler"
      >
        <b-icon-clipboard-data></b-icon-clipboard-data>
        查詢</b-button
      ></b-row
    >
  </div>
</template>

<script>
import { Query } from "../API/Http";
export default {
  data() {
    return {
      condition: {
        IP: null,
        QuStart: null,
        QuEnd: null,
        QuStart_Time: "00:00:00",
        QuEnd_Time: "00:00:00",
      },
      IPOptions: [
        {
          value: "testval",
          text: "testip",
        },
      ],
    };
  },
  methods: {
    async QueryBtnClickHandler() {
      this.$emit("onQueryButtonClick", this.condition);
      this.SaveConditionToLocalStorge();
    },
    SaveConditionToLocalStorge() {
      localStorage.setItem("query-condition", JSON.stringify(this.condition));
    },
    ReloadConditionFromLocalStorage() {
      var str = localStorage.getItem("query-condition");
      if (str) {
        console.log("condition reload from localStorage");
        this.condition = JSON.parse(str);
      }
    },
  },
  mounted() {
    this.ReloadConditionFromLocalStorage();
    Query.GetIPList().then((ipList) => {
      console.log(ipList);
      this.IPOptions = [{ value: "ALL", text: "ALL" }];
      ipList.forEach((element) => {
        this.IPOptions.push({
          value: element,
          text: element,
        });
      });
    });
  },
};
</script>

<style>
.condition-setting {
  background-color: rgb(33, 33, 33);
  color: white;
  border: 1px grey solid;
  margin-left: 10px;
  border-radius: 6px;
}

#query-button {
  background-color: rgb(33, 150, 243);
  font-size: x-large;
  height: 60px;
  border-radius: 33px;
  margin: 14px;
}
#query-button:hover {
  background-color: rgb(11, 64, 107);
}
</style>