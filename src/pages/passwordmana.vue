<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 公共部分 -->
       <my-Com :lf-index=1 :top-data="topData" :top-index=2 :now-add='this.$t("m.PasswordManagement")'></my-Com>
       <div class="index_con">
           <div class="up_con">
                <div class="up_con_top">
                   {{$t('m.PasswordManagement')}}
                </div>
                <div class="up_select_con">
                    <div class="up_se_list up_se_list_ac" data-id=0 @click='select_con($event)'>{{$t('m.loginpassword')}}</div>
                    <div class="up_se_list" data-id=1 @click='select_con($event)'>{{$t('m.dealpassword')}}</div>
                </div>
                <div class="up_ct_con">
                    <div class="container" v-if="container_show">
                        <div class="container_list">
                            <label for="">{{$t('m.OriginalPassword')}}</label>
                            <div class="input_con">
                                <input type="password" :placeholder="this.$t('m.inputOriginalPassword')" v-model="ypwd">
                                <span class="input_null" v-if="tip_show && ypwd==''">{{$t('m.inputOriginalPassword')}}</span>
                            </div>
                        </div>
                        <div class="container_list">
                            <label for="">{{$t('m.NewPassword')}}</label>
                            <div class="input_con">
                                <input type="password" :placeholder="this.$t('m.inputNewPassword')" v-model="pwd">
                                <span class="input_null" v-if="tip_show && pwd==''">{{$t('m.inputNewPassword')}}</span>
                            </div>
                        </div>
                        <div class="container_list">
                            <label for="">{{$t('m.ConfirmPpassword')}}</label>
                            <div class="input_con">
                                <input type="password" :placeholder="this.$t('m.inputNewPassword')" v-model='repwd'>
                                <span class="input_null" v-if="tip_show && repwd==''">{{$t('m.inputConfirm')}}</span>
                                <span class="input_null" v-else-if="tip_show && repwd != pwd">{{$t('m.passwordsMatch')}}</span>
                            </div>
                        </div>
                        <button class="submit" @click="loginpwdbtn">{{$t('m.CommitChanges')}}</button>
                    </div>
                    <div class="container1" v-else>
                        <div class="bz_ct_con_list container_list">
                            <label for="">{{$t('m.cellPhoneNumber')}}</label>
                            <div class="input_con">
                                <input type="number" :placeholder="this.$t('m.inputcellPhoneNumber')" v-model="iphone">
                                <span class="input_null" v-if="(tip_show2 && iphone=='') || (code_tip && iphone=='')">{{$t('m.inputcellPhoneNumber')}}</span>
                            </div>
                            <input type="button" class='sendcode' :value="this.$t('m.getCode')" @click='sendcode'>
                            <!-- <span>{{$t('m.getCode')}}</span> -->
                        </div>
                        <div class="container_list">
                            <label for="">{{$t('m.verificationCode')}}</label>
                            <div class="input_con">
                                <input type="number" :placeholder="this.$t('m.inputverificationCode')" v-model="testcode">
                                <span class="input_null" v-if="tip_show2 && testcode==''">{{$t('m.inputverificationCode')}}</span>
                            </div>
                        </div>
                        <div class="container_list">
                            <label for="">{{$t('m.NewTransactionPassword')}}</label>
                            <div class="input_con">
                                <input type="password" :placeholder="this.$t('m.inputNewTransactionPassword')" v-model='dealpassword'>
                                <span class="input_null" v-if="tip_show2 && dealpassword==''">{{$t('m.inputNewTransactionPassword')}}</span>
                            </div>
                        </div>
                        <div class="container_list">
                            <label for="">{{$t('m.ConfirmPpassword')}}</label>
                            <div class="input_con">
                                <input type="password" :placeholder="this.$t('m.inputConfirm')" v-model="redealpassword">
                                <span class="input_null" v-if="tip_show2 && redealpassword==''">{{$t('m.inputConfirm')}}</span>
                                <span class="input_null" v-if="tip_show2 && redealpassword!=dealpassword">{{$t('m.passwordsMatch')}}</span>
                            </div>
                        </div>
                        <button class="submit" @click='dealpwdbtn'>{{$t('m.CommitChanges')}}</button>
                    </div>
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
                tip_show:false,
                tip_show2:false,
                code_tip:false,
                topData:[
                    {url:'./person',text:this.$t('m.personalData')},
                    {url:'./update',text:this.$t('m.modifiedData')},
                    {url:'./passwordmana',text:this.$t('m.PasswordManagement')}
                ],
                container_show:true,
                
                // 修改登录密码
                ypwd:'',
                pwd:'',
                repwd:'',

                //修改交易密码
                iphone:'',
                testcode:'',
                dealpassword:'',
                redealpassword:'',
                
            }
        },
        methods:{
            select_con(event){
                var data_id=$(event.currentTarget).attr('data-id');
                if(data_id==0){
                    this.container_show=true;
                }else{
                    this.container_show=false;
                }
                $(event.currentTarget).addClass('up_se_list_ac').siblings().removeClass('up_se_list_ac');

            },
            // 修改登录密码
            loginpwdbtn(){
                // this.$toast.center();
                if(this.ypwd==''){
                    this.tip_show=true;
                    return;
                }
                if(this.pwd==''){
                    this.tip_show=true;
                    return;
                }
                if(this.pwd!=this.repwd){
                    this.tip_show=true;
                    return;
                }
                var _this=this;
                this.axios.post(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=updatepwd',
                    {
                        ypwd:_this.ypwd,
                        pwd:_this.pwd
                    })
                    .then(function (json) {
                        if(json.data.status==1){
                             _this.$toast.center(json.data.result);
                             setTimeout(function(){
                                 window.location.reload()
                             },1000)
                        }else{
                            _this.$toast.center(json.data.result);
                        }
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            // 获取验证码
            
            sendcode(){
                var _this=this;
                if(this.iphone==''){
                    this.code_tip=true;
                    return;
                }
                _this.axios.post(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=bindmobilecode',{
                    mobile:_this.iphone
                })
                .then(function(json){
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
            // 修改交易密码
            dealpwdbtn(){
                var _this=this;
                if(this.iphone==''){
                    this.tip_show2=true;
                    return;
                }
                if(this.testcode==''){
                    this.tip_show2=true;
                    return;
                }
                if(this.dealpassword==''){
                    this.tip_show2=true;
                    return;
                }
                if(this.dealpassword!=this.redealpassword){
                    alert();
                    this.tip_show2=true;
                    return;
                }
                var _this=this;
                this.axios.post(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=chagetrpwd',
                    {
                        mobile:_this.iphone,
                        testcode:_this.testcode,
                        newpwd:_this.dealpassword,
                    })
                    .then(function (json) {
                        if(json.data.status==1){
                        _this.$toast.center("修改成功");
                        setTimeout(function(){
                           window.location.reload();
                        },1000)
                    }else{
                        _this.$toast.center(json.data.result);
                    }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },

        },
        components: {
    		myCom,
    	},
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
    .up_con{
        margin:40px;
        border-radius: 4px;
        background-color: #3c4e66;
        color:#fff;
        padding-bottom: 40px;
    }
    .up_con_top{
        min-height: 50px;
        line-height: 30px;
        padding: 10px 30px;
        background-color: #38485f;
        box-shadow: 0 4px 10px 0 #2c394a;
        border-radius: 4px;
        font-size: 18px;
        color: #fff;
        text-align:left;
    }
    .up_select_con{
        padding: 0 30px;
        background-color: #38485f;
        border-top: 1px solid #fff;
        text-align: left;
    }
    .up_ct_con{
        margin-top: 20px;
    }
    .up_se_list{
        
        height: 40px;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        position: relative;
        cursor: pointer;
        margin-right: 40px;
    }
    .up_se_list_ac{
        border-bottom: 2px solid #409EFF;
    }
    .container{
        max-width: 425px;
        margin: 0 auto;
    }
    .container_list{
        position: relative;
        padding-left: 190px;
        margin-bottom: 7px;
    }
    .container_list>label{
       
        position: absolute;
        display: inline-block;
        left: 0;
        text-align: right;
        width: 180px;
        height: 35px;
        line-height: 35px;
        color: #9fa9b2;
    }
    .container_list>label::before{
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
    }
    .input_con>input,.input_con>span{
        height: 35px;
        line-height: 35px;
    }
    .container_list>span{
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
    .input_con>.input_null{
        color: red;
        display: inline-block;
        padding: 2px 0;
        width: 100%;
        height: 23px;
        text-align: left;
        font-size: 14px;
    }
    .submit{
        background: #0d80f3;
        border-color: #0d80f3;
        color: #fff;
        width: 260px;
        max-width: 400px;
        height: 40px;
        border-radius: 5px;
        outline: none;
        margin-top: 20px;
    }
    .sh_table{
        width: 100%;
    }
    .sh_table::before{
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
    }
    .sh_table_top{
        width:100%;
    }
    .sh_table_top_list{
        float: left;
        width:25%;
        background: #323F52;
        font-size: 14px;
        font-weight: 500;
        padding:8px;
        text-align:left;
    }
    .sh_table_top_list{
        font-weight: 500;
    }
    .sh_table_con_list{
        background: #36465d;
        border-bottom: 1px solid #425671;
        width:100%;
    }
    .table_con_list_list{
        
        width:25%;
        padding:5px;
        text-align:left;
        float: left;
        display: table-cell;
        vertical-align: middle;
        font-size: 14px;
    }
    .container1{
        max-width: 425px;
        margin: 0 auto;
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
    .input_con>input,.input_con>span{
        height: 35px;
        line-height: 35px;
    }
    .bz_ct_con_list>.sendcode{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 103;
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
        display: inline-block;
        color:#0f87ff;
        font-size: 13px;
        width: 90px;
        background: none;
    }
    .bz_ct_con_list>label::before{
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
    }   
    @media screen and (max-width:767px){
        .up_con{
            margin:0px;
        }
        .up_ct_con{
            padding:0 15px;
        }
        .container_list{
            padding-left: 0px;
        }
        .container_list>label{
            width:100%;
            position: static;
            text-align: left;
        }
        .bz_ct_con_list>span{
            top:35px;
        }
    }
</style>