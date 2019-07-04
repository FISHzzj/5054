<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 公共部分 -->
       <my-Com :lf-index=2 :top-data="topData" :top-index=1 :now-add="this.$t('m.StraightPushList')"></my-Com>
       <div class="index_con">
           <div class="bazaar_con">
                <div class="bz_con_top">
                   {{$t('m.StraightPushList')}}
                </div>
                <div class="sh_ct_con">
                    <div class="sh_table">
                        <div class="sh_table_top clearfix">
                            <div class="sh_table_top_list" v-for="(item,index) in table_top_list" :key='index'>{{item}}</div>
                            <div class="clearboth"></div>
                        </div>
                        <div class="sh_table_con" v-show='table_con_list.length!=0'>
                            <div class="sh_table_con_list clearfix" v-for="(item,index) in table_con_list" :key="index">
                                <div class="table_con_list_list">{{item.account}}</div>
                                <div class="table_con_list_list">{{item.realname}}</div>
                                <div class="table_con_list_list">{{item.tuijianaccount}}</div>
                                <div class="table_con_list_list">{{item.anzhiaccount}}</div>
                                <div class="table_con_list_list">{{item.anzhiposition}}</div>
                                <div class="table_con_list_list">{{item.mobile}}</div>
                                <div class="table_con_list_list">{{item.createtime}}</div>
                                <!-- <div class="table_con_list_list">{{item.shtime}}</div> -->
                                <div class="table_con_list_list">已激活</div>
                                <div class="clearboth"></div>
                            </div>
                        </div>
                        <div class="sh_table_con" v-show='table_con_list.length==0'>
                            <div class="list_null">{{$t('m.noData')}}</div>
                        </div>
                    </div>
                    <div class="btm" style="margin-top:15px;" v-show='table_con_list.length!=0'>
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
                table_top_list:[
                    this.$t('m.account'),
                    this.$t('m.realName'),
                    this.$t('m.Reference'),
                    this.$t('m.Placer'),
                    this.$t('m.Position'),
                    this.$t('m.iPhone'),
                    this.$t('m.registerTime'),
                    // this.$t('m.activeTime'),
                    this.$t('m.active'),
                ],
                currentPage:1,           //当前页数
                table_con_list:[],       //直推列表
                page_total:0,                  //总条数
            }
        },
        mounted(){
            this.inload();
        },
        methods:{
            
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=zhituilog&page='+val)
                .then(function (json) {
                    if(json.data.status==1){
                        _this.table_con_list=json.data.result.log;
                        _this.currentPage=json.data.result.page;
                        _this.page_total=parseInt(json.data.result.total);
                        
                    }else{
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            
            },
            down_page(){
                var _this=this;
                if(this.currentPage+1>Math.ceil(this.page_total/25)){
                    _this.$toast.center('最后一页啦');
                    return;
                }
                var val=this.currentPage+1;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=zhituilog&page='+val)
                .then(function (json) {
                    if(json.data.status==1){
                        _this.table_con_list=json.data.result.log;
                        _this.currentPage=json.data.result.page;
                        _this.page_total=parseInt(json.data.result.total);
                    }else{
                        
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
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=zhituilog&page='+val)
                .then(function (json) {
                    if(json.data.status==1){
                        _this.table_con_list=json.data.result.log;
                        _this.currentPage=json.data.result.page;
                        _this.page_total=parseInt(json.data.result.total);
                    }else{
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            // 进页面加载
            inload(){
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=zhituilog')
                    .then(function (json) {
                        if(json.data.status==1){
                            _this.table_con_list=json.data.result.log;
                            _this.currentPage=json.data.result.page;
                            _this.page_total=parseInt(json.data.result.total);

                        }else{
                            
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
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
        padding: 20px;
        color:#fff;
        overflow:hidden;
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
        width:11.111%;
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
        width:11.111%;
        padding:5px;
        text-align:left;
        float: left;
        display: table-cell;
        vertical-align: middle;
        font-size: 14px;
    }
    .page_con{
        margin:0 auto;
        height: 35px;
    }
    .btm{
        margin-top: 20px;
    }
    .sh_arrow{
        height: 14px;
        width:14px;
        display: inline-block;
    }
    .sh_fff{
        border-top: 2px solid #fff;
        border-right: 2px solid #fff;
    }
    .sh_left{
        -webkit-transform: rotate(-135deg);
        transform: rotate(-135deg);
    }
    .sh_right{
        -webkit-transform: rotate(45deg);
        transform: rotate(55deg);
    }
    .all_number{
        display: inline-block;
        padding: 0 15px;
        height: 35px;
        line-height: 35px;
        cursor: pointer;
        color: #fff;
        background: #38485F;
        border-right: 1px solid #3c587f;
        font-size: 14px;
    }
    .select_number{
        border: 0;
        height: 35px;
        line-height: 35px;
        outline: none;
        padding-left: 15px;
        cursor: pointer;
        border-right: 1px solid #3c587f;
        background-color: #38485f;
        color: #fff;
        margin-left: -4px;
    }
    .page_lf,.page_ri{
        padding: 0 15px;
        height: 35px;
        line-height: 35px;
        cursor: pointer;
        display: inline-block;
        background: #38485F;
        margin:0 -5px;
    }
    .page_lf{
        border-left: 1px solid #3c587f;
    }
    .page_ri{
        border-right: 1px solid #3c587f;
    }
    .page_number{
        padding: 0 15px;
        height: 35px;
        line-height: 35px;
        cursor: pointer;
        color: #fff;
        background:#3C4E66;
        border: 1px solid #3c587f;
        display: inline-block;
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
        .bazaar_con{
            margin: 0px;
            padding-bottom: 0px;
        }
        .sh_table{
            width:100%;
            overflow: scroll;
        }
        .table_con_list_list{
            word-break: break-all;
            font-size: 13px;
        }
        .sh_table_top, .sh_table_con{
            width:800px;
        }
        .sh_table_top_list{
            width:11.111%;
            text-align:left;
            float: left;
            display: table-cell;
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
    }
</style>