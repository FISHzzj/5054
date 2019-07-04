// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import './components/Toast/toast.css';
import Toast from './components/Toast/toast';
import axios from 'axios';
import ElementUI from 'element-ui';  //引入element-ui
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n'      //引入vue-i18n
import  VConsole  from  'vconsole'
// const  vConsole = new VConsole() //注意 
Vue.prototype.axios=axios;
Vue.use(Toast);
Vue.use(VueI18n);
Vue.use(ElementUI);

const i18n = new VueI18n({
    locale: sessionStorage.getItem('language') || 'zh', // 语言标识
    messages: {
        'zh': require('./lang/zh'), // 中文语言包
        'en': require('./lang/en') // 英文语言包
    }
})
Vue.config.productionTip = false
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
function getCookie(key){
  var arr1=document.cookie.split("; ");//由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
  for(var i=0;i<arr1.length;i++){
    var arr2=arr1[i].split("=");//通过=截断，把name=Jack截断成[name,Jack]数组；
    if(arr2[0]==key){
      return decodeURI(arr2[1]);
    }
  }
}
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    if (getCookie('open_id')) { // 判断当前的token是否存在 ； 登录存入的token
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});
