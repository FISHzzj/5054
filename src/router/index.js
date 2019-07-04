import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import person from '@/pages/person'
import index from '@/pages/index'
import bazaar from '@/pages/bazaar'
import bonus from '@/pages/bonus'
import deal from '@/pages/deal'
import my from '@/pages/my'
import reactive from '@/pages/reactive'
import upgrade from '@/pages/upgrade'
import update from '@/pages/update'
import passwordmana from '@/pages/passwordmana'
import straightlist from '@/pages/straightlist'
import bonusdet from '@/pages/bonusdet'
import finance from '@/pages/finance'
import cashdeal from '@/pages/cashdeal'
import transition from '@/pages/transition'
import tbetween from '@/pages/tbetween'
import title from 'vue-wechat-title'
Vue.use(Router);
Vue.use(title);
// Vue.use(require('vue-wechat-title'));
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{
        title:'首页',
        requireAuth: true, // 判断是否需要登录
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        title:'登录'
      }
    },
    {
      path: '/person',
      name: 'person',
      component: person,
      meta:{
        title:'个人资料',
        requireAuth: true,
      }
    },
    {
      path: '/bazaar',
      name: 'bazaar',
      component: bazaar,
      meta:{
        title:'市场管理',
        requireAuth: true,
      }
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      meta:{
        title:'我的网络',
        requireAuth: true,
      }
    },
    {
      path: '/bonus',
      name: 'bonus',
      component: bonus,
      meta:{
        title:'奖金管理',
        requireAuth: true,
      }
    },
    {
      path: '/deal',
      name: 'deal',
      component: deal,
      meta:{
        title:'交易大厅',
        requireAuth: true,
      }
    },
    {
      path: '/straightlist',
      name: 'straightlist',
      component: straightlist,
      meta:{
        title:'列表直推',
        requireAuth: true,
      }
    },
    {
      path: '/upgrade',
      name: 'upgrade',
      component: upgrade,
      meta:{
        title:'会员升级',
        requireAuth: true,
      }
    },
    {
      path: '/reactive',
      name: 'reactive',
      component: reactive,
      meta:{
        title:'重新激活',
        requireAuth: true,
      }
    },
    {
      path: '/update',
      name: 'update',
      component: update,
      meta:{
        title:'修改资料',
        requireAuth: true,
      }
    },
    {
      path: '/passwordmana',
      name: 'passwordmana',
      component: passwordmana,
      meta:{
        title:'密码管理',
        requireAuth: true,
      }
    },
    {
      path: '/bonusdet',
      name: 'bonusdet',
      component: bonusdet,
      meta:{
        title:'奖金详情',
        requireAuth: true,
      }
    },
    {
      path: '/finance',
      name: 'finance',
      component: finance,
      meta:{
        title:'财务管理',
        requireAuth: true,
      }
    },
    {
      path: '/cashdeal',
      name: 'cashdeal',
      component: cashdeal,
      meta:{
        title:'现金交易大厅',
        requireAuth: true,
      }
    },
    {
      path: '/transition',
      name: 'transition',
      component: transition,
      meta:{
        title:'额度转换',
        requireAuth: true,
      }
    },
    {
      path: '/tbetween',
      name: 'tbetween',
      component: tbetween,
      meta:{
        title:'会员转换',
        requireAuth: true,
      }
    }
  ],
})

