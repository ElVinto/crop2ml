import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../components/Welcome';
import Repository from '../components/Repository';
import Submit from '../components/Submit';
import Profile from '../components/Profile';
import LegalMentions from '../components/LegalMentions.vue';

import SignIn from '../components/auth/SignIn';
import SignOut from '../components/auth/SignOut';
import Register from '../components/auth/Register';
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';

import Communities from '../components/community/Communities';
import NewCommunity from '../components/community/NewCommunity';
import EditCommunity from '../components/community/EditCommunity';
import ViewCommunityDetails from '../components/community/ViewCommunityDetails';


Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Welcome',
      component: Welcome
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
      path: '/Edit/:modelid',
      name: 'Edit',
      component: Submit,
      props: true
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
      path: '/ValidateRegistration',
      name: 'ValidateRegistration',
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

    {
      path: '/Communities',
      name: 'Communities',
      component: Communities
    },

    {
      path: '/NewCommunity',
      name: 'NewCommunity',
      component: NewCommunity
    },

    {
      path: '/EditCommunity',
      name: 'EditCommunity',
      component: EditCommunity,
      props:true
    },

    {
      path: '/ViewCommunityDetails',
      name: 'ViewCommunityDetails',
      component: ViewCommunityDetails,
      props:true
    },

  ]
})
