import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DoctorPatientView from '../views/DoctorPatientView.vue'
import DoctorHomeView from '@/views/DoctorHomeView.vue'
import AboutView from '../views/AboutView.vue'
import PatientDetailView from '../views/PatientDetailView.vue'
import PatientVaccineDetailView from '../views/PatientVaccineDetailView'
import VaccineDetailView from '../views/VaccineDetailView.vue'
import LayoutView from '../views/LayoutView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import NetWorkErrorView from '../views/NetworkErrorView.vue'
import PatientService from '../services/PatientService.js'
import DoctorService from '../services/DoctorService.js'
import DoctorLayoutView from '@/views/DoctorLayoutView'
// import DoctorCommentView from '@/views/DoctorCommentView'
// import DoctorPatientDetailView from '@/views/DoctorPatientDetailView'
import DoctorDetailView from '@/views/DoctorDetailView.vue'
import ChangeImage from '@/views/ChangeImage.vue'
import DoctorChangeImage from '@/views/DoctorChangeImage.vue'
import PatientCommentView from '@/views/PatientCommentView.vue'
import Register from '@/views/RegisterView.vue'
import AdminUser from '@/views/AdminUserView.vue'
import NProgress from 'nprogress'
import GStore from '@/store'
import Login from '@/views/LoginFormView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: (route) => ({
      page: parseInt(route.query.page) || 1
    })
  },
  {
    path: '/doctors',
    name: 'doctorhome',
    component: DoctorHomeView,
    props: (route) => ({
      page: parseInt(route.query.page) || 1
    })
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/user',
    name: 'AdminUser',
    component: AdminUser
  },
  {
    path: '/patient/:id',
    name: 'Layout',
    component: LayoutView,
    props: true,
    beforeEnter: (to) => {
      return PatientService.getPeople(to.params.id)
        .then((response) => {
          GStore.patient = response.data
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            this.$router.push({
              name: '404Resource',
              params: { resoutce: 'patient' }
            })
          } else {
            this.$router.push({ name: 'NetworkError' })
          }
        })
    },
    children: [
      {
        path: '',
        name: 'PatientDetail',
        component: PatientDetailView,
        props: true
      },
      {
        path: '',
        name: 'PatientVaccineDetail',
        component: PatientVaccineDetailView,
        props: true
      },
      {
        path: '',
        name: 'ChangeImage',
        component: ChangeImage,
        props: true
      },
      {
        path: '',
        name: 'PatientComment',
        component: PatientCommentView,
        props: true
      }
    ]
  },
  {
    path: '/Doctor/:id',
    name: 'DoctorLayoutView',
    component: DoctorLayoutView,
    props: true,
    beforeEnter: (to) => {
      return DoctorService.getDoctor(to.params.id)
        .then((response) => {
          GStore.doctor = response.data
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            this.$router.push({
              name: '404Resource',
              params: { resoutce: 'doctor' }
            })
          } else {
            this.$router.push({ name: 'NetworkError' })
          }
        })
    },
    children: [
      {
        path: '/',
        name: 'DoctorDetail',
        component: DoctorDetailView,
        props: true
      },
      {
        path: '',
        name: 'DoctorChangeImage',
        component: DoctorChangeImage,
        props: true
      },
      {
        path: '',
        name: 'DoctorPatient',
        component: DoctorPatientView,
        props: (route) => ({
          page: parseInt(route.query.page) || 1,
          id: null
        })
      }
      // {
      //   path: '/DoctorPatientDetai',
      //   name: 'DoctorPatientDetailView',
      //   component: DoctorPatientDetailView,
      //   props: true
      // },
      // {
      //   path: '/DoctorComment',
      //   name: 'DoctorCommentView',
      //   component: DoctorCommentView,
      //   props: true
      // }
    ]
  },
  {
    path: '/Vaccine',
    name: 'VaccineDetail',
    component: VaccineDetailView,
    props: (route) => ({
      page: parseInt(route.query.page) || 1
    })
  },
  {
    path: '/DoctorPatient',
    name: 'DoctorPatientView',
    component: DoctorPatientView,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFoundView,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkEorror',
    component: NetWorkErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  NProgress.start
  NProgress.set(0.4)
})
router.afterEach(() => {
  NProgress.done()
})

export default router
