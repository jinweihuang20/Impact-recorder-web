<template>
  <div id="app">
    <Nav></Nav>
    <ScrollToTopButton> </ScrollToTopButton>
    <div class="" style=" height:100%;margin-top: 60px; background-color: transparent;">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>


<script>
import Nav from "./components/Nav/Nav.vue";
import ScrollToTopButton from "./components/ScrollToTop/ScrollTopButton.vue";
export default {
  components: { Nav, ScrollToTopButton },
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  color:white;
  margin:0;
  height: 100%;
}

html{
    background-color: black;
  margin:0;
  height: 100%;
}

.selector-for-some-widget {
  box-sizing: content-box;
}
</style>
