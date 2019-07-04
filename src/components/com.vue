
<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 头部 -->
        <div class="top">
            <div class="top1 clearfix">
                <div class="top1_lf" @click="con_lf_show">
                    <img src="../../static/img/left_top.png" alt="">
                </div>
                <div class="top1_ri clearfix" @click='top1_ri2_show'>
                    <img src="../../static/img/set.png" alt="">
                </div>
                <div class="top1_ri2 clearfix" :class="{show:show_top1_ri2}" >
                    <div class="top1_ri2_list" @click="top_ri2_down_show">
                        <img :src="language_img" alt="">
                        <span>{{language_text}}</span>
                        <span class="sh_arrow sh_fff sh_btm"></span>
                        <div class="top_ri2_down" :class="{show:show_top_ri2_down}">
                            <div class="top_down_list" v-for="(item,index) in language" @click='translate(index)'  :key="index">
                                <img :src='item.src' alt="">
                                <span>{{ item.name }}</span>
                            </div>
                           
                        </div>
                    </div>
                    <div class="top1_ri2_list">
                        <img src='../../static/img/head.jpg' alt="">
                        <span class="nickname">{{nickname}}</span>
                    </div>
                    <div class="top1_ri2_list" @click="quitfn">
                        <img :src='exitsrc' alt="">
                    </div>
                </div>
            </div>
            <div class="top2">
                <div class="top2_lf">
                    <span class="top2_lf_text1">{{$t('m.location')}}:</span>
                    <span class="top2_lf_text2">{{now_add}}</span>
                </div>
                <div class="top2_ct" :class='{show:show_top2_ct}'>
                    <router-link :to="item.url"  v-for="(item,index) in top2_ct" :key="index">
                        <span :class="{top2_ct_active:top2_indwx==index}" >{{item.text}}</span>

                    </router-link>
                </div>
                <div class="arrow_down" @click="top2_ct_show"></div>
            </div>
        </div>
        <!-- 主体内容 -->
        <div class="con">
            <div class="con_lf">
                <div class="con_lf_1" v-show="con_lf">
                    <div class="log">
                        <img src="../../static/img/logo.jpg" alt="" style="border-radius:50%;">
                    </div>
                    <router-link :to="item.url" v-for="(item,index) in lf_list" :key="index">
                        <div class="con_lf_1_list"  :class="{lf_1_list_active:lf_1_list_index==index}">
                            <img :src="item.src" alt="">
                            <div class="hover_text">{{item.text}}</div>
                        </div>
                    </router-link>
                </div>
                <div class="con_lf_2" v-show="!con_lf">
                    <div class="log" style="margin-bottom:10px;">
                        <img src="../../static/img/logo.jpg" alt="" style="border-radius: 50%;">
                    </div>
                    <router-link :to="item.url" v-for="(item,index) in lf_list" :key="index">
                        <div class="con_lf_2_list clearfix" :class="{con_lf_2_list_active:lf_1_list_index==index}">
                            <div class="con_lf_2_lf" :class="{lf_2_list_active:lf_1_list_index==index}">
                                <img :src="item.src" alt="">
                            </div>
                            <div class="con_lf_2_ri">
                                <img :src="item.src" alt="" :class="{lf_2_list_img_active:lf_1_list_index==index}">
                                <span>{{item.text}}</span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <!-- <div class="con_ri"></div> -->
        </div>
        <!-- 遮罩层 -->
        <!-- <div class="shade_con">

        </div> -->
    </div>
