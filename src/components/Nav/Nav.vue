<template >
  <div class="fixed-top" sticky>
    <b-navbar toggleable="lg" ref="nav" :variant="nav_style" :type="nav_style">
      <b-navbar-brand href="#">{{ $configs.navTitle }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">HOME</b-nav-item>
          <b-nav-item href="#">SETTINGS</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav_style: "dark",
    };
  },
  methods: {
    SetStyle(style) {
      this.nav_style = style;
      this.$configs.navStyle = style;
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.nav_style = window.scrollY > 50 ? "light" : "dark";
    });
  },
};
</script>

<style>
.nav-right {
  width: 100%;
}
</style>
