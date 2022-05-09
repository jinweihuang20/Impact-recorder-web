<template>
  <div class="home page">
    <span :key="reunderkey"></span>
    <info-card
      v-for="item in connectedIPList"
      :key="item.sensorIP"
      :ref="item.sensorIP"
      :dataSet="item"
      :id="item.sensorIP"
      v-observe-visibility="visibilityChanged"
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
      connectedIPList: [],
      reunderkey: 1,
      visibleMap: {},
    };
  },
  methods: {
    wsConnect() {
      var Host =
        process.env.NODE_ENV === "production"
          ? window.location.protocol + "//" + window.location.host
          : "https://192.168.0.103:4001";
      var wsRoute = `${Host.replace(
        "http",
        "ws"
      )}/api/WebSockets/Recorder/EQStatus`;
      console.log("websocket api:", wsRoute);
      let ws = new WebSocket(wsRoute);
      ws.onopen = (e) => {
        console.log(e, "ok");
      };
      ws.onclose = () => {
        console.log("ws closed");
      };
      ws.onmessage = (msg) => {
        var dataObj = JSON.parse(msg.data);

        var ip = dataObj.sensorIP;

        var index = this.connectedIPList.findIndex(
          (item) => item.sensorIP == ip
        );
        if (index == -1) {
          this.connectedIPList.push(dataObj);
          //sorted
          this.SortList();

          this.reunderkey = Date.now();
        } else {
          this.connectedIPList[index] = dataObj;
        }

        this.connectedIPList.forEach((element) => {
          var ip = element.sensorIP;
          if (!this.visibleMap[ip]) return;
          var refs = this.$refs[ip];
          if (refs != undefined) refs[0].dataSet = element;
        });
      };
    },
    SortList() {
      this.connectedIPList.sort(function (a, b) {
        let x = a.sensorIP.toLowerCase();
        let y = b.sensorIP.toLowerCase();
        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      });
    },
    addFakeData(number) {
      console.log("add fake", number);
      for (let index = 0; index < number; index++) {
        var ip = `192.168.0.6${index + 8}`;
        const element = {
          sensorIP: ip,
          eqName: "EQ1",
          unitName: "UnHJHJJHit1",
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
            ToDayHit: 44 + index * 2,
          },
          chartData: {},
        };
        this.connectedIPList.push(element);
      }
    },
    RenderFakeData() {
      this.connectedIPList.forEach((element) => {
        var ip = element.sensorIP;
        var refs = this.$refs[ip];
        if (refs != undefined) refs[0].dataSet = element;
      });
    },

    visibilityChanged(isVisible, entry) {
      var ip = entry.target.getAttribute("id");
      this.visibleMap[ip] = isVisible;
      console.log(this.visibleMap);
    },
  },
  mounted() {
    // if (!(process.env.NODE_ENV === "production")) {
    //   this.addFakeData(7);
    //   setTimeout(() => {
    //     this.RenderFakeData();
    //   }, 1);
    // }
    this.wsConnect();
  },
};
</script>

<style>
</style>