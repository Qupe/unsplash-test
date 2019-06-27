import Vue from 'vue'
import Vuex from 'vuex'
import {
  Http,
  SET_RANDOM_PHOTO,
  SET_PHOTO_LIST,
  ITEMS_ON_PAGE,
  ADD_PHOTO_LIST_DATA,
  ACTION_TYPE_ADD
} from './config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    randomPhoto: {
      created_at: undefined,
      color: undefined,
      likes: undefined,
      downloads: undefined,
      views: undefined,
      urls: {
        regular: undefined,
        small: undefined
      },
      exif: {
        make: undefined,
        model: undefined,
        exposure_time: undefined,
        aperture: undefined,
        focal_length: undefined,
        iso: undefined
      },
      user: {
        name: undefined,
        links: {
          html: undefined
        }
      }
    },
    popularPhotoList: {
      loading: false,
      data: []
    }
  },
  mutations: {
    [SET_RANDOM_PHOTO] (state, payload) {
      Object.assign(state, { randomPhoto: payload })
    },
    [SET_PHOTO_LIST] (state, payload) {
      Object.assign(state.popularPhotoList, { ...payload })
    },
    [ADD_PHOTO_LIST_DATA] (state, payload) {
      state.popularPhotoList.data.push(...payload.data)
    }
  },
  actions: {
    getRandomPhoto ({ commit }, params) {
      Http.get('photos/random', { params: params }).then(response => {
        commit(SET_RANDOM_PHOTO, response)
      })
    },
    getPhotos ({ commit }, params) {
      commit(SET_PHOTO_LIST, { loading: true })
      setTimeout(() => {
        Http.get('photos', {
          params: {
            ...params,
            'per_page': ITEMS_ON_PAGE
          }
        }).then(response => {
          if (params.type === ACTION_TYPE_ADD) {
            commit(ADD_PHOTO_LIST_DATA, { data: response })
          } else {
            commit(SET_PHOTO_LIST, { data: response })
          }
        }).finally(() => {
          commit(SET_PHOTO_LIST, { loading: false })
        })
      }, 1000)
    }
  }
})
