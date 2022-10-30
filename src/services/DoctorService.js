import apiClient from '@/services/AxiosClient.js'

export default {
  getTotalDoctors() {
    return apiClient.get('/doctors')
  },
  getDoctor(id) {
    return apiClient.get('/doctor/' + id)
  },
  getDoctorPatient(id) {
    return apiClient.get('/doctorpatient/' + id)
  },
  getDoctors(perPage, page) {
    return apiClient.get('/doctors?_limit=' + perPage + '&_page=' + page)
  },
  updateFile(file) {
    let formDate = new FormData()
    formDate.append('file', file)
    return apiClient.post('/uploadFile', formDate, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  changeimage(doctor1) {
    let doctor = doctor1
    return apiClient.post('/doctorimage', doctor)
  }
}
