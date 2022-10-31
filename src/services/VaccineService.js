import apiClient from '@/services/AxiosClient.js'
export default {
  getTotalVaccines() {
    return apiClient.get('/vaccines')
  },
  updateVaccine(vaccine, pid, did) {
    return apiClient.post('/vaccine?pid=' + pid + '&did=' + did, vaccine)
  },
  getVaccine(id) {
    return apiClient.get('/vaccine/' + id)
  },
  getVaccines(perPage, page) {
    return apiClient.get('/vaccines?_limit=' + perPage + '&_page=' + page)
  }
}
