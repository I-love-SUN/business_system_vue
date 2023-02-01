import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export const resetRouter =()=>{
  router.matcher = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
}

router.afterEach((to, from, next) => {
  document.querySelector("body").setAttribute("style", "overflow: auto !important;")
});

export const setRoutes =()=>{
  const  storemenus = localStorage.getItem("menus")
  if(storemenus){
    //拼装动态路由
    const manageRoute ={path: '/', name: 'main', component: () =>import('../views/main'), redirect:"/login",children:[
        // {
        //   path: 'person',
        //   name: 'Person',
        //   component:() => import("../views/front/Person.vue")
        // },
      ]}

    const  menus = JSON.parse(storemenus)

    menus.forEach(item =>{
      if(item.path){
        let itemMenu = {path: item.path.replace("/",""), name: item.name, component: () =>import('../views/'+item.pagePath + '.vue')}
        manageRoute.children.push(itemMenu)
      }else if(item.children.length) {
        item.children.forEach(item => {
          if (item.path) {
            let itemMenu = { path: item.path.replace("/", ""), name: item.name, component: () => import('../views/' + item.pagePath + '.vue')}
            manageRoute.children.push(itemMenu)
          }
        })
      }
    })

    const currencyRoutes = router.getRoutes().map(v=>v.name)
    if(!currencyRoutes.includes('main')){
      router.addRoute(manageRoute)
    }
  }
}

// 重置我就再set一次路由
setRoutes()

router.beforeEach((to,from,next)=>{

  localStorage.setItem("currentPathName",to.name)  //设置当前路由的名称

  if(!to.matched.length)
  {
    const  storeMenus = localStorage.getItem("menus")
    if(storeMenus){
      next("/404")
    } else {
      next("/login")
    }
  }
  next()

})

export default router