</template>
<script>
    import URL from '../url.conf.js';

    

    export default {
        props:['lfIndex','topData','topIndex','nowAdd'],
        data(){
            return{
                language_text:this.$t('m.language_text'),
                language_img:'',
                now_add:'',           //当前位置
                nickname:'',
                header_img:'./static/img/head.jpg',
                show_top1_ri2:false,
                show_top_ri2_down:false,
                show_top2_ct:false,
                con_lf:false,                //控制左侧菜单栏
                top2_indwx:'',               //所在位置类
                lf_1_list_index:'',          //左侧菜单1
                exitsrc:'./static/img/exit.png',
                language:[
                    {src:'./static/img/china.png',name:'中文简体'},
                    {src:'./static/img/english.png',name:'English'}
                ],
                top2_ct:'', 
                lf_list:[
                    {src:'./static/img/index0.png',text:this.$t('m.top1'), url:'/'},
                    {src:'./static/img/index1.png',text:this.$t('m.top2'), url:'/person'},
                    {src:'./static/img/index2.png',text:this.$t('m.top3'), url:'/bazaar'},
                    {src:'./static/img/index3.png',text:this.$t('m.top4'), url:'/my'},
                    {src:'./static/img/index4.png',text:this.$t('m.top5'), url:'/finance'},
                    {src:'./static/img/index5.png',text:this.$t('m.top6'), url:'/bonus'},
                    {src:'./static/img/index6.png',text:this.$t('m.top7'), url:'/deal'},
                    // {src:'./static/img/index7.png',text:'新闻公告', url:'/'},
                    // {src:'./static/img/index8.png',text:'信息中心', url:'/'}
                ],

            }
        },
        methods:{
            top1_ri2_show(){
                this.show_top1_ri2=!this.show_top1_ri2;
            },
            top_ri2_down_show(){
                this.show_top_ri2_down=!this.show_top_ri2_down;
            },
            top2_ct_show(){
                this.show_top2_ct=!this.show_top2_ct;
            },
            // 左侧显示
            con_lf_show(){
                this.con_lf=!this.con_lf;
                $('.index_con').css('transition','all .3s');
                if(this.con_lf){
                    localStorage.setItem('left',1);
                    $('.index_con').css('margin-right','0px');
                    
                    if($(window).width()>767){
                        $('.index_con').css('margin-left','50px');
                    }else{
                        $('.index_con').css('margin-left','0px');

                    }
                }else{
                    localStorage.setItem('left',2)
                    if($(window).width()>767){
                        $('.index_con').css('margin-left','256px');
                    }else{
                        $('.index_con').css('margin-left','200px');
                        $('.index_con').css('margin-right','-200px');
                        
                    }
                    
                }
            },
            // 获取缓存left
            getleft(){
                var left_index=localStorage.getItem('left');
                $('.index_con').css('min-height',$(window).height()-90);
                if(left_index==1){
                    this.con_lf=true;
                    if($(window).width()>767){
                        $('.index_con').css('margin-left','50px');
                    }else{
                        $('.index_con').css('margin-left','0px');
                    }
                }else{
                    if($(window).width()>767){
                        this.con_lf=false;
                        $('.index_con').css('margin-left','256px');
                    }else{
                        this.con_lf=true;
                        $('.index_con').css('margin-left','0px');
                    }
                }
            },
            // 退出登录
            quitfn() {
                var _this=this;
                this.$confirm('确认退出登录', '系统提醒', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 确定
                    _this.$router.push({ path: '/login'});
                }).catch(() => {
                    // 取消    
                });
            },
            // 切换言语
            translate(index){
                var _this=this;
                if(index==0){
                    sessionStorage.setItem("language",'zh');

                }else{
                    sessionStorage.setItem("language",'en');
                    
                }
                
                window.location.reload();//刷新当前页面.
            },

            // 获取cookie
            getCookie(key) {
                var arr,reg = RegExp('(^| )'+key+'=([^;]+)(;|$)');
                if (arr = document.cookie.match(reg))    //["username=liuwei;", "", "liuwei", ";"]
                    return decodeURIComponent(arr[2]);
                else
                    return null;
            }
            
        },
        mounted(){
            
            this.lf_1_list_index=this.lfIndex;
            this.top2_ct=this.topData;
            this.top2_indwx=this.topIndex;
            this.now_add=this.nowAdd;
            this.getleft();
            if(sessionStorage.getItem('language')=='en'){
                this.language_img='./static/img/english.png';
            }else{
                this.language_img='./static/img/china.png';
               
            }

            // 加载用户信息
            var _this=this;
            this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=getUserinfo')
                .then(function (json) {
                    // console.log(json)
                    var data=json.data.result;
                    if(json.data.status==1){
                        _this.nickname=data.mem.account;
                        
                    }else{
                        _this.$toast.center(json.data.result);
                        setTimeout(()=>{
                            _this.$router.push({ path: '/login' });
                        },2500)
                    }
                
                })
                .catch(function (error) {
                    // console.log(error);
            });
            // 登录验证
            var login_id=this.getCookie('open_id');
            if(login_id=='' || login_id==null){
                _this.$router.push({ path: '/login' });
            }

        }
        

    }
</script>

<style>
    @import url('../../static/css/com.css');
    @import url('../../static/css/comm.css');
</style>
