import apiClient from '@/services/AxiosClient.js'
export default {
  getTotalVaccines() {
    return apiClient.get('/vaccines')
  }
}
