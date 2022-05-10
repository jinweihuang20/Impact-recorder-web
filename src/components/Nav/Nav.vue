<template >
  <div class="fixed-top" sticky>
    <b-navbar toggleable="lg" ref="nav" :variant="nav_style" :type="nav_style">
      <b-navbar-brand to="/">
        <span style="font-size: 23px; font-weight: 800; letter-spacing: 3px">
          <b-icon-app-indicator></b-icon-app-indicator>
          {{ $configs.navTitle }}
        </span>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav :key="renderKey">
          <b-nav-item
            class="text-bold"
            v-for="route in nav_route_item"
            :key="route.path"
            :to="route.path"
          >
            <span
              class="nav-item-text"
              :key="route.style.color"
              v-bind:style="route.style"
            >{{ route.name }}</span>
          </b-nav-item>
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
      nav_route_item: [],
      renderKey: null,
      routerNow: null,
      isScrollDown: false,
    };
  },
  methods: {
    SetStyle(style) {
      this.nav_style = style;
      this.$configs.navStyle = style;
    },

    CreateNavItems() {
      this.nav_route_item = this.$router.options.routes;
      var currentRoute = this.$router.history.current;
      this.nav_route_item.forEach((element) => {
        var isActive = element.name == currentRoute.name;
        element.style = {
          color: isActive ? "rgb(33, 150, 243)" : "white",
          fontSize: isActive ? "21px" : "16px",
          top: isActive ? "0px" : "6px",
          position: "relative",
        };
      });
    },
    StyleChange(newRoute, noActiveTextColor = "white") {
      this.nav_route_item.forEach((route) => {
        var isRouteActive = newRoute.name == route.name;
        route.style.color = isRouteActive
          ? "rgb(33, 150, 243)"
          : noActiveTextColor;
        route.style.fontSize = isRouteActive ? "21px" : "16px";
        route.style.top = isRouteActive ? "0px" : "6px";
      });
      this.renderKey = Date.now();
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.isScrollDown = window.scrollY > 50;
      this.nav_style = this.isScrollDown ? "light" : "dark";
      this.StyleChange(this.routerNow, this.isScrollDown ? "black" : "white");
    });
    this.CreateNavItems();
  },
  watch: {
    $route: {
      handler: function (newRoute) {
        this.routerNow = newRoute;
        this.StyleChange(newRoute, this.isScrollDown ? "black" : "white");
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style>
.nav-right {
  width: 100%;
}
</style>
