<template>
  <div class="photo-list">
    <v-toolbar
      flat
      fixed>
      <v-btn
        icon
        :to="{name: 'home'}">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Photos</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>
    <v-container class="photo-list__container">
      <v-layout
        wrap
        row>
        <v-flex
          grow
          pa-2
          xs4
          v-for="item in $store.state.popularPhotoList.data"
          :key="item.id">
          <v-card
            class="mx-auto"
            :color="item.color"
            dark>
            <v-img
              height="300"
              :src="item.urls.small"
              :lazy-src="item.urls.thumb"
            />
            <v-card-title class="blend-color-difference">
              by&nbsp;<a
              target="_blank"
              class="white--text"
              :href="item.user.links.html">
                {{ item.user.username }}
              </a>
            </v-card-title>
            <v-card-actions>
              <v-icon
                class="home__stats-item-icon red--text"
                small>
                favorite
              </v-icon>
              <span class="blend-color-difference">
                {{item.likes }}
              </span>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <div
        class="photo-list__loader text-xs-center"
        v-if="$store.state.popularPhotoList.loading">
        <v-progress-circular indeterminate/>
      </div>
    </v-container>
  </div>
</template>

<script>
import { formatDate } from '../filters'
import { SET_PHOTO_LIST, ACTION_TYPE_ADD, ACTION_TYPE_SET } from '../config'

export default {
  name: 'List',
  filters: { formatDate },
  data () {
    return {
      bottom: false,
      nextPage: 2
    }
  },
  created () {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
    this.$store.dispatch('getPhotos', {
      type: ACTION_TYPE_SET
    })
  },
  watch: {
    bottom (bottom) {
      if (bottom) {
        this.$store.dispatch('getPhotos', {
          page: this.nextPage++, type: ACTION_TYPE_ADD
        })
      }
    }
  },
  methods: {
    bottomVisible () {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    }
  },
  destroyed () {
    this.$store.commit(SET_PHOTO_LIST, [])
  }
}
</script>

<style>
  .photo-list__container {
    margin-top: 62px;
  }

  .photo-list__loader {
    padding: 40px 0 20px;
  }
</style>
