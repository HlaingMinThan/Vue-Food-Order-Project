import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UserSetUp from '../views/UserSetUp.vue'
import {auth} from '../firebase/config' 
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/home/:name',
      name: 'Home',
      component: Home,
      beforeEnter:(to,from,next)=>{
        auth.onAuthStateChanged(user=>{
          if(user){
            next();
          }else{
            next({name:'LoginForm'});
          }

        });
      }
    },
    {
      path: '/',
      name: 'UserSetUp',
      component: UserSetUp
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue'),
      
    },
    {
      path: '/contact',
      name: 'Contact',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Contact.vue')
    },
    {
      path:'/admin',
      name:'Admin',
      component:()=>import('../auth/Admin.vue'),
      beforeEnter:(to,from,next)=>{
        auth.onAuthStateChanged(user=>{
          if(user){
            next();
          }else{
            next({name:'LoginForm'});
          }

        });
      }
    },
    {
      path:'/loginform',
      name:'LoginForm',
      component:()=>import('../auth/LoginForm.vue')
    },
    {
      path:'/userprofile',
      name:'UserProfile',
      component:()=>import('../views/UserProfile.vue')
    }
],


  // base: process.env.BASE_URL,
  // routes
});

export default router
