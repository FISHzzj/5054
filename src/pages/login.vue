<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <div class="login_con">
            <div class="logo">
                <img :src="logo" alt="" style="border-radius:50%;">
            </div>
            <div class="logo">
                <p class="fonts18">Wisdom Alliance International Group</p>
            </div>
            <div class="login">
                <div class="login_top">
                    <div class="selsect_con">
                        <div class="la_lf">
                            <input type="radio" class='zh' name='la' @click='translate(0)'>简体中文
                        </div>
                        <div class="la_ri">
                            <input type="radio" class='en' name="la" @click='translate(1)'>English
                        </div>
                    </div>
                    <div class="top_list">
                        <img :src="per_icon" alt="">
                        <input type="text" name="" :placeholder="this.$t('m.pleasename')" v-model='nickname' id="idnickname">
                    </div>
                    <div class="top_list">
                        <img :src="pass_icon" alt="">
                        <input type="password" name="" :placeholder="this.$t('m.inputpwd')" v-model='password' id="idpassword">
                    </div>
                    <!-- <div class="top_list">
                        <input type="text" id="idexpress" v-model="express" placeholder="请输入验证吗">
                        <img :src="express_src" alt="">
                    </div> -->
                    <div id="mpanel4"></div>
                 
                    <div class="login_btn">
                        <button @click='login'>{{$t('m.login')}}</button>
                    </div>
                </div>
                <div class="login_btm">
                    <label class="sh_title" >
                        <div style="display:inline" @click.stop='savepwdfn'>
                            <input type="checkbox" id="remember"/>
                            <span></span>{{$t('m.Remember')}}
                        </div>
                    </label>
                    <label class="sh_title" @click='forget'>
                        <label >{{$t('m.forget')}}</label>
                    </label>
                </div>
            </div>
            <!-- 忘记密码 -->
            <div class="forget_model">
                <div class="model">
                    <div class="mode_con">
                        <div class="bazaar_con">
                            <div class="bz_con_top">
                                {{$t('m.forget')}}
                            </div>
                            <div class="close sh_model_btm" @click='close'></div>
                            <div class="bz_ct_con">
                                <div class="bz_ct_con_list">
                                    <label for="" class="none_before">{{$t('m.uname')}}</label>
                                    <div class="input_con">
                                        <input type="text" v-model="uname">
                                    </div>
                                </div>
                                <div class="bz_ct_con_list">
                                    <label for="" class="none_before">{{$t('m.Number')}}</label>
                                    <div class="input_con">
                                        <input type="number" v-model="phonenumber">
                                    </div>
                                </div>
                                <div class="bz_ct_con_list">
                                    <label for="" class="none_before">{{$t('m.Code')}}</label>
                                    <div class="input_con">
                                        <input type="number" v-model="testcode">
                                    </div>
                                </div>
                                <div class="bz_ct_con_list" style='text-align:right'>
                                    <input type="button" class='sendcode' :value="this.$t('m.sendcode')" @click='sendcode'>
                                </div>
                                <div class="bz_ct_con_list">
                                    <label for="" class="none_before">{{$t('m.newPassword')}}</label>
                                    <div class="input_con">
                                        <input type="password" v-model="forgetpwd">
                                    </div>
                                </div>
                                <div class="bz_ct_con_list">
                                    <label for="" class="none_before">{{$t('m.affirmPassword')}}</label>
                                    <div class="input_con">
                                        <input type="password"  v-model="reforgetpwd">
                                    </div>
                                </div>
                                <button class="forget_submit" @click="forget_submit">{{$t('m.cash79')}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
// document.write('<script src="./static/js/jigsaw.min.js"><\/script>')

// 设置cookie
function setCookie(name,value){
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*3600*500);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
// 删除cookie
function delCookie(key) {
    var date = new Date();
    date.setTime(date.getTime() - 1);
    var delValue = getCookie(key);
    if (!!delValue) {
        document.cookie = key+'='+delValue+';expires='+date.toGMTString();
    }
}
// 获取cookie
function getCookie(key) {
    var arr,reg = RegExp('(^| )'+key+'=([^;]+)(;|$)');
    if (arr = document.cookie.match(reg))    //["username=liuwei;", "", "liuwei", ";"]
        return decodeURIComponent(arr[2]);
    else
        return null;
}

import URL from '../url.conf.js';
import '../../static/js/jquery.min.js'
import '../../static/js/verify.js'
// import axios from 'axios';
export default {
    data(){
        return{
            logo:'./static/img/logo.jpg',
            per_icon:'./static/img/per_icon.png',
            pass_icon:'./static/img/pass_icon.png',
            nickname:'',        //用户名
            password:'',        //密码
             express:'',         //验证码
            express_src:'./static/img/logo.png',         //验证码图片
            savepwd:'',
            imgOne:'./static/img/one.jpg',
            imgTwo:'./static/img/two.jpg',
            forget_show:false,
            uname:'',
            phonenumber:'',
            testcode:'',
            forgetpwd:'',
            reforgetpwd:'',
            yanzheng:'', //验证拼图
        }
    },
    mounted(){
        var _this=this;
        localStorage.setItem('dialogVisible',0);
        delCookie('open_id');
        // setTimeout(function(){
        //     jigsaw.init({
        //         el: document.getElementById('captcha'),
        //         onSuccess: function() {
        //         document.getElementById('msg').innerHTML = '验证成功！'
        //         },
        //         onFail: cleanMsg,
        //         onRefresh: cleanMsg
        //     })
          
        //     function cleanMsg() {
        //         document.getElementById('msg').innerHTML = ''
        //     }
        //     $('.sliderText').html(_this.$t('m.slide'));
        // },1000);
        
         $('#mpanel4').slideVerify({
		    	type : 2,		//类型
        		vOffset : 5,	//误差量，根据需求自行调整
		        vSpace : 5,	//间隔
		        // imgName : ['http://5054a.iiio.top/addons/sz_yi/static/images/one.jpg', 'http://5054a.iiio.top/addons/sz_yi/static/images/two.jpg'],
                imgName : [_this.imgOne,_this.imgTwo],

                imgSize : {
		        	width: '400px',
		        	height: '200px',
		        },
		        blockSize : {
		        	width: '40px',
		        	height: '40px',
		        },
		        barSize : {
		        	width : '400px',
		        	height : '40px',
		        },
		        ready : function() {
		    	},
		        success :()=>{
                    this.yanzheng = 1;
                    
		        	this.$toast.top('验证成功');
		        	//......后续操作
                    
		        },
		        error :()=> {
                    this.yanzheng = '';
				//	alert('验证失败！');
                    this.$toast.top('重新验证');
		        }
		
		    });
        if(sessionStorage.getItem('language')=='en'){
            $('.en').prop('checked','checked');
        }else{
            $('.zh').prop('checked','checked');
        }
        
        // 保存密码
        this.savepwd=localStorage.getItem('savepassword');
        if(this.savepwd==1){
            $('#remember').prop('checked','checked');
            this.nickname=localStorage.getItem('zh');
            this.password=localStorage.getItem('pwd');
        }
        
    },
    methods:{
        login(){
            console.log(this.yanzheng)
            if(this.nickname==''){
                this.$toast.top('请输入用户名');
                return;
            }
            if(this.password==''){
                this.$toast.top('请输入密码');
                return;
            }
            if(this.yanzheng == ''){
                this.$toast.top('请完成拼图');
                return;
            }
            var _this=this;
          
            this.axios.post(URL+'/app/index.php?i=1&c=entry&p=login&do=member&m=sz_yi', {
                'mobile': _this.nickname,
                'password': _this.password
            })
            .then(function (json) {
                if(json.data.status==1){
                    window.localStorage.setItem('firsten',1);
                    localStorage.setItem('dialogVisible',1);    // 公告
                   var open_id = json.data.result.open_id;
                   var cookieid = json.data.result.cookieid;
                   var cookiecontent = json.data.result.cookiecontent;
                   setCookie(cookieid,cookiecontent);     
                   setCookie('open_id',open_id);
               
                    if (typeof PINGPP_IOS_SDK !== 'undefined') {
                        PINGPP_IOS_SDK.appLogin(open_id);
                    } else if (typeof PINGPP_ANDROID_SDK !== 'undefined') {
                        PINGPP_ANDROID_SDK.appLogin(open_id);
                    }
                    if(_this.$route.query.redirect){
                        var redirect=_this.$route.query.redirect;
                        _this.$router.push(redirect);
                    }else{
                        
                        _this.$toast.top('登录成功');
                        if($('#remember').prop('checked')){
                            localStorage.setItem('zh',_this.nickname)
                            localStorage.setItem('pwd',_this.password)
                        }
                        setTimeout(function(){
                            $('.lx-toast').hide();
                            _this.$router.push({ path: '/' });
                        },1000)
                    }
                }else{
                    _this.$toast.top(json.data.result);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
             

        },
        // 切换语言
        translate(index){
            var _this=this;
            if(index==0){
                sessionStorage.setItem("language",'zh');

            }else{
                sessionStorage.setItem("language",'en');
                
            }
            
            window.location.reload();//刷新当前页面.
        },
        savepwdfn(){
            if($('#remember').prop('checked')){
                localStorage.setItem('savepassword',1)
            }else{
                localStorage.setItem('savepassword',0)
            }
        },
        // 忘记密码
        forget(){
            $('.forget_model').fadeIn();
        },
        // 关闭弹框
        close(){
             $('.forget_model').fadeOut();
        },
        // 发送验证码
        sendcode(){
            var _this=this;
            if(this.uname==''){
                _this.$toast.center('请输入用户名');
                return;
            }
            if(this.phonenumber==''){
                _this.$toast.center('请输入手机号');
                return;
            }
            _this.axios.post(URL+'/app/index.php?i=1&c=entry&p=sendcode&do=shop&m=sz_yi&op=bindmobilecode',{
                mobile:_this.phonenumber,
                uname:_this.uname,
            })
            .then(function(json){
                console.log(json)
                if(json.data.status==1){
                    _this.$toast.center('发送成功');
                    $('.sendcode').attr('disabled','disabled');
                    var time=60;
                    var settime=setInterval(function(){
                        $('.sendcode').attr('value','剩余'+time);
                        time--;
                        if(time==-1){
                            $('.sendcode').removeAttr('disabled');
                            $('.sendcode').attr('value','重新发送');
                            clearInterval(settime);
                        }
                    },1000)
                }else{
                    _this.$toast.center(json.data.result);
                }
            }).catch(function(error){
                console.log(error)
            })
        },
        // 忘记密码提交
        forget_submit(){
            var _this=this;
            
            if(this.uname==''){
                _this.$toast.center('请输入用户名');
                return;
            }
            if(this.phonenumber==''){
                _this.$toast.center('请输入手机号');
                return;
            }
            if(this.testcode==''){
                _this.$toast.center('请输入验证码');
                return;
            }
            if(this.forgetpwd==''){
                _this.$toast.center('请输入新密码');
                return;
            }
            if(this.forgetpwd!=this.reforgetpwd){
                _this.$toast.center('两次密码不一致');
                return;
            }
            _this.axios.post(URL+'/app/index.php?i=1&c=entry&do=shop&m=sz_yi&p=sendcode&op=checkcode',{
                uname:_this.uname,
                mobile:_this.phonenumber,
                testcode:_this.testcode,
                newpwd:_this.forgetpwd
            })
            .then(function(json){
                if(json.data.status==1){
                    _this.$toast.center('修改成功');
                    setTimeout(function(){
                        $('.forget_model').fadeOut();
                    },1000);
                    
                }else{
                    _this.$toast.center(json.data.result);
                }
            }).catch(function(error){
                console.log(error)
            })
        }
    }
    
}
</script>
<style scoped> 
    #mpanel4{
        margin-bottom:10px;
    }
    .verify-bar-area{
        background: #c1b2b2;
    }
    .verify-move-block{
        position: absolute;
        bottom: 0px;
    }
    .verify-img-panel{
        width: 100%!important;
        border:0;

    }
    html,body{
        background: #fff;
    }
    .login_con{
        padding: 100px 0 10px;
        text-align: center;
    }
    .logo{
        max-width: 340px;
        margin: 0 auto 10px;
    }
    .logo>img{
        width:52%;
    }
    .login{
        max-width: 340px;
        margin: 0 auto 140px;
        padding: 0px 0px 20px;
        /* padding: 20px 0px 15px; */
        background-color: #38485f;
        box-shadow: 0 5px 70px 0 rgba(11,16,22,.4);
    }
    .login_top{
        overflow: hidden;
        /* padding: 15px 0px; */
        width: 300px;
        margin: 0 auto;

    }
    .top_list{
        position: relative;
        background: #fff;
        border-radius: 5px;
        margin-bottom: 8px;
        line-height: 35px;
        width: 100%;
        height: 35px;
        overflow: hidden;
    }
    .top_list img{
        width:16px;
        vertical-align: middle;
        margin-right: 5px;
        position: absolute;
        left: 5px;
        top:9px;
        z-index: 1;
    }
    .top_list>input{
        border: none;
        outline: none;
        height: 100%;
        width:100%;
        position: absolute;
        padding-left: 30px;
        line-height: 35px;
        left: 0px;
    }
    .top_list:nth-child(3){
        background: none;
    }
    /* .top_list:nth-child(3)>img{
        width:35%;
        left: 65%;
    } */
    /* .top_list:nth-child(3)>input{
        width:60%;
        padding-left:8px;
        border-radius: 5px;
    } */
    .login_btn>button{
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        padding: 0;
        /* margin-top: 15px; */
        background-color: #0f87ff;
        border: none;
        outline: none;
        border-radius: 5px;
        color:#fff;
        cursor: pointer;
    }
    
    .login_btm{
        width: 100%;
        height: 40px;
        line-height: 40px;
        color:#fff;
        padding:0 3%;
    }
    input[type="checkbox"] {
        width: 16px;
        height: 16px;
        opacity: 0;
        display: none;
    }
    .sh_title{
        line-height: 40px;
        color:#b3b3b3;
        display:inline-block;
    }
    .sh_title span {
        position: relative;
        width: 16px;
        height: 16px;
        display: inline-block;
        border: 1px solid #999;
        background: #fff;
        border-radius: 3px;
        z-index: 200;
        top:3px;
        margin-right: 5px; 
    }
    input:checked+span {
        background-color: #0F87FF;
        border: 1px solid #0F87FF;
    }

    input:checked+span::after {
        position: absolute;
        content: "";
        width: 4px;
        height: 8px;
        top: 2px;
        left: 4px;
        border: 2px solid #fff;
        border-top: none;
        border-left: none;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        border-radius: 3px;
    }
    .sh_title:first-child{
        float: left;
    }
    .sh_title:last-child{
        float:right;
    }
    .logo>p{
        color:#fff;
        margin:5px 0px;
    }
    .logo>.fonts18{
        font-size: 18px;
        text-decoration: underline;
    }

    /* 图形验证 */
 
    .block {
        position: absolute;
        left: 0;
        top: 0;
    }

    .sliderContainer {
        position: relative;
        text-align: center;
        width: 100%!important;
        height: 40px;
        line-height: 40px;
        margin-top: 15px;
        background: #f7f9fa;
        color: #45494c;
        border: 1px solid #e4e7eb;
    }

    .sliderContainer_active .slider {
        height: 38px;
        top: -1px;
        border: 1px solid #1991FA;
    }

    .sliderContainer_active .sliderMask {
        height: 38px;
        border-width: 1px;
    }

    .sliderContainer_success .slider {
        height: 38px;
        top: -1px;
        border: 1px solid #52CCBA;
        background-color: #52CCBA !important;
    }

    .sliderContainer_success .sliderMask {
        height: 38px;
        border: 1px solid #52CCBA;
        background-color: #D2F4EF;
    }

    .sliderContainer_success .sliderIcon {
    background-position: 0 0 !important;
    }

    .sliderContainer_fail .slider {
        height: 38px;
        top: -1px;
        border: 1px solid #f57a7a;
        background-color: #f57a7a !important;
    }

    .sliderContainer_fail .sliderMask {
        height: 38px;
        border: 1px solid #f57a7a;
        background-color: #fce1e1;
    }

    .sliderContainer_fail .sliderIcon {
        top: 14px;
        background-position: 0 -82px !important;
    }
    .sliderContainer_active .sliderText, .sliderContainer_success .sliderText, .sliderContainer_fail .sliderText {
        display: none;
    }

    .sliderMask {
        position: absolute;
        left: 0;
        top: 0;
        height: 40px;
        border: 0 solid #1991FA;
        background: #D1E9FE;
    }

    .slider {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        background: #fff;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transition: background .2s linear;
    }

    .slider:hover {
        background: #1991FA;
    }

    .slider:hover .sliderIcon {
        background-position: 0 -13px;
    }

    .sliderIcon {
        position: absolute;
        top: 15px;
        left: 13px;
        width: 14px;
        height: 12px;
        background: url(http://cstaticdun.126.net//2.6.3/images/icon_light.f13cff3.png) 0 -26px;
        background-size: 34px 471px;
    }

    .refreshIcon {
        position: absolute;
        right: 0;
        top: 0;
        width: 34px;
        height: 34px;
        cursor: pointer;
        background: url(http://cstaticdun.126.net//2.6.3/images/icon_light.f13cff3.png) 0 -437px;
        background-size: 34px 471px;
    }
    #msg{
        line-height: 35px;
        color: #fff;
        height: 35px;
    }
    
    .selsect_con{
        color:#fff;
        height: 35px;
        line-height: 35px;
        font-size: 15px;
    }
    .selsect_con input{
        -webkit-appearance: radio;
        margin-top:0px!important;
        
    }
    .la_lf{
        height: 35px;
        float: left;
    }
    .la_ri{
        height: 35px;
        float: right;
    }
    /* 忘记密码 */
    .forget_model{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        margin: 0;
        background: rgba(0,0,0,.8);
        z-index: 999;
        display: none;
    }
    .model{
        position: relative;
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow: hidden;

    }
    .mode_con{
        background: #38485f;
        max-width: 340px;
        min-width: 310px;
        background-color: #38485f;
        -webkit-box-shadow: 0 5px 70px 0 rgba(11,16,22,.7);
        box-shadow: 0 5px 70px 0 rgba(11,16,22,.4);
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }

    .bazaar_con{
        border-radius: 4px;
        background: #3C4E66;
    }
    .bz_con_top{
        min-height: 50px;
        line-height: 30px;
        padding: 10px 30px;
        background-color: #38485f;
        box-shadow: 0 4px 10px 0 #2c394a;
        border-radius: 4px;
        font-size: 18px;
        color: #fff;
        text-align: left;
    }
    .bz_ct_con{
        max-width: 425px;
        margin: 0 auto;
        padding:25px 15px;
        font-size: 14px;
        
    }
    .bz_ct_con_list{
        position: relative;
        padding-left: 80px;
        margin-bottom: 17px;
    }
    .bz_ct_con_list>label{
       
        position: absolute;
        display: inline-block;
        left: 0;
        text-align: right;
        width: 65x;
        height: 35px;
        line-height: 35px;
        color: #9fa9b2;
    }
    .bz_ct_con_list>label::before{
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
    }
    .input_con>input,.input_con>span{
        height: 35px;
        line-height: 35px;
    }
    .bz_ct_con_list>span{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 103;
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
        display: inline-block;
        color:#0f87ff;
    }
    .input_con>input{
        width: 100%;
        padding-left: 5px;
        height: 35px;
        line-height: 35px;
        border: 1px solid #c1c1c1;
        border-radius: 4px;
        background: #2C394A;
        border:none;
        outline: none;
        color:#fff;
    }
    .forget_submit,.sendcode{
        background: #0d80f3;
        border-color: #0d80f3;
        color: #fff;
        width: 260px;
        max-width: 400px;
        height: 40px;
        border-radius: 5px;
        outline: none;
    }
    .sendcode{
        width:88px;
        height: 35px;
    }
    /* 关闭按钮 */
    .sh_model_btm{
        position: absolute;
        top:13px;
        right: 13px;
        width:24px;
        height: 24px;
        overflow: hidden;
        border-radius: 50%;
        border:1px solid #fff;
    }
    .sh_model_btm:before , .sh_model_btm::after{
        content: '';
        width:20px;
        height: 2px;
        background: #fff;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        position: absolute;
        left: 0;
        top:0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    .sh_model_btm:after{
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }

    
    @media screen and (max-width:320px){
        .logo>.fonts18{
            font-size: 16px;
        }
    }
    /* 移动端样式 */
    @media screen and (max-width:767px){
        .login_con{
            padding:6% 0;
            padding-bottom: 0px;
        }
        /* .logo{
            height: 80px;
        } */
        .login{
            width:94%;
            margin:0 auto;
        }
        .logo{
            width: 85%;
            margin: 0 auto 10px;
        }
        .login{
            max-width: 340px;
            margin: 0 auto 140px;
            padding: 0px 0px 15px;
            background-color: #38485f;
            box-shadow: 0 5px 70px 0 rgba(11,16,22,.4);
        }
    }

</style>
