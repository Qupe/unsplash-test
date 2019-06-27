<template>
  <div class="home">
    <div class="home__container">
      <div class="v-overlay v-overlay--active v-overlay--absolute"></div>
      <div class="home__info">
        <div class="home__info-item" v-if="$store.state.randomPhoto.location">
          <v-icon
            class="home__stats-item-icon"
            dark
            small>
            location_on
          </v-icon>
          {{ $store.state.randomPhoto.location.country + ' ' + $store.state.randomPhoto.location.city }}
        </div>
        <div
          class="home__info-item home__info-item_info text-lg-right"
          @click.stop="dialog = true">
          <v-icon
            class="home__info-item-icon"
            dark
            small>
            error_outline
          </v-icon>
          Info
        </div>
      </div>
      <div class="home__text text-lg-center">
        <h1 class="home__title display-4 font-weight-medium">Photo of the Day</h1>
        <br/>
        <h2 class="home__subtitle headline">
          by <a class="white--text" :href="$store.state.randomPhoto.user.links.html">
          {{ $store.state.randomPhoto.user.name }}
          </a>
        </h2>
        <v-icon
          class="d-block"
          dark
          large>
          arrow_downward
        </v-icon>
        <v-btn
          class="home__see-more-button"
          outline
          round
          color="white"
          dark :to="{name: 'list'}">
          See more photos&nbsp;&nbsp;<v-icon>view_headline</v-icon>
        </v-btn>
      </div>
      <div class="home__stats">
        <div class="home__stats-item">
          <v-icon
            class="home__stats-item-icon"
            dark
            small>
            visibility
          </v-icon> {{ $store.state.randomPhoto.views }}
        </div>
        <div class="home__stats-item text-lg-center">
          <v-icon
            class="home__stats-item-icon"
            dark small>
            save_alt
          </v-icon> {{ $store.state.randomPhoto.downloads }}
        </div>
        <div class="home__stats-item text-lg-right">
          <v-icon
            class="home__stats-item-icon"
            dark
            small>
            favorite
          </v-icon> {{ $store.state.randomPhoto.likes }}
        </div>
      </div>
      <v-img
        class="home__img"
        :src="$store.state.randomPhoto.urls.regular"
        :lazy-src="$store.state.randomPhoto.urls.small"
        aspect-ratio="1"
      />
    </div>
    <v-dialog
      v-model="dialog"
      max-width="600"
      transition="fade-transition"
    >
      <v-card class="home__info-dialog">
        <v-card-title class="headline">Info</v-card-title>
        <v-card-text>
          <div class="home__info-pubdate subheading">
            Published: {{ $store.state.randomPhoto.created_at | formatDate }}
          </div>
          <v-layout
            row
            wrap
            class="home__info-exif">
            <v-flex
              grow
              xs4
              class="home__info-exif-item">
              <div class="home__info-exif-item-name">Camera Make:</div>
              {{ $store.state.randomPhoto.exif.make }}
            </v-flex>
            <v-flex
              grow
              xs4
              class="home__info-exif-item">
              <div class="home__info-exif-item-name">Camera Model:</div>
              {{ $store.state.randomPhoto.exif.model }}
            </v-flex>
            <v-flex
              grow
              xs4
              class="home__info-exif-item">
              <div class="home__info-exif-item-name">Focal Length:</div>
              {{ $store.state.randomPhoto.exif.focal_length }}.0mm
            </v-flex>
            <v-flex
              grow
              xs4
              class="home__info-exif-item">
              <div class="home__info-exif-item-name">Aperture:</div>
              ƒ/{{ $store.state.randomPhoto.exif.aperture }}
            </v-flex>
            <v-flex
              grow
              xs4
              class="home__info-exif-item">
              <div class="home__info-exif-item-name">Shutter Speed:</div>
              {{ $store.state.randomPhoto.exif.exposure_time }}s
            </v-flex>
            <v-flex
              grow
              xs4
              class="home__info-exif-item">
              <div class="home__info-exif-item-name">ISO:</div>
              {{ $store.state.randomPhoto.exif.iso }}
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { formatDate } from '../filters'

export default {
  name: 'Home',
  filters: { formatDate },
  created () {
    this.$store.dispatch('getRandomPhoto', { orientation: 'landscape' })
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<style>
  .home {
    height: 100%;
    position: relative;
  }

  .home__text {
    color: #ffffff;
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
  }

  .home__title {
    margin: 0 auto 20px;
    text-shadow: -1px 3px 0 #17131361;
  }

  .home__subtitle {
    max-width: 80%;
    margin: 0 auto 40px;
  }

  .home__container {
    position: relative;
    max-height: calc(100vh);
  }

  .home__stats, .home__info {
    opacity: 0.8;
    position: absolute;
    bottom: 0;
    z-index: 11;
    padding: 10px 20px;
    width: 100%;
    display: flex;
  }

  .home__info {
    top: 0;
    bottom: initial;
  }

  .home__stats-item, .home__info-item {
    flex-grow: 1;
    color: #ffffff;
    font-size: 14px;
  }

  .home__info-item_info {
    cursor: pointer;
  }

  .home__stats-item-icon, .home__info-item-icon {
    margin-right: 10px;
  }

  .home__see-more-button {
    margin-top: 40px;
  }

  .home__img {
    max-height: calc(100vh);
  }

  .home__info-dialog {
    width: 100%
  }

  .home__info-pubdate {
    margin-bottom: 20px;
  }

  .home__info-exif {
    border-top: 1px solid #999999;
  }

  .home__info-exif-item {
    margin: 10px 0;
  }

  .home__info-exif-item-name {
    color: #999999;
  }
</style>
