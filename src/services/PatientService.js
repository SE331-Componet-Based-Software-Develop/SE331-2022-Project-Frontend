import apiClient from '@/services/AxiosClient.js'
export default {
  getTotalPeoples() {
    return apiClient.get('/patients')
  },
  getPeople(id) {
    return apiClient.get('/patient/' + id)
  },
  getPeoples(perPage, page) {
    return apiClient.get('/patients?_limit=' + perPage + '&_page=' + page)
  }
}
