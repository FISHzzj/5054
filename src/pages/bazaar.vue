<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 公共部分 -->
       <my-Com :lf-index=2 :top-data="topData" :top-index=0 :now-add="this.$t('m.memberRegistration')" ></my-Com>
        
        <img class="loading" v-show="loading" src="../../static/img/loading.gif" alt="">
        
       <div class="index_con">
           <div class="bazaar_con">
               <div class="bz_con_top">
                   {{$t('m.register')}}
               </div>
               <div class="bz_ct_con">
                    <div class="bz_ct_con_list">
                       <label for="">{{$t('m.account')}}</label>
                       <div class="input_con">
                           <input type="text"  v-model="login_name" :placeholder="this.$t('m.inputAccount')">
                           <span class="input_null" v-if="tip_show && login_name==''">{{$t('m.inputAccount')}}</span>
                       </div>
                       <!-- <span>自动生成</span> -->
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{$t('m.realName')}}</label>
                       <div class="input_con">
                           <input type="text" :placeholder="this.$t('m.inputRealName')" v-model="name" >
                           <span class="input_null" v-if="tip_show && name==''">{{$t('m.inputRealName')}}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{$t('m.ReferenceNumber')}}</label>
                       <div class="input_con">
                           <input type="text" :placeholder="this.$t('m.ReferenceNumber')" v-model="account"  readonly>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{$t('m.PlacerNumber')}}</label>
                       <div class="input_con">
                           <input type="text" :placeholder="this.$t('m.inputPlacerNumber')" v-model="bianhao" >
                           <span class="input_null" v-if="tip_show && bianhao==''">{{$t('m.inputPlacerNumber')}}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{$t('m.PlacementPosition')}}</label>
                       <div class="input_con">
                           <select v-model="anzhiposition">
                               <option value="0">{{$t('m.inputPlacementPosition')}}</option>
                               <option value="1">{{$t('m.left')}}</option>
                               <option value="2">{{$t('m.right')}}</option>
                           </select>
                           <span class="input_null" v-if="tip_show && anzhiposition=='0'">{{$t('m.inputPlacementPosition')}}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{$t('m.cellPhoneNumber')}}</label>
                       <div class="input_con">
                           <input type="number" :placeholder="this.$t('m.inputcellPhoneNumber')" v-model="iphone" >
                           <span class="input_null" v-if="tip_show && iphone==''">{{$t('m.inputcellPhoneNumber')}}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{$t('m.activationLevel')}}</label>
                       <div class="input_con">
                           <select v-model="level" @change="select_level($event)"  class='select_level'>
                               <option value="0">{{$t('m.selectactivationLevel')}}</option>
                               <option :value="item.id" v-for="(item,index) in memberlevel" :key="index" :data-money='item.hf'>{{item.levelname}}</option>
                           </select>
                           <span class="input_null" v-if="tip_show && level=='0'">{{$t('m.selectactivationLevel')}}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list register" style='line-height:35px;'>
                       <label for="">{{$t('m.baz1')}}</label>
                       <div class="input_con" style="color:#fff;text-align:left;">
                           &nbsp;{{registericon}}
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{$t('m.loginpassword')}}</label>
                       <div class="input_con">
                           <input type="password" :placeholder="this.$t('m.inputloginpassword')"  v-model="loginpassword">
                           <span class="input_null" v-if="tip_show && loginpassword==''">{{$t('m.inputloginpassword')}}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{$t('m.ConfirmLoginPassword')}}</label>
                       <div class="input_con">
                           <input type="password" :placeholder="this.$t('m.inputCfl')"  v-model="loginrepassword">
                           <span class="input_null" v-if="tip_show && loginrepassword==''">{{$t('m.inputCfl')}}</span>
                           <span class="input_null" v-else-if="tip_show && loginpassword != loginrepassword">{{$t('m.passwordsMatch')}}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{$t('m.dealpassword')}}</label>
                       <div class="input_con">
                           <input type="password" :placeholder="this.$t('m.inputdealpassword')"  v-model="dealpassword">
                           <span class="input_null" v-if="tip_show && dealpassword==''">{{$t('m.inputdealpassword')}}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{$t('m.confdealpassword')}}</label>
                       <div class="input_con">
                           <input type="password" :placeholder="this.$t('m.inpdealpwd')"  v-model="dealrepassword">
                           <span class="input_null" v-if="tip_show && dealrepassword==''">{{$t('m.inpdealpwd')}}</span>
                           <span class="input_null" v-else-if="tip_show && dealrepassword != dealpassword">{{$t('m.passwordsMatch')}}</span>
                           
                       </div>
                    </div>
                    <div class="bz_ct_con_list" style="height:40px;">
                        <label class="sh_title">
                            <input type="checkbox" checked id="remember" name=""/>
                            <span></span>{{$t('m.registrationProtocol')}}
                        </label>
                    </div>
                    <button class="resig"  @click="register" :disabled="isdisabled">{{$t('m.register')}}</button>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
    import myCom from '../components/Com';
    import URL from '../url.conf.js';
    export default {
        data(){
            return{
                topData:[
                    {url:'./bazaar',text:this.$t('m.memberRegistration')},
                    {url:'./straightlist',text:this.$t('m.StraightPushList')},
                    {url:'./upgrade',text:this.$t('m.MembershipUpgrade')},
                    {url:'./reactive',text:this.$t('m.reActivation')}
                ],
                loading: false,           //遮罩层
                account:'',         //推荐人编号
                memberlevel:'',     //等级
                registericon:0,
                tip_show:false,
                // 需要判断的数据
                login_name:'',
                name:'',
                bianhao:'',
                anzhiposition:'0',
                iphone:'',      //手机号码
                level:'0',
                loginpassword:'',
                loginrepassword:'',
                dealpassword:'',
                dealrepassword:'',
                isdisabled:false,

                //推荐人名称和安置位置
                anzhiname:'',
            }
        },
        components: {
    		myCom,
    	},
        mounted(){
            this.anzhiname=this.$route.query.anzhiid;
            this.anzhiposition=this.$route.query.anzhiposition || '0';
            this.onreload();
        },
        methods:{
            // 注册
            register(){
                if(this.login_name==''){
                    this.tip_show=true;
                    return;
                }
                if(this.name==''){
                    this.tip_show=true;
                    return;
                }
                if(this.bianhao==''){
                    this.tip_show=true;
                    return;
                }
                if(this.anzhiposition=='0'){
                    this.tip_show=true;
                    return;
                }
                if(this.iphone==''){
                    this.tip_show=true;
                    return;
                }
                if(this.level=='0'){
                    this.tip_show=true;
                    return;
                }
                if(this.loginpassword==''){
                    this.tip_show=true;
                    return;
                }
                if(this.loginrepassword==''){
                    this.tip_show=true;
                    return;
                }
                if(this.loginpassword!=this.loginrepassword){
                    this.tip_show=true;
                    return;
                }
                if(this.dealpassword==''){
                    this.tip_show=true;
                    return;
                }
                if(this.dealrepassword==''){
                    this.tip_show=true;
                    return;
                }
                if(this.dealpassword!=this.dealrepassword){
                    this.tip_show=true;
                    return;
                }
                var _this=this;

                // $.ajax({
                //     url:URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=bdsub',
                //     type:"post",
                //     async:false,        //同步
                   
                //     data:{
                         
                //         account:_this.login_name,
                //         realname:_this.name,
                //         anzhiid:_this.bianhao,
                //         anzhiposition:_this.anzhiposition,
                //         mobile:_this.iphone,
                //         level:_this.level,
                //         loginpassword:_this.loginpassword,
                //         dealpassword:_this.dealpassword
                //     },
                //     dataType:"json",//返回的数据类型，常用：html/text/json
                //     success:function(json){
                //         console.log(json)
                //         if(json.status==0){
                //             _this.$toast.center(json.result);
                //         }else{
                //             _this.$toast.center(json.result);
                //             setTimeout(function(){
                //             window.location.reload();
                //             },1000)
                //         }
                        
                //     }
                // })
                _this.isdisabled=true;
                setTimeout(function(){
                    _this.loading = true;
                },300)
                
                this.axios.post(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=bdsub',
                    {
                        account:_this.login_name,
                        realname:_this.name,
                        anzhiid:_this.bianhao,
                        anzhiposition:_this.anzhiposition,
                        mobile:_this.iphone,
                        level:_this.level,
                        loginpassword:_this.loginpassword,
                        dealpassword:_this.dealpassword,

                    })
                    .then(function (json) {
                        _this.loading = false;
                        _this.isdisabled=false;
                        if(json.data.status==1){
                           _this.$toast.center(json.data.result);
                           setTimeout(function(){
                            window.location.reload();
                            },1000)
                        }else{
                           _this.$toast.center(json.data.result);
                            
                        }
                        
                    })
                    .catch(function (error) {
                        _this.isdisabled=false;
                        _this.loading = false;
                        console.log(error);
                        this.$toast.center(error);
                    });
            },
            //进页面加载
            onreload(){
                var _this=this
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=bd&anzhiid='+_this.$route.query.anzhiid+'&anzhiposition='+_this.$route.query.anzhiposition)
                    .then(function (json) {
                        var data=json.data.result;
                        if(json.status==200){
                            _this.account=data.member.account;
                            _this.memberlevel=data.memberlevel;
                            // _this.registericon=data.hf
                            if(data.anzhiid=='undefined'){
                                _this.bianhao='';
                            }else{
                                _this.bianhao=data.anzhiid;
                            }
                        }
                    
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            },
            // 等级对应的注册币
            select_level(e){
                let val=$(e.currentTarget).val();
                let money=$('.select_level option[value='+val+']').attr('data-money');
                this.registericon=money;
            }
        }
    }
</script>

<style scoped>
    
    .clearfix:after, .clearfix:before {
        display: table;
        content: " ";
    }
    input,select{
        border:none;
        outline: none;
    }
    .clearboth{
        clear: both;
    }
    .index_con{
        background:#4F647F;
        margin-left: 256px;
        padding-bottom: 40px;
        /* transition: all .3s; */
    }
    .bazaar_con{
        margin:40px;
        border-radius: 4px;
        background-color: #3c4e66;
         padding-bottom: 40px;
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
        padding:15px;
        font-size: 14px;
    }
    .bz_ct_con_list{
        position: relative;
        padding-left: 190px;
        margin-bottom: 7px;
    }
    .bz_ct_con_list>label{
       
        position: absolute;
        display: inline-block;
        left: 0;
        text-align: right;
        width: 170px;
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
    .input_con>input, .input_con>select{
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
    .input_con>select{
        height: 35px;
        line-height: 35px;
        background-color: #2c394a;
        border: 1px solid #2c394a!important;
        color: #fff;
        letter-spacing: normal;
        word-spacing: normal;
        text-transform: none;
        text-indent: 0px;
        text-shadow: none;
        display: inline-block;
        text-align: start;
        margin: 0em;
        width:100%;
    }
    .sh_title{
        line-height: 35px;
        color:#b3b3b3;
        display:inline-block;
        margin-left: 10%;
    }
    .bz_ct_con_list>.sh_title:before{
        content: '';
    }
    .sh_title input{
        display: none;
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
    .bz_ct_con_list>.sh_title{
        color:#0F87FF;
    }
    .input_con>.input_null{
        color: red;
        display: inline-block;
        padding: 2px 0;
        width: 100%;
        height: 23px;
        text-align: left;
        /* display: none; */
    }
    .resig{
        background: #0d80f3;
        border-color: #0d80f3;
        color: #fff;
        width: 260px;
        max-width: 400px;
        height: 40px;
        border-radius: 5px;
        outline: none;
    }
    @media screen and (max-width: 767px){
        .bazaar_con{
            margin:0px;
        }
        .bz_ct_con_list{
            padding-left:0px;
        }
        .bz_ct_con_list>label{
            position: static;
            width:100%;
            text-align: left;
        }
        .register{
            text-align: left;
            margin-bottom: 0px;
        }
        .register>label{
            width:auto;
        }
        .register>div{
            display: inline-block;
        }
    }
    .loading{
        position: fixed;
        z-index: 1000;
        top:50%;
        left: 50;
        width: 65px;
        height: 65px;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
    }
</style>