<template>
  <div v-if="show" class="scroll-to-top">
    <div class="h2 mb-0">
      <b-icon
        id="scroll-top-btn"
        class="rounded-circle"
        icon="chevron-up"
        variant="light"
        style="height: 60px; width: 60px"
        @click="ScrollToTop"
      ></b-icon>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    ScrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.show = window.scrollY > 30;
    });
  },
};
</script>

<style>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 232323;
}

#scroll-top-btn {
  cursor: pointer;
  padding: 5px;
  background-color: rgb(42, 123, 214);
  color: white;
  opacity: 0.15;
}

#scroll-top-btn:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>
