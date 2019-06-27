import Axios from 'axios'

export const SET_RANDOM_PHOTO = 'SET_RANDOM_PHOTO'
export const SET_PHOTO_LIST = 'SET_PHOTO_LIST'
export const ADD_PHOTO_LIST_DATA = 'ADD_PHOTO_LIST_DATA'

export const ACTION_TYPE_ADD = 'ADD'
export const ACTION_TYPE_SET = 'SET'
export const ITEMS_ON_PAGE = 9

export const Http = Axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    'Accept-Version': 'v1',
    'Authorization': 'Client-ID 34499f2cd3adb37e00f29200afd839ff639b78f4c4e0006cf833f95f5cc7d035'
  }
})

Http.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      console.error(response.data.errors.list[0].message)
      return Promise.reject(response.data.errors.list[0].message)
    }
  }, error => {
    console.error(error)
    return Promise.reject(error)
  }
)
