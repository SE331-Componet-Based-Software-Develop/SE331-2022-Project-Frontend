import apiClient from '@/services/AxiosClient.js'
export default {
  getTotalPeoples() {
    return apiClient.get('/doctors')
  },
  getPeople(id) {
    return apiClient.get('/doctor/' + id)
  },
  getPeoples(perPage, page) {
    return apiClient.get('/doctors?_limit=' + perPage + '&_page=' + page)
  }
}
