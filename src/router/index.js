import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded route components
const HomeView = () => import('../views/HomeView.vue')
const PostDetailView = () => import('../views/PostDetailView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: "Edy's Blog — Home" }
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetailView,
    meta: { title: "Edy's Blog — Post" }
  },
  {
    // Catch-all 404 route — must be last
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { title: "Edy's Blog — Page Not Found" }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

// Update document title on each navigation
router.afterEach((to) => {
  document.title = to.meta.title || "Edy's Blog"
})

export default router
