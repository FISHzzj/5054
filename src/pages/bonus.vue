<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 公共部分 -->
       <my-Com :lf-index=5 :top-data="topData" :top-index=0 :now-add="this.$t('m.bonus1')"></my-Com>
       <div class="index_con">
           <div class="bazaar_con">
                <div class="bz_con_top">
                  {{$t('m.bonus1')}}
                </div>
                <div class="up_select_con">
                    <div class="up_se_list up_se_list_ac" data-id=0 @click='select_con($event)'>{{$t('m.bonus2')}}</div>
                    <div class="up_se_list" data-id=1 @click='select_con($event)'>{{$t('m.bonus3')}}</div>
                </div>
                <div class="up_ct_con">
                    <!-- 动态奖金明细 -->
                    <div class="container" v-show="container_show">
                        <div class="sh_ct_con">
                            <div class="sh_table">
                                <div class="sh_table_top">
                                    <div class="sh_table_top_list" v-for="(item,index) in table_top_list" :key='index'>{{item}}</div>
                                    <div class="clearboth"></div>
                                </div>
                                <div class="sh_table_con" v-show='table_con_list.length!=0'>
                                    <div class="sh_table_con_list" v-for="(item,index) in table_con_list" :key="index">
                                        <div class="table_con_list_list">{{item.account}}</div>
                                        <div class="table_con_list_list">{{item.jujian}}</div>
                                        <div class="table_con_list_list">{{item.jiandian}}</div>
                                        <div class="table_con_list_list">{{item.yejipeng}}</div>
                                        <div class="table_con_list_list">{{item.zhidian}}</div>
                                        <div class="table_con_list_list">{{item.total}}</div>
                                        <div class="table_con_list_list">{{item.bdaccount}}</div>
                                        <div class="table_con_list_list">{{item.createtime}}</div>
                                        <!-- <router-link to="./bonusdet">
                                            <div class="table_con_list_list blue">查看详情</div>
                                        </router-link> -->
                                        <div class="clearboth"></div>
                                    </div>
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
                    <!-- 静态奖金明细 -->
                    <div class="container1" v-show='!container_show'>
                        <div class="sh_ct_con">
                            <div class="sh_table">
                                <div class="sh_table_top clearfix">
                                    <div class="sh_table_top_list static" v-for="(item,index) in static_top_list" :key='index'>{{item}}</div>
                                    <div class="clearboth"></div>
                                </div>
                                <div class="sh_table_con">
                                    <div class="sh_table_con_list clearfix" v-for="(item,index) in static_con_list" :key="index">
                                        <div class="table_con_list_list static">{{item.account}}</div>
                                        <div class="table_con_list_list static">{{item.title}}</div>
                                        <div class="table_con_list_list static">{{item.csmoney}}</div>
                                        <div class="table_con_list_list static">{{item.sxf}}</div>
                                        <div class="table_con_list_list static">{{item.xjb}}</div>
                                        <div class="table_con_list_list static">{{item.ftb}}</div>
                                        <div class="table_con_list_list static">{{item.gwb}}</div>
                                        <div class="table_con_list_list static">{{item.createtime}}</div>
                                        <div class="clearboth"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="sh_table_con" v-show='static_con_list.length==0'>
                                <div class="list_null">{{$t('m.noData')}}</div>
                            </div>
                        </div>
                        <div class="btm" style='margin-top:15px;' v-show='static_con_list.length!=0'>
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
                container_show:true,
                topData:[
                    {url:'./bonus',text:this.$t('m.bonus1')},
                    
                ],
                // 动态奖金明细
                table_top_list:[
                    this.$t('m.bonus4'),
                    this.$t('m.bonus5'),
                    this.$t('m.bonus6'),
                    this.$t('m.bonus7'),
                    this.$t('m.bonus8'),
                    this.$t('m.bonus9'),
                    this.$t('m.bonus10'),
                    this.$t('m.bonus11')
                ],
                table_con_list:[],
                // 静态奖金明细
                static_top_list:[
                    this.$t('m.bonus12'),
                    this.$t('m.bonus13'),
                    this.$t('m.bonus14'),
                    this.$t('m.bonus15'),
                    this.$t('m.bonus16'),
                    this.$t('m.bonus17'),
                    this.$t('m.bonus18'),
                    this.$t('m.bonus19')
                ],
                static_con_list:[],
                
                // 动态奖金明细
                page_total1:1,
                currentPage1:1,
                
                // 静态奖金明细
                page_total2:1,
                currentPage2:1,

            }
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            // 动态奖金明细
            handleCurrentChange1(val) {
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=bonus&page='+val)
                .then(function (json) {
                    console.log(json);
                    if(json.data.status==1){
                        _this.table_con_list=json.data.result.list;
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
                var val=this.currentPage1+1;
                var lasepage=Math.ceil(_this.page_total1/25)
                if(lasepage<val){
                    _this.$toast.center('最后一页啦');
                    return;
                }
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=bonus&page='+val)
                .then(function (json) {
                   
                    if(json.data.status==1){
                        _this.table_con_list=json.data.result.list;
                        _this.currentPage1=json.data.result.page;
                        
                    }else{
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            },
            
            up_page1(){
                var _this=this;
                var val=this.currentPage1-1;
                if(val==0){
                    _this.$toast.center('第一页啦');
                    this.currentPage1=1;
                    return;
                }
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=bonus&page='+val)
                .then(function (json) {
                    console.log(json);
                    if(json.data.status==1){
                        _this.table_con_list=json.data.result.list;
                        _this.currentPage1=json.data.result.page;
                    }else{
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            handleCurrentChange2(val) {
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=static&page='+val)
                .then(function (json) {
                    console.log(json);
                    if(json.data.status==1){
                        _this.static_con_list=json.data.result.list;
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
                var val=this.currentPage2+1;
                if(this.currentPage2+1>Math.ceil(this.page_total2/25)){
                    _this.$toast.center('最后一页啦');
                    return;
                }
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=static&page='+val)
                .then(function (json) {
                    console.log(json);
                    if(json.data.status==1){
                        _this.static_con_list=json.data.result.list;
                        _this.currentPage2=json.data.result.page;
                    }else{
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
           
            up_page2(){
                var val=this.currentPage2-1;
                var _this=this;
                if(val==0){
                    _this.$toast.center('第一页啦');
                    this.currentPage2=1;
                    return;
                }
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=static&page='+val)
                .then(function (json) {
                    // console.log(json);
                    if(json.data.status==1){
                        _this.static_con_list=json.data.result.list;
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
            inload(){
                // 动态奖金
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=bonus')
                .then(function (json) {
                    var data=json.data.result;
                    if(json.data.status==1){
                        _this.table_con_list=json.data.result.list;
                        _this.currentPage1=json.data.result.page;
                        _this.page_total1=parseInt(json.data.result.total);
                    }
                
                })
                .catch(function (error) {
                    console.log(error);
                });

                // 静态奖金
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=static')
                .then(function (json) {
                    var data=json.data.result;
                    if(json.data.status==1){
                        _this.page_total2=parseInt(json.data.result.total);
                        _this.static_con_list=json.data.result.list;
                        _this.currentPage2=json.data.result.page;
                        
                    }
                
                })
                .catch(function (error) {
                    console.log(error);
                });
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
    .sh_ct_con{
        /* padding: 20px; */
        color:#fff;
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
        background:#323F52;
    }
    .sh_table_top_list{
        float: left;
        width:12.5%;
        background: #323F52;
        font-size: 14px;
        font-weight: 500;
        padding:8px;
        text-align:left;
    }
    .sh_table_con_list{
        background: #36465d;
        border-bottom: 1px solid #425671;
        width:100%;
    }
    .table_con_list_list{
        width:12.5%;
        padding:8px;
        text-align:left;
        float: left;
        display: table-cell;
        vertical-align: middle;
        font-size: 14px;
    }
    .static{
        width:12.5%;
    }
    .page_con{
        margin:0 auto;
        height: 35px;
    }
    
    .blue{
        color:#66b1ff;
    }
    /* 菜单切换 */
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
        color:#fff;
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
    /* 暂无数据 */
    .list_null{
        min-height: 60px;
        text-align: center;
        line-height: 60px;
        color:#909399;
        background:#38485F;
    }
    .container, .container1{
        padding:15px;
    }
    .page_con{
        display: block
    }
    .mobile_page{
        display: none;
    }
    @media screen and (max-width: 767px){
        .bazaar_con{
            margin:0px;
        }
        .container{
            padding:15px;
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
            height: 33px;;
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
        .sh_ct_con{
            padding:0px;
        }
        .sh_ct_con{
            width:100%;
            overflow: scroll;
        }
        .list_null,.sh_table{
            width:880px;
        }
        .up_select_con{
            padding:0 15px;
        }
        .up_se_list{
            margin-right: 15px;
        }
        .table_con_list_list{
            word-break: break-all;
            font-size: 13px;
        }
        .bazaar_con{
            padding-bottom: 0px;
        }
    }
</style>