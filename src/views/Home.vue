<template>
  <div class="home">
    <span :key="reunderkey"></span>
    <info-card
      v-for="item in connectedIPList"
      :key="item.sensorIP"
      :ref="item.sensorIP"
      :dataSet="item"
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
    };
  },
  methods: {
    wsConnect() {
      var Host =
        process.env.NODE_ENV === "production"
          ? window.location.protocol + "//" + window.location.host
          : "https://192.168.0.201:5001";
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
          this.reunderkey = Date.now();
        } else {
          this.connectedIPList[index] = dataObj;
        }
        this.connectedIPList.forEach((element) => {
          var ip = element.sensorIP;
          var refs = this.$refs[ip];
          if (refs != undefined) refs[0].dataSet = element;
        });
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
  height: 100%;
  background-color: black;
}
</style>