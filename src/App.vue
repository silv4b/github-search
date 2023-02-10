<template>
  <!-- vue-router -->
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

* {
  font-family: "Roboto";
}

/* scroller */
::-webkit-scrollbar {
  width: 0.6rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: white;
  padding: 5px !important;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #0f65a7;
  border-radius: 10px !important;
  margin-right: 5px !important;
}
</style>
