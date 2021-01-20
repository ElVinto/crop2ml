import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../components/Welcome';
import Catalog from '../components/Catalog';
import Repository from '../components/Repository';
import Submit from '../components/Submit';

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


  ]
})
