import { reactive } from 'vue'
export default reactive({
  flashMessage: '',
  patient: null,
  doctor: null,
  currentUser: JSON.parse(localStorage.getItem('user'))
})
