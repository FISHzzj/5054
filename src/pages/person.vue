<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 公共部分 -->
       <my-Com lf-index=1 :top-data="topData" top-index=0 :now-add='this.$t("m.personalData")'></my-Com>
       <div class="index_con">
           <div class="person_con">
                <div class="person_con_top">
                    {{$t('m.personalInformation')}}
                </div>
                <div class="person_det">
                    <div class="person_list">
                        <span>{{$t('m.account')}}：</span>{{person_data[0]}}
                    </div>
                     <div class="person_list">
                        <span>{{$t('m.realName')}}：</span>{{person_data[1]}}
                    </div>
                     <div class="person_list">
                        <span>{{$t('m.ReferenceNumber')}}：</span>{{person_data[2]}}
                    </div>
                    <div class="person_list">
                        <span>{{$t('m.PlacerNumber')}}：</span>{{person_data[3]}}
                    </div>
                    <div class="person_list">
                        <span>{{$t('m.PlacementPosition')}}：</span>{{person_data[4]}}
                    </div>
                    <div class="person_list">
                        <span>{{$t('m.rank')}}：</span>{{person_data[5]}}
                    </div>
                    <div class="person_list">
                        <span>{{$t('m.cellPhoneNumber')}}：</span>{{person_data[6]}}
                    </div>
                    <div class="person_list">
                        <span>{{$t('m.idcardNo')}}：</span>{{person_data[7]}}
                    </div>
                   
                    <div class="clearboth"></div>
                </div>
           </div>
           <div class="person_con1">
                <div class="person_con_top">
                        {{$t('m.bankInformation')}}
                </div>
                <div class="person_det">
                    <div class="person_list">
                        <span>{{$t('m.bankName')}}：</span>{{bank_data[0]}}
                    </div>
                     <div class="person_list">
                        <span>{{$t('m.NameOfCardholder')}}：</span>{{bank_data[1]}}
                    </div>
                     <div class="person_list">
                        <span>{{$t('m.nameOfTheBranch')}}：</span>{{bank_data[2]}}
                    </div>
                    <div class="person_list">
                        <span>{{$t('m.bankAccount')}}：</span>{{bank_data[3]}}
                    </div>
                    <div class="person_list">
                        <span>{{$t('m.WeChat')}}：</span>{{bank_data[4]}}
                    </div>
                    <div class="person_list">
                        <span>{{$t('m.Alipay')}}：</span>{{bank_data[5]}}
                    </div>
                    <div class="person_list" >
                        <span>{{$t('m.WeChatQrCode')}}：</span>
                        <label v-show="bank_data[6]=='信息待完善'">{{bank_data[6]}}</label>
                        <div class="img_con" v-show="bank_data[6]!='信息待完善'">
                            <img :src="bank_data[6]" alt="">
                        </div>
                    </div>
                   <div class="person_list" >
                        <span>{{$t('m.AlipayQrCode')}}：</span>
                        <label v-show="bank_data[7]=='信息待完善'">{{bank_data[7]}}</label>
                        <div class="img_con" v-show="bank_data[7]!='信息待完善'">
                            <img :src="bank_data[7]" alt="">
                        </div>
                    </div>
                    <div class="clearboth"></div>
                </div>
           </div>
       </div>
    </div>
</template>

<script>
    // import axios from 'axios';
    import myCom from '../components/Com';
    import URL from '../url.conf.js';
    export default {
        data(){
            return{
                topData:[
                    {url:'./person',text:this.$t('m.personalData')},
                    {url:'./update',text:this.$t('m.modifiedData')},
                    {url:'./passwordmana',text:this.$t('m.PasswordManagement')}
                ],
                tip_show:false,
                // 个人信息
                person_data:'',
                // 银行信息
                bank_data:'',
            }
        },
        components: {
    		myCom,
    	},
        mounted(){
            this.inload();
          
        },
        methods:{
            inload(){
                var _this=this;
                _this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter')
                .then(function(json){
                    var data=json.data;
                    if(data.status==1){
                        _this.person_data=[
                            data.result.mem.account,
                            data.result.mem.realname,
                            data.result.mem.tuijianaccount,
                            data.result.mem.anzhiaccount,
                            data.result.mem.anzhiposition,
                            data.result.mem.level,
                            data.result.mem.mobile,
                            data.result.mem.IDCard
                        ]
                        _this.bank_data=[
                            data.result.mem.bank_name,
                            data.result.mem.signature,
                            data.result.mem.bank_branch,
                            data.result.mem.bank_card,
                            data.result.mem.weixin,
                            data.result.mem.alipay,
                            data.result.mem.weixinimg,
                            data.result.mem.alipayimg
                        ]
                    }
                }).catch(function(error){
                    alert(error)
                })
            }
        }
    }
</script>

<style scoped>
    .clearfix:after, .clearfix:before {
        display: table;
        content: " ";
    }
    .clearboth{
        clear: both;
    }
    .index_con{
        margin-left: 256px;
        padding: 40px;
        min-height: 100%;
        /* transition: all .3s; */
    }
    .person_con{
        border-radius: 4px;
        background-color: #3c4e66;
    }
    .person_con1{
        border-radius: 4px;
        background-color: #3c4e66;
        margin-top: 20px;
    }
    .person_con_top{
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
    .person_det{
        padding-top: 20px;
    }
    .person_list{
        float: left;
        width: 50%;
        min-height: 35px;
        line-height: 35px;
        color: #9fa9b2;
        margin-bottom: 7px;
        position: relative;
        padding-left: 150px;
        padding-right: 15px;
        word-break: break-all;
        text-align: left;
        font-size: 14px;
    }
    .person_list>span{
        float: left;
        width: 150px;
        line-height: 35px;
        text-align: right;
        margin-right: 5px;
        position: absolute;
        left: 0;
    }
    .img_con{
        width:40%;
        
        padding-top: 40%;
        position: relative;
    }
    .img_con>img{
        position: absolute;
        height: 100%;
        width:100%;
        top:0px;
        left:0px;
    }
    @media screen and (max-width:767px){
        .person_list{
            width:100%;
        }

    }
</style>