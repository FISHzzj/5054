<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 公共部分 -->
       <my-Com :lf-index=2 :top-data="topData" :top-index=3 :now-add="this.$t('m.reActivation')"></my-Com>
       <div class="index_con">
           <div class="up_con">
                <div class="up_con_top">
                   {{$t('m.reActivation')}}
                </div>
                <div class="up_select_con">
                    <div class="up_se_list up_se_list_ac" data-id=0 @click='select_con($event)'>{{$t('m.ReactivateList')}}</div>
                    <div class="up_se_list" data-id=1 @click='select_con($event)'>{{$t('m.ReactivateRecord')}}</div>
                </div>
                <div class="up_ct_con">
                    <!-- <div class="container" v-if="container_show">
                        <div class="container_list">
                            <label for="">当前等级</label>
                            <div class="input_con">
                                <input type="text" placeholder="请输入当前等级" name="" id="">
                                <span class="input_null">重新激活需扣除 100 注册币</span>
                            </div>
                        </div>
                        <div class="container_list">
                            <label for="">交易密码</label>
                            <div class="input_con">
                                <input type="text" placeholder="请输入交易密码" name="" id="">
                                <span class="input_null">请输入交易密码</span>
                            </div>
                        </div>
                        <button class="submit">重新激活</button>
                    </div> -->
                    <div class="container1" v-show="container_show">
                        <div class="width100" style='width:100%;'>
                            <div class="sh_table">
                                <div class="sh_table_top">
                                    <div class="list_top" v-for="(item,index) in list_top" :key='index'>{{item}}</div>
                                    <div class="clearboth"></div>
                                </div>
                                <div class="sh_table_con" v-if="list.length!=0">
                                    <div class="sh_table_con_list" v-for="(item,index) in list" :key="index">
                                        <div class="list list_id" >{{item.id}}</div>
                                        <div class="list" >{{item.account}}</div>
                                        <div class="list" >{{item.levelname}}</div>
                                        <div class="list" >{{item.levelname}}</div>
                                        <div class="list blue" @click='active'>激活</div>
                                        <div class="clearboth"></div>
                                    </div>
                                </div>
                                <div v-else class="list_null">{{$t('m.noData')}}</div>
                            </div>
                        </div>
                        
                        <div class="btm" style='margin-top:15px;' v-show='list.length!=0'>
                            <div class="page_con">
                                <div class="">
                                    <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange1"
                                    :current-page="currentPage1" 
                                    :page-sizes="[25, 50, 100]"
                                    :page-size="25"
                                    layout="total, prev, pager, next"
                                    :total="page_total1">
                                    </el-pagination>
                                </div>
                            </div>
                            <div class="mobile_page">
                                <span class="btn up_page" @click='up_page1'>{{$t('m.previousPage')}}</span>
                                <span class="btn down_page" @click='down_page1'>{{$t('m.nextPage')}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="container1" v-show="!container_show">
                        <div class="width100" style='width:100%;'>
                            <div class="sh_table">
                                <div class="sh_table_top">
                                    <div class="sh_table_top_list" v-for="(item,index) in table_top_list" :key='index'>{{item}}</div>
                                    <div class="clearboth"></div>
                                </div>
                                <div class="sh_table_con" v-if="listlog.length!=0">
                                    <div class="sh_table_con_list" v-for="(item,index) in listlog" :key="index">
                                        <div class="table_con_list_list">{{item.id}}</div>
                                        <div class="table_con_list_list">{{item.account}}</div>
                                        <div class="table_con_list_list">{{item.levelname}}</div>
                                        <div class="table_con_list_list">{{item.money}}</div>
                                        <div class="table_con_list_list">{{item.createtime}}</div>
                                        <div class="clearboth"></div>
                                    </div>
                                </div>
                                <div v-else class="list_null">{{$t('m.noData')}}</div>
                            </div>
                        </div>
                        <div class="btm" style='margin-top:15px;' v-show='listlog.length!=0'>
                            <div class="page_con">
                                <div class="">
                                    <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange2"
                                    :current-page="currentPage2" 
                                    :page-sizes="[25, 50, 100]"
                                    :page-size="25"
                                    layout="total, prev, pager, next"
                                    :total="page_total2">
                                    </el-pagination>
                                </div>
                            </div>
                            <div class="mobile_page">
                                <span class="btn up_page" @click='up_page2'>{{$t('m.previousPage')}}</span>
                                <span class="btn down_page" @click='down_page2'>{{$t('m.nextPage')}}</span>
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
                container_show:true,
                list_top:[
                    this.$t('m.ActivateID'),
                    this.$t('m.activateUser'),
                    this.$t('m.UserLevel'),
                    this.$t('m.UserReferrer'),
                    this.$t('m.active')
                ],
                list:[],
                table_top_list:[
                    this.$t('m.ActivateID'),
                    this.$t('m.activateUser'),
                    this.$t('m.UserLevel'),
                    this.$t('m.reactivate1'),
                    this.$t('m.reactivate2')
                ],
                listlog:[],
                // 列表
                page_total1:0,
                currentPage1:0,

                // 记录
                page_total2:0,
                currentPage2:0,
                
            }
        },
        mounted(){
            this.onreload();
        },
        methods:{
             handleSizeChange(val) {
                console.log(`每页条`);
            },
            handleCurrentChange1(val) {
                console.log(val)
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=reactivation'+val)
                .then(function (json) {
                    // console.log(json);
                    if(json.data.status==1){
                        _this.table_con_list=json.data.result.log;
                        _this.currentPage1=json.data.result.page;
                    }else{
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            down_page1(){
                var _this=this;
                if(this.currentPage1+1>Math.ceil(this.page_total1/25)){
                    _this.$toast.center('最后一页啦');
                    return;
                }
                var val=this.currentPage1+1;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=reactivation'+val)
                .then(function (json) {
                    if(json.data.status==1){
                        _this.list=json.data.result.list;
                        _this.currentPage1=json.data.result.page;
                    }else{
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            
            up_page1(){
                var _thist=this;
                var val=this.currentPage1-1;
                if(val==0){
                    _this.$toast.center('第一页啦');
                    this.currentPage1=1;
                    return;
                }
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=reactivation'+val)
                .then(function (json) {
                    console.log(json);
                    if(json.data.status==1){
                        _this.list=json.data.result.list;
                        _this.currentPage1=json.data.result.page;
                    }else{
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            handleCurrentChange2(val) {
                // console.log(val)
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=reactivationlog'+val)
                .then(function (json) {
                    console.log(json);
                    if(json.data.status==1){
                        _this.listlog=json.data.result.list;
                        _this.currentPage2=json.data.result.page;
                    }else{
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            down_page2(){
                var _this=this;
                if(this.currentPage2+1>Math.ceil(this.page_total2/25)){
                    _this.$toast.center('最后一页啦');
                    return;
                }
                var val=this.currentPage2+1;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=reactivationlog'+val)
                .then(function (json) {
                    console.log(json);
                    if(json.data.status==1){
                        _this.listlog=json.data.result.list;
                        _this.currentPage2=json.data.result.page;
                    }else{
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
           
            up_page2(){
                var _this=this;
                var val=this.currentPage2-1;
                if(val==0){
                    _this.$toast.center('第一页啦');
                    this.currentPage2=1;
                    return;
                }
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=reactivationlog'+val)
                .then(function (json) {
                    // console.log(json);
                    if(json.data.status==1){
                        _this.listlog=json.data.result.log;
                        _this.currentPage2=json.data.result.page;
                    }else{
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            select_con(event){
                var data_id=$(event.currentTarget).attr('data-id');
                if(data_id==0){
                    this.container_show=true;
                }else{
                    this.container_show=false;
                }
                $(event.currentTarget).addClass('up_se_list_ac').siblings().removeClass('up_se_list_ac');

            },
            // 进入页面
            onreload(){
                var _this=this;
                // 激活列表
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=reactivation')
                .then(function (json) {
                    var data=json.data.result;
                   
                    if(json.data.status==1){
                        _this.page_total1=parseInt(json.data.result.total);
                        _this.list=json.data.result.list;
                        _this.currentPage1=json.data.result.page;
                    }
                
                })
                .catch(function (error) {
                    // console.log(error);
                });

                // 激活记录
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=reactivationlog')
                .then(function (json) {
                    var data=json.data.result;
                    if(json.data.status==1){
                        _this.page_total2=parseInt(json.data.result.total);
                        _this.listlog=json.data.result.list;
                        _this.currentPage2=json.data.result.page;
                        
                    }
                
                })
                .catch(function (error) {
                    // console.log(error);
                });
            },
            // 激活
            active(e){
                var _this=this;
                var id=$(e.currentTarget).siblings('.list_id').html()
                this.$confirm('重新激活, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=reactivation&op1=success&id='+id)
                            .then(function (json) {
                                console.log(json)
                                if(json.data.status==1){
                                    _this.$toast.center(json.data.result);
                                    window.location.reload();
                                }else{
                                    _this.$toast.center(json.data.result);
                                }
                            
                            })
                            .catch(function (error) {
                                // console.log(error);
                            });
                    }).catch(() => {
                        // this.$message({
                        //     type: 'info',
                        //     message: '已取消删除'
                        // });          
                    });
                }
            
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
    .blue{
        color:#1886D8;
        cursor: pointer;
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
        padding:15px;
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
    .list_top{
        width:20%;
        float: left;
        background: #323F52;
        font-size: 14px;
        font-weight: 500;
        padding:8px;
        text-align:left;
    }
    .sh_table_top_list{
        width:20%;
        float: left;
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
    .list{
         width:20%;
        padding:8px;
        text-align:left;
        float: left;
        display: table-cell;
        vertical-align: middle;
        font-size: 14px;
    }
    .table_con_list_list{
        
        width:20%;
        padding:8px;
        text-align:left;
        float: left;
        display: table-cell;
        vertical-align: middle;
        font-size: 14px;
    }
    .container1{
        width:100%;
    }
    .btm{
        height: 31px;
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
    @media screen and (max-width:767px){
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
        .sh_table,.sh_table_con,.sh_table_top, .sh_table_con_list{
            width:680px
        }
        .container1{
            width:100%;
            
        }
        .width100{
            overflow-x: scroll;

        }
    }
</style>