<template>
  <v-app>
    <v-content>
      <transition
        name="fade"
        mode="out-in">
        <router-view />
      </transition>
    </v-content>
    <v-snackbar
      v-model="snackbar"
      :timeout="500"
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      snackbar: false,
      text: ''
    }
  },
  mounted () {
    this.$root.$on('resolved', () => {
      this.snackbar = true
    })
  }
}
</script>

<style>
  @import "~normalize.css";

  html, body {
    height: 100%;
  }

  .blend-color-difference {
    mix-blend-mode: difference;
  }
</style>
