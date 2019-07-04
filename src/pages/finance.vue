<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 公共部分 -->
       <my-Com :lf-index=4 :top-data="topData" :top-index=0 :now-add="this.$t('m.fin1')"></my-Com>
       <div class="index_con">
           <div class="bazaar_con">
                <div class="bz_con_top">
                   {{$t('m.fin1')}}
                </div>
                <!-- <div class="bonus_det_con">
                    <div class="select_time">
                        <el-date-picker
                            v-model="value6"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00']">
                        </el-date-picker>
                    </div>
                    <div class="bonus_type">
                        <el-select v-model="active_type" filterable placeholder="请选择操作类型">
                            <el-option
                                v-for="(item,index) in active_data"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="bi_type">
                        <el-select v-model="bi_type" filterable placeholder="请选择货币类型">
                            <el-option
                                v-for="(item,index) in bi_data"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="clearboth"></div>
                    <div >
                        <button class="finds">{{$t('m.fin2')}}</button>
                    </div>
                </div> -->
                <div class="up_ct_con">
                    <div class="sh_ct_con">
                        <div class="sh_table">
                            <div class="sh_table_top clearfix">
                                <div class="sh_table_top_list" v-for="(item,index) in table_top_list" :key='index'>{{item}}</div>
                                <div class="clearboth"></div>
                            </div>
                            <div class="sh_table_con" v-if="table_con_list.length!=0">
                                <div class="sh_table_con_list clearfix" v-for="(item,index) in table_con_list" :key="index">
                                    <div class="table_con_list_list">{{item.account}}</div>
                                    <div class="table_con_list_list">{{item.type}}</div>
                                    <div class="table_con_list_list">{{item.title}}</div>
                                    <div class="table_con_list_list">{{item.csmoney}}</div>
                                    <div class="table_con_list_list">{{item.createtime}}</div>
                                    <div class="clearboth"></div>
                                </div>
                            </div>
                            <div v-else class="data_null">{{$t('m.noData')}}</div>
                        </div>
                        <div class="btm" v-if="table_con_list.length !=0">
                            <div class="page_con">
                                <div class="">
                                    <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-sizes="[25, 50, 100]"
                                    :page-size="25"
                                    layout="total, prev, pager, next"
                                    :total="page_total1">
                                    </el-pagination>
                                </div>
                            </div>
                            <div class="mobile_page">
                                <span class="btn up_page" @click="up_page">{{$t('m.previousPage')}}</span>
                                <span class="btn down_page" @click="down_page">{{$t('m.nextPage')}}</span>
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
                // topData:[
                //     {url:'./finance',text:this.$t('m.fin1')},
                    
                // ],
                topData:[
                    {url:'./finance',text:this.$t('m.fin1')},
                    {url:'./transition',text:this.$t('m.tran1')},
                    {url:'./tbetween',text:this.$t('m.fin8')}
                ],
                //时间
                value6: '',
                value7: '',
                // 操作类型
                
                active_data:[
                    {
                    value: '0',
                    label: '平台转入'
                    }, {
                    value: '1',
                    label: '平台转出'
                    }, {
                    value: '2',
                    label: '网络转入'
                    }, {
                    value: '3',
                    label: '网络转出'
                    }, {
                    value: '4',
                    label: '取消发送'
                    }, {
                    value: '5',
                    label: '激活账号'
                    }, {
                    value: '6',
                    label: '升级账号'
                    }, {
                    value: '7',
                    label: '商城下单'
                    }, {
                    value: '8',
                    label: '商城退款'
                    }, {
                    value: '9',
                    label: '交易撤销'
                    }, {
                    value: '10',
                    label: '交易卖出'
                    }, {
                    value: '11',
                    label: '交易买入'
                    }, {
                    value: '12',
                    label: '认购电子股'
                    }
                ],
                active_type:'',
                // 操作类型
                
                bi_data:[
                    {
                    value: '0',
                    label: '注册币'
                    }, {
                    value: '1',
                    label: '现金币'
                    }, {
                    value: '2',
                    label: '复投币'
                    }, {
                    value: '3',
                    label: '购物币'
                    }, {
                    value: '4',
                    label: 'IOT增值股'
                    }
                ],
                bi_type:'',
                table_top_list:[
                    this.$t('m.fin3'),
                    this.$t('m.fin4'),
                    this.$t('m.fin5'),
                    this.$t('m.fin6'),
                    this.$t('m.fin7')
                ],
                table_con_list:[],
                // 分页
                page_total1:0,
                currentPage:1,         //当前页
                
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
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=finance&page='+val)
                .then(function (json) {
                    var data=json.data.result;
                    if(json.data.status==1){
                        _this.table_con_list=json.data.result.list;
                        _this.currentPage=parseInt(json.data.result.page);
                    }
                
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            
            down_page(){
                var _this=this;
                if(this.currentPage+1>Math.ceil(this.page_total1/25)){
                    _this.$toast.center('最后一页啦');
                    return;
                }
                var val=this.currentPage+1;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=finance&page='+val)
                .then(function (json) {
                    if(json.data.status==1){
                        _this.table_con_list=json.data.result.list;
                        _this.currentPage=parseInt(json.data.result.page);
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
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=finance&page='+val)
                .then(function (json) {
                    console.log(json);
                    if(json.data.status==1){
                        _this.table_con_list=json.data.result.list;
                        _this.currentPage=parseInt(json.data.result.page);
                    }else{
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            inload(){
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=finance')
                .then(function (json) {
                    if(json.data.status==1){
                        // console.log(json);
                        _this.page_total1=parseInt(json.data.result.total);
                        _this.table_con_list=json.data.result.list;
                        _this.currentPage=parseInt(json.data.result.page);
                        
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
        position: relative;
        text-align: left;
    }
    .back{
        position: absolute;
        left: 15px;
        font-size: 13px;
        cursor: pointer;
        color:#fff;
        text-decoration: none;
    }
    .sh_ct_con{
        padding: 20px;
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
    }
    .sh_table_top_list{
        float: left;
        width:20%;
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
        
        /* width:14.285%; */
        width:20%;
        padding:8px;
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
    .blue{
        color:#66b1ff;
    }
    .bonus_det_con{
        padding: 30px;
        border-top: 1px solid #fff;
        text-align: left;
    }
    .up_ct_con{
        margin-top: 20px;
    }
   .bi_type, .bonus_type{
       border-radius: 4px;
        background-color: #2c394a;
        height: 35px;
        line-height: 35px;
        color: #fff;
        max-width: 150px;
        margin-bottom: 10px;
        float: left;
        margin-right: 10px;
   }
    .finds{
        border:none;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background-color: #0f87ff;
        border-color: #0f87ff;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        float: right;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        color:#fff;
    }
    /* 暂无数据 */
    .data_null{
        line-height: 45px;
        text-align: center;
        color:#909399;
        background:#36465d;
    }
    /* element-ui时间插件 */
    .select_time{
        margin-bottom: 10px;
        float: left;
        margin-right: 10px;
    }
   .el-date-editor input.el-range-input{
        border: none;
        outline: 0;
        padding: 0;
        width: 39%;
        background-color: #000 !important;
        color: #606266;
    }
    .el-range-editor.el-input__inner{
        border-radius: 4px;
        background-color: #2c394a;
        border: 1px solid #2c394a;
        height: 35px;
        line-height: 35px;
        color: #fff;
    }
    .bonus_type{
        float: left;
    }
    .page_con{
        display: block
    }
    .mobile_page{
        display: none;
    }
    /* 移动端 */
    @media screen and (max-width: 767px){
        .bazaar_con{
            margin:0px;
            padding-bottom: 0px;
        }
        .bonus_det_con{
            padding:15px;
            overflow: hidden;
        }
        .sh_table{
            width:100%;
            overflow: scroll;
        }
        .sh_table_top, .sh_table_con,.data_null{
            width:620px;
            word-break: break-all;
        }
        .sh_table_con{
            font-size: 13px;
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