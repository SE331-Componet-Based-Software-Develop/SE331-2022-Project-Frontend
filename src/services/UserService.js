import apiClient from '@/services/AxiosClient.js'

export default {
  getUsers() {
    return apiClient.get('/userwithnoauth')
  },
  updaterole(uid, num) {
    return apiClient.post('/setrole?uid=' + uid + '&num=' + num)
  }
}
