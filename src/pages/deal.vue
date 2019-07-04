<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 公共部分 -->
        <my-Com :lf-index=6 :top-data="topData" :top-index=0 :now-add="this.$t('m.deal1')"></my-Com>
        <div class="index_con">
           <div class="up_con">
                <div class="up_con_top">
                   {{$t('m.deal1')}}
                </div>
                <div class="up_select_con">
                    <div class="up_se_list up_se_list_ac" data-id='0' @click='select_con($event)'>{{$t('m.deal4')}}</div>
                    <!-- <div class="up_se_list" data-id='1' @click='select_con'>认购记录</div>
                    <div class="up_se_list" data-id='2' @click='select_con'>挂卖记录</div> -->
                    <div class="up_se_list" data-id='3' @click='select_con($event)'>{{$t('m.deal5')}}</div>
                </div>
                <div class="up_ct_con">
                    <!-- 交易大厅 -->
                    <div class="container" v-show="container_show==0">
                       <div class="ct_con">
                            <div class="ct_lf_top">{{$t('m.deal6')}}</div>
                           <div class="ct_lf">
                               <div class="ct_lf_con">
                                   <div>
                                       <div class="ct_lf_con_lf lf">{{$t('m.deal7_1')}}：</div>
                                       <div class="ct_lf_con_ri lf">
                                           {{account_id}}
                                           
                                       </div>
                                       <div class="clearboth"></div>
                                   </div>
                                    <div>
                                       <div class="ct_lf_con_lf lf">{{$t('m.deal7')}}:</div>
                                       <div class="ct_lf_con_ri lf">
                                           {{account}}
                                           <!-- <el-select v-model="account" filterable placeholder="请选择会员账号">
                                                <el-option
                                                v-for="(item,index) in account_data"
                                                :key="index"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select> -->
                                       </div>
                                       <div class="clearboth"></div>
                                   </div>
                                    <div>
                                       <div class="ct_lf_con_lf lf">{{$t('m.deal8')}}:</div>
                                       <div class="ct_lf_con_ri lf">
                                          {{credit2}}
                                       </div>
                                       <div class="clearboth"></div>
                                   </div>
                                   <div>
                                       <div class="ct_lf_con_lf lf">{{$t('m.deal9')}}:</div>
                                       <div class="ct_lf_con_ri lf">
                                          {{currentprice}}
                                       </div>
                                       <div class="clearboth"></div>
                                   </div>
                                   <div>
                                       <div class="ct_lf_con_lf lf">{{$t('m.deal10')}}:</div>
                                       <div class="ct_lf_con_ri lf">
                                          {{currenttotal}}
                                       </div>
                                       <div class="clearboth"></div>
                                   </div>
                                   <div>
                                       <div class="ct_lf_con_lf lf">{{$t('m.deal11')}}:</div>
                                       <div class="ct_lf_con_ri lf">
                                          {{chaifencishu}}
                                       </div>
                                       <div class="clearboth"></div>
                                   </div>
                               </div>
                           </div>
                           <div class="ct_ri">
                               <div class="ct_ri_top">{{$t('m.deal12')}}</div>
                               <div class="ct_ri_con" id="zheline"></div>
                           </div>
                           <div class="clearboth"></div>
                        </div>
                        <!-- 股票拆分记录 -->
                        <div class="container_btm">
                            <div class="chaifen_title">{{$t('m.deal13')}}</div>
                            <div class="chaifen_con">
                                <div class="container_btm_top">
                                    <div class="chaifen_top lf" v-for="(item,index) in chaifen_top" :key="index">{{item}}</div>
                                    <div class="clearboth"></div>
                                </div>
                                <div class="chaifen_list" v-for="(item,index) in chaifen_list" :key="index" v-show='chaifen_list.length!=0'>
                                    <div class="list lf">{{item.uid}}</div>
                                    <div class="list lf">{{item.account}}</div>
                                    <div class="list lf">{{item.bili}}</div>
                                    <div class="list lf">{{item.startmoney}}</div>
                                    <div class="list lf">{{item.shouyicredit2}}</div>
                                    <div class="list lf">{{item.endcredit2}}</div>
                                    <div class="list lf">{{item.createtime}}</div>
                                    <div class="clearboth"></div>
                                </div>
                                <div class="sh_table_con"  v-show='chaifen_list.length==0'>
                                    <div class="list_null">{{$t('m.noData')}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 认购记录 -->
                    <!-- <div class="container" style="padding:0 15px;" v-show="container_show==1">
                        <div class="pading15">
                            <div class="rengou_top">
                                <div class="rengou_top_list lf" v-for="(item,index) in rengou_top" :key="index">{{item}}</div>
                                <div class="clearboth"></div>
                            </div>
                            <div class="rengou_list" v-for="(item,index) in rengou_list" :key="index" >
                                <div class="lf" v-for="(item,index) in item" :key="index">{{item}}</div>
                                <div class="lf blue" @click='look_det()'>查看明细</div>
                                <div class="clearboth"></div>
                            </div>
                        </div>
                         <div class="sh_table_con" v-show='rengou_top.length==0'>
                            <div class="list_null">暂无数据</div>
                        </div>
                        <div class="btm" v-show='rengou_list.length!=0'>
                            <div class="page_con">
                                <div class="block">
                                    <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="1"
                                    :page-sizes="[25, 50, 100]"
                                    :page-size="25"
                                    layout="total, sizes, prev, pager, next"
                                    :total="rengou_list.length">
                                    </el-pagination>
                                </div>
                            </div>
                            <div class="mobile_page">
                                <span class="btn up_page">上一页</span>
                                <span class="btn down_page">下一页</span>
                            </div>
                        </div>
                    </div> -->
                    <!-- 挂卖记录 -->
                    <!-- <div class="container" style="padding:0 15px;" v-show="container_show==2">
                        <div class="pading15">
                            <div class="guamai_top">
                                <div class="guamai_top_list lf" v-for="(item,index) in guamai_top" :key="index">{{item}}</div>
                                <div class="clearboth"></div>
                            </div>
                            <div class="guamai_list" v-for="(item,index) in guamai_list" :key="index">
                                <div class="lf" v-for="(item,index) in item" :key="index">{{item}}</div>
                                <div class="lf blue" @click='look_det(7)'>查看明细</div>
                                <div class="clearboth"></div>
                            </div>
                        </div>
                        <div class="sh_table_con" v-show='guamai_top.length==0'>
                            <div class="list_null">暂无数据</div>
                        </div>
                        <div class="btm" v-show='guamai_top.length!=0'>
                            <div class="page_con">
                                <div class="block">
                                    <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="1"
                                    :page-sizes="[25, 50, 100]"
                                    :page-size="25"
                                    layout="total, sizes, prev, pager, next"
                                    :total="guamai_list.length">
                                    </el-pagination>
                                </div>
                            </div>
                            <div class="mobile_page">
                                <span class="btn up_page">上一页</span>
                                <span class="btn down_page">下一页</span>
                            </div>
                        </div>
                    </div> -->
                    <!-- 系统拆分记录 -->
                    <div class="container" style="padding:0 15px;" v-show="container_show==3">
                        <div class="pading15">
                            <div class="xitong_top">
                                <div class="xitong_top_list lf" v-for="(item,index) in xitong_top" :key="index">{{item}}</div>
                                <div class="clearboth"></div>
                            </div>
                            <div class="xitong_list" v-for="(item,index) in xitong_list" :key="index">
                                <div class="lf">{{item.id}}</div>
                                <div class="lf">{{item.startprice}}</div>
                                <div class="lf">{{item.endprice}}</div>
                                <div class="lf">{{item.bili}}</div>
                                <div class="lf">{{item.startstocknum}}</div>
                                <div class="lf">{{item.endstocknum}}</div>
                                <div class="lf">{{item.createtime}}</div>
                                <div class="clearboth"></div>
                            </div>
                            <div class="sh_table_con" v-show='xitong_list.length==0'>
                                <div class="list_null">{{$t('m.noData')}}</div>
                            </div>
                        </div>
                        <div class="btm" v-show='xitong_list.length!=0'>
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
                                <span class="btn up_page">{{$t('m.previousPage')}}</span>
                                <span class="btn down_page">{{$t('m.nextPage')}}</span>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
        <!-- 查看详情 -->
       <div class="look_det_fixed">
            <div class="look_det_con">
               <div class="look_det_top">
                   <span>详情信息</span>
                   <button class="look_det_close sh_model_btm" @click="close"></button>
               </div>
               <div class="det_ct_con">
                   <div class="det_con_top">
                       <div class="det_con_top_list" v-for="(item,index) in det_top" :key="index">{{item}}</div> 
                       <div class="clearboth"></div>
                   </div>
                   <div class="det_ct_con_ct">
                        <div class="det_ct_row">
                           <div class="det_ct_col" v-for='(item,index) in det_list' :key='index'>{{item}}</div>
                           <div class="clearboth"></div>
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
    // 引入echarts
    var echarts = require('echarts');
    export default {
        data(){
            return{
                topData:[
                    {url:'./deal',text:this.$t('m.deal2')},
                    {url:'./cashdeal',text:this.$t('m.deal3')}
                ],
                // account_data:[{
                //         value: '0',
                //         label: '会员1'
                //         }, {
                //         value: '1',
                //         label: '会员2'
                //         }, {
                //         value: '2',
                //         label: '会员3'
                //         }, {
                //         value: '3',
                //         label: '会员4'
                //         }
                //     ],
                account_id:'',      //会员ID
                account: '',
                credit2:'',
                currentprice:'',
                currenttotal:'',
                chaifencishu:'',

                
                container_show:'0',

                datax:[],
                datay:[],

                // 交易大厅
                chaifen_top:[
                    this.$t('m.deal27'),
                    this.$t('m.deal14'),
                    this.$t('m.deal15'),
                    this.$t('m.deal16'),
                    this.$t('m.deal17'),
                    this.$t('m.deal18'),
                    this.$t('m.deal19')
                ],
                chaifen_list:'',
                // 认购记录
                rengou_top:[
                    '会员编号',
                    '认购类型',
                    '认购金额',
                    '剩余金额',
                    '状态',
                    '时间',
                    '操作'
                ],
                rengou_list:[
                    ['ybw1319','复投',100,20,'匹配中','2018-12-28 12:15'],
                    ['ybw1319','复投',100,20,'匹配中','2018-12-28 12:15'],
                    ['ybw1319','复投',100,20,'匹配中','2018-12-28 12:15'],
                    ['ybw1319','复投',100,20,'匹配中','2018-12-28 12:15'],
                    ['ybw1319','复投',100,20,'匹配中','2018-12-28 12:15']
                ],

                // 挂卖记录
                guamai_top:[
                    '会员编号',
                    '挂卖类型',
                    '出售数量',
                    '剩余数量',
                    '出售价格',
                    '状态',
                    '时间',
                    '操作'
                ],
                guamai_list:[
                    ['ybw1319','复投',100,20,10,'匹配中','2018-12-28 12:15'],
                    ['ybw1319','复投',100,20,10,'匹配中','2018-12-28 12:15'],
                    ['ybw1319','复投',100,20,10,'匹配中','2018-12-28 12:15'],
                    ['ybw1319','复投',100,20,10,'匹配中','2018-12-28 12:15'],
                    ['ybw1319','复投',100,20,10,'匹配中','2018-12-28 12:15']
                ],
                // 系统拆分记录
                xitong_top:[
                    this.$t('m.deal20'),
                    this.$t('m.deal21'),
                    this.$t('m.deal22'),
                    this.$t('m.deal23'),
                    this.$t('m.deal24'),
                    this.$t('m.deal25'),
                    this.$t('m.deal26'),
                ],
                xitong_list:[],


                table_top_list:[
                    '会员编号',
                    '升级钱等级',
                    '升级后等级',
                    '时间'
                ],
                table_con_list:[],
                currentPage2:0,                 //页数
                det_top:[],                     //查看详情头部
                det_list:['100','100','55','2018-12-28 15:20'],        //查看详细数据，

                // 系统拆分记录
                page_total1:0,
                currentPage1:0,
                
            }
        },
        mounted(){
            var _this=this;
            this.inload();
            setTimeout(function(){
                _this.drawLine();
            },350)
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange1(val) {
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=systemchaifen&page='+val)
                .then(function (json) {
                    if(json.data.status==1){
                        _this.xitong_list=json.data.result.list;
                        _this.currentPage1=json.data.result.page;
                    }
                
                })
                .catch(function (error) {
                    console.log(error);
                });   
            },
            down_page1(){
                var _this=this;
                if(_this.xitong_list.length<25){
                    _this.$toast.center('最后一页啦');
                    return;
                }
                var val=this.currentPage1+1;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=systemchaifen&page='+val)
                .then(function (json) {
                    var data=json.data.result;
                    if(json.data.status==1){
                        _this.xitong_list=json.data.result.list;
                        _this.currentPage1=json.data.result.page;
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
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=systemchaifen&page='+val)
                .then(function (json) {
                    var data=json.data.result;
                    if(json.data.status==1){
                        _this.xitong_list=json.data.result.list;
                        _this.currentPage1=json.data.result.page;
                    }
                
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            // 点击详情
            look_det(index){
                if(index==6){
                    this.det_top=['金额','价格','认购数量','时间']
                }else if(index==7){
                    this.det_top=['购买数量','购买价格','金额','时间']
                }
                $('.look_det_fixed').show();
            },
            // 关闭详情
            close(){
                $('.look_det_fixed').hide();
            },
            // 切换选项
            select_con(event){
                var data_id=$(event.currentTarget).attr('data-id');
                switch(data_id){
                    case '0':this.container_show='0';
                        break;
                    case '1':this.container_show='1';
                        break;
                    case '2':this.container_show='2';
                        break;
                    case '3':this.container_show='3';
                        break;
                }
                $(event.currentTarget).addClass('up_se_list_ac').siblings().removeClass('up_se_list_ac');
                
            },
            // 绘制这些图
             drawLine(){
                 var _this=this;
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('zheline'))
                // 绘制图表
                myChart.setOption({
                    
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['价格走势图']
                    },
                    grid: {
                        left: '4%',
                        right: '4%',
                        bottom: '3%',
                        top:'5%',
                        containLabel: true
                    },
                    // toolbox: {
                    //     feature: {
                    //         saveAsImage: {}
                    //     }
                    // },
                    xAxis: {
                        show:true,
                        type: 'category',
                        boundaryGap: false,
                        data: _this.datax,
                        axisLine:{
                            lineStyle:{
                                color:'#fff'
                            }
                        }
                    },
                    yAxis: {
                        show:true,
                        type: 'value',
                        axisLine:{
                            lineStyle:{
                                color:'#fff'
                            }
                        },
                        min:'0.2',
                        max:'0.4'
                    },
                    series: [
                        {
                            name:'价格',
                            type:'line',
                            stack: '总量',
                            data:_this.datay
                        }
                    ]
                });

            },

            inload(){
                var _this=this;
                // 拆分记录
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=chaifen')
                .then(function (json) {
                    var data=json.data.result;
                    if(json.data.status==1){
                        // console.log(json);
                        _this.account=data.men.account;
                        _this.credit2=data.men.credit2;
                        _this.currentprice=data.men.currentprice;
                        _this.currenttotal=data.men.currenttotal;
                        _this.chaifencishu=data.men.chaifencishu;
                        _this.account_id=data.men.uid;
                        // _this.datay=data.each;
                        // for(var i=0;i<_this.datay.length;i++){
                        //     _this.datax.push(i+'时');
                        // }
                         var each=data.each;
                        for(let key in each){
                            _this.datax.push(key+'时');
                            _this.datay.push(each[key])
                        }
                            _this.chaifen_list=data.list;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

                // 系统拆分记录
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=systemchaifen')
                .then(function (json) {
                    if(json.data.status==1){
                        _this.xitong_list=json.data.result.list;
                        _this.page_total1=parseInt(json.data.result.total);
                        _this.currentPage1=json.data.result.page;
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
    .lf{
        float: left;
    }
    .ri{
        float:right;
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
        font-size: 14px;
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
    /* .container{
    } */
    .container_list{
        position: relative;
        padding-left: 190px;
        margin-bottom: 7px;
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
        padding: 15px;
    }
    .ct_lf{
        width: 35%;
        float: left;
        padding: 0 15px;
        height: 345px;
    }
    .ct_ri{
        width: 65%;
        float: left;
        height: 345px;
    }
    .ct_con{
        background-color: #38485f;

    }
    .ct_lf_top, .ct_ri_top{
        width: 100%;
        line-height: 40px;
        color: #fff;
        padding-left: 15px;
        text-align: left;
    }
    .ct_lf_con,.ct_ri_con{
        background-color: #4f647f;
        padding: 15px;
        height: 88%;
    }
    .ct_ri_con{
        background:#3C4E66;
    }
    .ct_lf_con_lf, .ct_lf_con_ri{
        line-height: 35px;
        margin-right: 8px;
    }
    /* 拆分列表 */
    .chaifen_title{
        font-size: 16px;
        padding-left:20px;
        line-height: 45px;
        text-align: left;
    }
    .chaifen_top{
        width:14.2857%;
        padding:8px 10px;
        color:#fff;
        /* background:#38485f; */
        text-align: left;
    }
    .chaifen_list{
        border-bottom: 1px solid #608BB8;
    }
    .chaifen_list>.list{
        width:14.2857%;
        padding:5px 10px;
        color:#fff;
        min-height: 33px;
        text-align: left;
    }
        /* page */
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
    /* 认购记录 */
    .rengou_top_list{
        width:14.285%;
        line-height: 33px;
        padding:0 10px;
        color:#fff;
        background:#38485f;
        text-align: left;
    }
    .rengou_list{
        border-bottom: 1px solid #608BB8;
    }
    .rengou_list>.lf{
        width:14.285%;
        padding:5px 10px;
        text-align: left;
    }
    /* 挂卖记录 */
    /* 认购记录 */
    .guamai_top_list{
        width:12.5%;
        line-height: 33px;
        padding:0 10px;
        color:#fff;
        background:#38485f;
        text-align: left;
    }
    .guamai_list{
        border-bottom: 1px solid #608BB8;

    }
    .guamai_list>.lf{
        width:12.5%;
        padding:5px 10px;
        text-align: left;
    }
    /* 系统拆分记录 */
    .xitong_top{
        background:#323F52;
    }
    .xitong_top_list{
        width:14.285%;
        
        padding:8px 10px;
        color:#fff;
        /* background:#38485f; */
        text-align: left;
    }
    .xitong_list{
        border-bottom: 1px solid #608BB8;
    }
    .xitong_list>.lf{
        width:14.285%;
        padding:8px 10px;
        text-align: left;
        
    }
    .blue{
        color:#66b1ff;
        cursor: pointer;
    }
    /* 查看详情 */
    .look_det_fixed{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        margin: 0;
        background: rgba(0,0,0,.3);
        z-index: 999;
        display: none;
    }
    .look_det_con{
        position: relative;
        margin: 0 auto 50px;
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
        box-sizing: border-box;
        width: 100%;
        max-width: 676px;
        color:#fff;
        margin-top: 15vh;
    }
    .look_det_top{
        background-color: #38485f;
        padding:20px 20px 10px;
        text-align: left;
    }
    .look_det_top>span{
        line-height: 24px;
        font-size: 18px;
        text-align: left;
    }
    .look_det_close{
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
    }
    .sh_model_btm{
        position: absolute;
        width:15px;
        height: 15px;
        overflow: hidden;
        border-radius: 50%;
    }
    .container_btm_top{
        background:#323F52;

    }
    .sh_model_btm:before , .sh_model_btm::after{
        content: '';
        width:10px;
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
    .det_ct_con{
        background-color: #3c4e66;
        padding: 30px 20px;
        font-size: 14px;
    }
    .det_con_top_list{
        float: left;
        line-height: 23px;
        width:25%;
        text-align: left;
        padding:5px;
    }
    .det_con_top{
        background: #323F52;
    }
    .det_ct_row{
        line-height: 23px;
        text-align: left;
        padding:5px;
        border-bottom: 1px solid #425671;
        background:#38485F;
    }
    .det_ct_col{
        float: left;
        line-height: 23px;
        width:25%;
        text-align: left;
        padding:0px 5px;
    }
    .padding_15{
        padding:20px 5px;
    }
    .chaifen_con{
        width:100%;
        padding:0 15px;
    }
    /* 查看详情结束 */
    /* 暂无数据 */
    .data_null{
        line-height: 45px;
        text-align: center;
        color:#909399;
        background:#36465d;
    }
    /* 暂无数据 */
    .list_null{
        min-height: 60px;
        text-align: center;
        line-height: 60px;
        color:#909399;
        background:#36465d;
    }
    .page_con{
        display: block
    }
    .mobile_page{
        display: none;
    }

    /* 移动端 */
    @media screen and (max-width: 767px){
        .up_con{
            margin:0px;
        }
        .ct_lf, .ct_ri{
            width:100%;
        }
        .up_select_con{
            font-size: 13px;
            padding:0 15px;
        }
        .up_se_list{
            margin-right: 12px;
            
        }
        .up_se_list:last-child{
            margin-right: 0px;
        }
        .container_btm{
            width:100%;
            padding:15px;
        }
        .container_btm_top{
            width:100%;
        }
        .chaifen_con{
            width:100%;
            overflow: scroll;
            padding:0 0;
        }
        .list_null, .container_btm_top,.chaifen_list{
            width:850px;
        }
        .chaifen_list>.list{
            width:16.666%;
            padding:5px;
            min-height: 33px;
            text-align:left;
            float: left;
            display: table-cell;
            vertical-align: middle;
            font-size: 14px;
        }
        .pading15{
            width:100%;
            overflow: scroll;
        }
        .rengou_top, .rengou_list{
            width:560px;
        }
        .guamai_top, .guamai_list{
            width:640px;
        }
        .xitong_top, .xitong_list{
            width:850px;
        }
        .up_con{
            padding-bottom: 15px;
        }
        .look_det_con{
            width:90%;
            margin-top: 30%;
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

    }
    @media screen and (max-width: 320px){
        .up_select_con{
            font-size: 12px;
            padding:0 15px;
        }
        .up_se_list{
            margin-right: 10px;
        }


    }
</style>