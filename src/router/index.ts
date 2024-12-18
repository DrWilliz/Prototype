import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import AdminView from '@/views/AdminView.vue'
import NewProject from '@/views/NewProject.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
    {
      path: '/newproject',
      name: 'newproject',
      component: NewProject,
    }, 
    {
      path: '/users',
      name: 'users',
      component: AdminView,
    },
  ],
})

export default router
