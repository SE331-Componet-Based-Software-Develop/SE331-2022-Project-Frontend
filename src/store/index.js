import { reactive } from 'vue'
export default reactive({
  flashMessage: '',
  patient: null,
  currentUser: JSON.parse(localStorage.getItem('user'))
  // currentUser: null
})
