import Vue from 'vue'
import Router from 'vue-router'

import LoginLayout from '@/layouts/LoginLayout.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import Templates from '@/views/Templates.vue'

import Delivery from '@/components/Delivery.vue'
import Citas from '@/components/Citas.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth',
      component: LoginLayout,
      children: [
        {
          path: '',
          name: 'Login',
          component: LoginForm,
        },
        {
          path: 'register',
          name: 'Register',
          component: RegisterForm,
        },
      ],
    },
    {
      path: '/no-signed',
      name: 'NoSigned',
      component: Templates,
      children: [

        {
          path: '/delivery',
          name: 'Delivery',
          component: Delivery,
        },
        {
          path: '/citas',
          name: 'Citas',
          component: Citas,
        },
      ]
    },
    {
        path: '*',
        redirect: '/auth',
    }
  ],
})
