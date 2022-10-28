import axios from 'axios'

const apiClient = axios.create({
  baseURL:
    'https://my-json-server.typicode.com/SE331-Componet-Based-Software-Develop/data',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

export default {
  getTotalPeoples() {
    return apiClient.get('/peoples')
  },
  getPeople(id) {
    return apiClient.get('/peoples/' + id)
  },
  getPeoples(perPage, page) {
    return apiClient.get('/peoples?_limit=' + perPage + '&_page=' + page)
  }
}
