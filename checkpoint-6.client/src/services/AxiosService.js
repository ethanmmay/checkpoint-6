import Axios from 'axios'

export const baseURL = window.location.origin.includes('localhost') ? '//localhost:3000' : ''
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const unsplashApi = Axios.create({
  baseURL: 'https://api.unsplash.com/photos/random?client_id=qLRYxeaBY6uk0nYOK-t1Jt_1Ia9ohDPtV5R7dClDTkg&per_page=2',
  timeout: 8000
})

export const setBearer = function(bearer) {
  api.defaults.headers.authorization = bearer
}

export const resetBearer = function() {
  api.defaults.headers.authorization = ''
}
