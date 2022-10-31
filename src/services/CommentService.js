import apiClient from '@/services/AxiosClient.js'

export default {
  getTotalComments() {
    return apiClient.get('/comments')
  },
  getCommentByPatient(pid) {
    return apiClient.get('/commentsbypid?pid=' + pid)
  },
  addComment(comment, did, pid) {
    return apiClient.post('/comment?did=' + did + '&pid=' + pid, comment)
  }
}
