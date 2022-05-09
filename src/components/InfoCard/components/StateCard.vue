<template>
  <b-card :id="StateCardID" class="state-card info-card-sub-card">
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
        <b-col cols="5" class="text-left">
          <b-icon-list-check></b-icon-list-check> 監控部位</b-col
        >
        <b-col cols="7">
          <b-icon-pencil-square
            class="edit-icon"
            v-show="isMouseEnter"
            v-b-modal="EditModelID"
          >
          </b-icon-pencil-square>
          {{ dataSet.unitName }}
        </b-col>
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
    <b-modal
      @ok="SubmitEditResult"
      @hidden="EditModalCloseHandle"
      :busy="!IsBackendReply"
      :id="EditModelID"
      size="md"
      :title="'編輯屬性 - ' + dataSet.sensorIP"
    >
      <b-form>
        <b-form-group
          id="input-group-1"
          label="監控設備名稱"
          label-for="input-eqname"
        >
          <b-form-input
            id="input-eqname"
            v-model="form.eqName"
            :placeholder="dataSet.eqName"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="監控元件名稱"
          label-for="input-unitname"
        >
          <b-form-input
            id="input-eqname"
            v-model="form.unitName"
            :placeholder="dataSet.unitName"
            required
          ></b-form-input> </b-form-group
      ></b-form>
    </b-modal>
  </b-card>
</template>

<script>
import { Setting } from "../../../API/Http";
export default {
  props: {
    dataSet: {
      type: Object,
      default() {
        return {
          sensorIP: "undefined",
        };
      },
    },
  },
  data() {
    return {
      isMouseEnter: true,
      IsBackendReply: true,
      form: {
        eqName: "",
        unitName: "",
      },
    };
  },
  computed: {
    eqRunState() {
      return this.dataSet.isRunning ? "success" : "danger";
    },
    plcConnectedState() {
      return this.dataSet.isPLCConnected ? "success" : "danger";
    },
    StateCardID() {
      return "state-card-" + this.dataSet.sensorIP;
    },
    EditModelID() {
      return "edit-modal-" + this.dataSet.sensorIP;
    },
    ModuleInstallProp() {
      return {
        IP: this.dataSet.sensorIP,
        eqName: this.form.eqName == "" ? this.dataSet.eqName : this.form.eqName,
        unitName:
          this.form.unitName == "" ? this.dataSet.unitName : this.form.unitName,
      };
    },
  },
  methods: {
    SensorIPClickHandle() {
      // alert("open website of sensor ");
      window.open(`http://${this.dataSet.sensorIP}`);
    },
    async SubmitEditResult(bvModalEvent) {
      this.IsBackendReply = false;
      await Setting.ModifyEqUnitName(this.ModuleInstallProp);
      this.IsBackendReply = true;
    },
    EditModalCloseHandle() {
      this.form = { eqName: "", unitName: "" };
    },
  },
  mounted() {},
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

.edit-icon:hover {
  color: rgb(1, 197, 197);
}
</style>