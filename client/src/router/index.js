import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../components/Welcome';
import Catalog from '../components/Catalog';
import Repository from '../components/Repository';
import Submit from '../components/Submit';

import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import Register from '../components/Register';
import Profile from '../components/Profile';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';


import LegalMentions from '../components/LegalMentions.vue';

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },

    {
      path: '/Catalog',
      name: 'Catalog',
      component: Catalog
    },

    {
      path: '/Repository',
      name: 'Repository',
      component: Repository
    },

    {
      path: '/Submit',
      name: 'Submit',
      component: Submit
    },

    {
      path: '/LegalMentions',
      name: 'LegalMentions',
      component: LegalMentions
    },

    {
      path: '/SignIn',
      name: 'SignIn',
      component: SignIn
    },

    {
      path: '/SignOut',
      name: 'SignOut',
      component: SignOut
    },

    {
      path: '/Register',
      name: 'Register',
      component: Register
    },

    {
      path: '/Profile',
      name: 'Profile',
      component: Profile
    },

    {
      path: '/ForgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword
    },

    {
      path: '/ResetPassword',
      name: 'ResetPassword',
      component: ResetPassword
    },

  ]
})
