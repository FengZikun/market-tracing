import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import { getSessionStorage, setSessionStorage, removeSessionStorage } from '@/utils/auth'

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } 
    else {
        const roles = [getSessionStorage('SET_ROLES')];
        if ((roles.indexOf('root') >= 0
          || roles.indexOf('admin') >= 0
          || roles.indexOf('centerRoot') >= 0
          || roles.indexOf('centerAdmin') >= 0
          || roles.indexOf('marketRoot') >= 0
          || roles.indexOf('marketAdmin') >= 0)
          && store.getters.addRouters.length > 0
          && roles[0] === store.getters.addRouters[0].meta.roles[0]) {
          next()
        } else {
          store.dispatch('GenerateRoutes', { roles }).then(() => {
          router.addRoutes(store.getters.addRouters)       
          next(to.path)
          })
        }
        
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
