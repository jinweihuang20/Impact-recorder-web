<template>
  <div class="home">
    <span :key="reunderkey"></span>

    <info-card
      v-for="(value, key) in connectedIPList"
      :key="key"
      :dataSet="value"
    >
      <div>value</div>
    </info-card>
  </div>
</template>

<script>
import infoCard from "../components/InfoCard/InfoCard.vue";
export default {
  name: "Home",
  components: {
    infoCard,
  },
  data() {
    return {
      ws: null,
      connectedIPList: {
        "127.0.0.1": {
          sensorIP: "127.123.132.221",
          eqName: "EQ1",
          unitName: "Unit1",
          toDayHitNumber: 12,
          vibEngX: 1.23,
          vibEngY: 1.23,
          vibEngZ: 1.23999,
          isPLCConnected: true,
          isRunning: true,
          eventData: {
            Events: [
              {
                EventTime: Date.now(),
                EventType: "eventType",
                ValueRec: 12.23,
                Level: 1,
                Content: "This is content",
                XAxisEvent: 0,
                YAxisEvent: 0,
                ZAxisEvent: 0,
                XValue: 32,
                YValue: 22,
                ZValue: 12,
              },
              {
                EventTime: Date.now(),
                EventType: "eventType",
                ValueRec: 12.23,
                Level: 2,
                Content: "This is content 2",
                XAxisEvent: 0,
                YAxisEvent: 0,
                ZAxisEvent: 0,
                XValue: 32,
                YValue: 22,
                ZValue: 12,
              },
            ],
          },
        },
      },
      reunderkey: 1,
    };
  },
  methods: {
    wsConnect() {
      let ws = new WebSocket(
        "wss://localhost:5001/api/WebSockets/Recorder/EQStatus"
      );
      ws.onopen = (e) => {
        console.log(e, "ok");
      };
      ws.onmessage = (msg) => {
        var dataObj = JSON.parse(msg.data);
        var ip = dataObj.sensorIP;
        // console.log(dataObj);
        this.connectedIPList[ip] = dataObj;

        //sort

        this.reunderkey = Date.now();
      };
    },
  },
  mounted() {
    this.wsConnect();
  },
};
</script>

<style>
.home {
  height: 100vh;
  background-color: black;
}
</style>