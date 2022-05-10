<template>
  <b-card class="info-card-sub-card">
    <h4>EVENTS</h4>
    <b-container>
      <el-table
        ref="table"
        :data="tableData"
        empty-text="尚未有事件"
        max-height="180"
        :header-cell-style="headStyle"
        :cell-style="rowStyle"
        style="background-color: rgb(32, 32, 32)"
      >
        <el-table-column sortable prop="EventTime_Formated" label="TIME" width="140"></el-table-column>
        <el-table-column sortable prop="EventType" label="Event Group" width="140"></el-table-column>
        <el-table-column sortable prop="Content" label="內容"></el-table-column>
        <el-table-column align="center" sortable prop="Level" label="Level" width="80"></el-table-column>
      </el-table>
    </b-container>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      headStyle: {
        fontSize: "12px",
        fontWeight: "bold",
        backgroundColor: "black",
        color: "white",
      },
      rowStyle: {
        fontSize: "12px",
        backgroundColor: "rgb(32,32,32)",
        color: "white",
      },
    };
  },
  methods: {
    tableHover() {
      console.log("mouse hover");
    },
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return [
          {
            date: Date.now(),
            name: "HAHA",
            address: "fff",
          },
          {
            date: Date.now(),
            name: "HAHA2",
            address: "fff2",
          },
          {
            date: Date.now(),
            name: "HAHA2",
            address: "fff2",
          },
          {
            date: Date.now(),
            name: "HAHA2",
            address: "fff2",
          },
          {
            date: Date.now(),
            name: "HAHA2",
            address: "fff2",
          },
          {
            date: Date.now(),
            name: "HAHA2",
            address: "fff2",
          },
        ];
      },
    },
  },
  watch: {
    tableData: {
      handler: function (n) {
        if (n != undefined) {
          this.tableData.forEach((element) => {
            element.EventTime_Formated = this.$moment(element.EventTime).format(
              "YY-MM-DD HH:mm:ss"
            );
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },

  mounted() {
    var table = this.$refs["table"];
    table.mou;
  },
};
</script>

<style>
</style>