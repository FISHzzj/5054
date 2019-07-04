<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 公共部分 -->
       <my-Com :lf-index=2 :top-data="topData" :top-index=2 :now-add="this.$t('m.MembershipUpgrade')"></my-Com>
       <div class="index_con">
           <div class="up_con">
                <div class="up_con_top">
                   {{$t('m.MembershipUpgrade')}}
                </div>
                <div class="up_select_con">
                    <div class="up_se_list up_se_list_ac" data-id=0 @click='select_con($event)'>{{$t('m.MembershipUpgrade')}}</div>
                    <div class="up_se_list" data-id=1 @click='select_con($event)'>{{$t('m.UpdateRecord')}}</div>
                </div>
                <div class="up_ct_con">
                    <!-- 会员升级 -->
                    <div class="container" v-show="container_show==1">
                        <div class="container_list">
                            <label for="">{{$t('m.TheCurrentLevel')}}</label>
                            <div class="input_con">
                                <input type="text" placeholder=""  readonly v-model="currentlevel">
                                <span class="input_null" v-if="tip_show && dealpassword==''"></span>
                            </div>
                        </div>
                        <div class="container_list">
                            <label for="">{{$t('m.UpgradeLevel')}}</label>
                            <div class="input_con">
                                <select name="" id="" v-model="level" @change="select_level($event)"  class='select_level'>
                                    <option value="0" >{{$t('m.inpUpgradeLevel')}}</option>
                                    <option :value="item.id" v-for="(item,index) in level_data" :key="index" :data-money='item.hf'>{{item.levelname}}</option>
                                </select>
                                <span class="input_null" v-if="tip_show && level=='0'">{{$t('m.inpUpgradeLevel')}}</span>
                            </div>
                        </div>
                        <div class="container_list registericon" style='line-height:35px;'>
                            <label for="">{{$t('m.baz1')}}</label>
                            <div class="input_con" style="color:#fff;text-align:left;">
                                &nbsp;{{registericon}}
                            </div>
                        </div>
                        <div class="container_list">
                            <label for="">{{$t('m.dealpassword')}}</label>
                            <div class="input_con">
                                <input type="password" :placeholder="this.$t('m.inputdealpassword')" v-model="dealpassword">
                                <span class="input_null" v-if="tip_show && dealpassword==''">{{$t('m.inputdealpassword')}}</span>
                            </div>
                        </div>
                        <button class="submit" @click="upgrade">{{$t('m.SubmitTheUpgrade')}}</button>
                    </div>
                    <!-- 升级记录 -->
                    <div class="container1" v-show='container_show==2'>
                        <div class="sh_table">
                            <div class="sh_table_top">
                                <div class="sh_table_top_list" v-for="(item,index) in table_top_list" :key='index'>{{item}}</div>
                                <div class="clearboth"></div>
                            </div>
                            <div class="sh_table_con" v-show='table_con_list.length!=0'>
                                <div class="sh_table_con_list" v-for="(item,index) in table_con_list" :key="index">
                                    <div class="table_con_list_list">{{item.memberid}}</div>
                                    <div class="table_con_list_list">{{item.startlevel}}</div>
                                    <div class="table_con_list_list">{{item.currentlevel}}</div>
                                    <div class="table_con_list_list">{{item.time}}</div>
                                    <div class="clearboth"></div>
                                </div>
                            </div>
                            <div class="sh_table_con" v-show='table_con_list.length==0'>
                                <div class="list_null">{{$t('m.noData')}}</div>
                            </div>
                        </div>
                        <div class="btm" style='margin-top:15px;' v-show='table_con_list.length!=0'>
                            <div class="page_con">
                                <div class="">
                                    <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage" 
                                    :page-sizes="[25, 50, 100]"
                                    :page-size="25"
                                    layout="total, prev, pager, next"
                                    :total="page_total">
                                    </el-pagination>
                                </div>
                            </div>
                            <div class="mobile_page">
                                <span class="btn up_page" @click='up_page'>{{$t('m.previousPage')}}</span>
                                <span class="btn down_page" @click='down_page'>{{$t('m.nextPage')}}</span>
                            </div>
                        </div>
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
                topData:[
                    {url:'./bazaar',text:this.$t('m.memberRegistration')},
                    {url:'./straightlist',text:this.$t('m.StraightPushList')},
                    {url:'./upgrade',text:this.$t('m.MembershipUpgrade')},
                    {url:'./reactive',text:this.$t('m.reActivation')}
                ],
                container_show:1,
                table_top_list:[
                    this.$t('m.MembershipNumber'),
                    this.$t('m.PreLevel'),
                    this.$t('m.nextLever'),
                    this.$t('m.time')
                ],
                table_con_list:[],                  //升级记录
                currentlevel:'',                   //当前等级

                registericon:0,
                hf:'',


                level:'0',
                dealpassword:'',                //交易密码

                level_data:[],
                tip_show:false,
                currentPage:1,           //当前页数
                page_total:0,                  //总条数
                
                
            }
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页条`);
            },
            handleCurrentChange(val) {
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=upgradelog')
                .then(function (json) {
                    if(json.data.status==1){
                            _this.table_con_list=json.data.result.log;
                            _this.page_total=parseInt(json.data.result.total);
                            _this.currentPage=json.data.result.page;
                        }else{
                            // alert('加载错误')
                        }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            
            down_page(){
                var _this=this;
                if(_this.table_con_list.length<25){
                    _this.$toast.center('最后一页啦');
                    return;
                }
                var val=this.currentPage+1;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=upgradelog&page='+val)
                .then(function (json) {
                    if(json.data.status==1){
                            _this.table_con_list=json.data.result.log;
                            _this.currentPage=json.data.result.page;
                        }else{
                            // alert('加载错误')
                        }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            
            up_page(){
                var _this=this;
                var val=this.currentPage-1;
                if(val==0){
                    _this.$toast.center('第一页啦');
                    this.currentPage=1;
                    return;
                }
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=upgradelog&page='+val)
                .then(function (json) {
                    if(json.data.status==1){
                            _this.table_con_list=json.data.result.log;
                            _this.currentPage=json.data.result.page;
                        }else{
                            // alert('加载错误')
                        }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            select_con(event){
                var data_id=$(event.currentTarget).attr('data-id');
                if(data_id==0){
                    this.container_show=1;
                }else{
                    this.container_show=2;
                }
                $(event.currentTarget).addClass('up_se_list_ac').siblings().removeClass('up_se_list_ac');

            },
            // 进页面加载
            inload(){
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=upgrade')
                    .then(function (json) {
                        if(json.data.status==1){
                            _this.level_data=json.data.result.level;
                            _this.currentlevel=json.data.result.currentlevel.levelname;
                            _this.hf=json.data.result.currentlevel.hf;
                        }else{
                            // alert('加载错误')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                // 升级记录
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=upgradelog')
                    .then(function (json) {
                        // console.log(json);
                        if(json.data.status==1){
                            _this.table_con_list=json.data.result.log;
                            _this.page_total=parseInt(json.data.result.total);
                            _this.currentPage=json.data.result.page;
                        }else{
                            // alert('加载错误')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            // 会员升级提交
            upgrade(){
                var _this=this;
                if(_this.level=="0"){
                    _this.tip_show=true;
                    return;
                };
                if(_this.dealpassword==""){
                    _this.tip_show=true;
                    return;
                };
                this.axios.post(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=upgradesub',{
                        level:_this.level,
                        dealpassword:_this.dealpassword
                    })
                    .then(function (json) {
                        if(json.data.status==1){
                            _this.$toast.center(json.data.result);
                            setTimeout(function(){
                                window.location.reload();
                                
                            },1000);
                            
                        }else{
                            _this.$toast.center(json.data.result);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            // 等级对应的注册币
            select_level(e){
                let val=$(e.currentTarget).val();
                let money=$('.select_level option[value='+val+']').attr('data-money');
                this.registericon=(money-this.hf);
            }
        },
        mounted(){
            this.inload();
            
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
        width: 170px;
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
        padding-left: 8px;
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
        padding-left: 8px;
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
        padding:8px;
        text-align:left;
        float: left;
        display: table-cell;
        vertical-align: middle;
        font-size: 14px;
    }
    .container1{
        padding: 15px;
    }
     /* 暂无数据 */
    .list_null{
        min-height: 60px;
        text-align: center;
        line-height: 60px;
        color:#909399;
        background:#38485F;
    }
    .page_con{
        display: block
    }
    .mobile_page{
        display: none;
    }
    @media screen and (max-width: 767px){
        .up_con{
            margin:0px;
            padding-bottom: 0px;
        }
        .container{
            padding:15px;
        }
        .container_list{
            padding-left: 0px;
        }
        .container_list>label{
            position: static;
            width:100%;
            text-align: left;
        }
        .sh_table_top_list{
            vertical-align: middle;
            font-size: 13px;
            font-weight: 500;
            padding:8px 5px;
        }
        /* 分页 */
        .page_con{
            display: none
        }
        .mobile_page{
            display: block;
        }
        .up_page, .down_page{
            color: #ccc;
            cursor: no-drop;
            background: #3c4e66;
            border: 1px solid #828282;
            padding:7px 12px;
            border-radius: 3px;
            font-size: 13px;
        }
        .up_page{
            margin-right: 30px;
        }
        .sh_table{
            overflow-x: scroll;
        }
        .sh_table_top,.sh_table_con{
            width:560px;
        }
        .registericon{
            text-align: left;
            margin-bottom: 0px;
        }
        .registericon>label{
             width:auto;
        }
        .registericon>div{
             display: inline-block;
        }
    }
</style>