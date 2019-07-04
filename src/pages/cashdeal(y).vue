<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 公共部分 -->
       <my-Com :lf-index=6 :top-data="topData" :top-index=1 :now-add="this.$t('m.deal3')"></my-Com>
       <div class="index_con">
           <div class="up_con">
                <div class="up_con_top">
                   {{$t('m.deal3')}}
                </div>
                <div class="up_select_con">
                    <div class="up_se_list up_se_list_ac" data-id='1' @click='select_con'>{{$t('m.cash1')}}</div>
                    <div class="up_se_list" data-id='2' @click='select_con'>{{$t('m.cash2')}}</div>
                    <div class="up_se_list" data-id='3' @click='select_con'>{{$t('m.cash3')}}</div>
                </div>
                
                <div class="up_ct_con">
                    <!-- 交易大厅 -->
                    <div class="container_con" v-show="container_show==1">
                        <div class="up_select_con" style='margin-top:8px;'>
                            <div class="up_se_list up_se_list_ac" data-id='1' @click='select_1_2'>{{$t('m.cash4')}}</div>
                            <div class="up_se_list" data-id='2' @click='select_1_2'>{{$t('m.cash5')}}</div>
                        </div>
                        <!-- 出售列表 -->
                        <div class="container_1_2" v-show="container_1_2==1">
                            <div class="sell_top">{{$t('m.cash6')}}</div>
                            <div class="sell_con">
                                <div class="sell_list">
                                    <label for="" class='star_null'>{{$t('m.cash7')}}</label>
                                    <div class="sell_list_ri">
                                        <el-rate
                                            v-model="credit"
                                            disabled
                                            text-color="#ff9900"
                                            score-template="{value}">
                                        </el-rate>
                                    </div>
                                </div>
                                <div class="sell_list">
                                    <label for="" class=''>{{$t('m.cash8')}}</label>
                                    <div class="sell_list_ri">
                                            <select v-model="sell_currency">
                                                <option value="0">{{$t('m.cash9')}}</option>
                                                <option value="1">{{$t('m.cash10')}}</option>
                                            </select>
                                    </div>
                                    <span class="input_null" v-if="tip_show && sell_currency=='0'">{{$t('m.cash11')}}</span>
                                </div>
                                <div class="sell_list" v-show='sell_currency !=0'>
                                    <label for="" class='star_null'>{{$t('m.cash12')}}</label>
                                    <div class="sell_list_ri" >
                                            {{xjb}}
                                    </div>
                                </div>
                                <div class="sell_list">
                                    <label for="" class=''>{{$t('m.cash13')}}</label>
                                    <div class="sell_list_ri">
                                        <select  v-model="sell_number">
                                            <option value="0">{{$t('m.cash9')}}</option>
                                            <option value="1">100</option>
                                        </select>
                                    </div>
                                    <span class="input_null" v-if="tip_show && sell_number=='0'">{{$t('m.cash11')}}</span>
                                </div>
                                <div class="sell_list" v-show='sell_number !=0'>
                                    <label for="" class='star_null'>{{$t('m.cash14')}}</label>
                                    <div class="sell_list_ri" >
                                        {{rate}}
                                    </div>
                                </div>
                                <div class="sell_list">
                                    <label for="" class=''>{{$t('m.cash15')}}</label>
                                    <div class="sell_list_ri">
                                        <input type="password" placeholder="请输入交易密码" v-model='dealpassword'>
                                    </div>
                                    <span class="input_null" v-if="tip_show && dealpassword==''">{{$t('m.cash16')}}</span>
                                </div>
                                <button class='submit' @click='sell'>{{$t('m.cash17')}}</button>
                            </div>
                            <div class="sell_top">{{$t('m.cash18')}}</div>
                            <div class="padding15">
                                <div class="sh_table">
                                    <div class="sh_table_top">
                                        <div class="sell_top_list chushou_top" v-for="(item,index) in sell_top_list" :key='index'>{{item}}</div>
                                        <div class="clearboth"></div>
                                    </div>
                                    <div class="sh_table_con" v-show='sell_list.length!=0'>
                                        <div class="sell_con_list" v-for="(item,index) in sell_list" :key="index">
                                            <div class="sell_list2 sell_id">{{item.id}}</div>
                                            <div class="sell_list2">{{item.account}}</div>
                                            <div class="sell_list2">{{item.cmobile}}</div>
                                            <div class="sell_list2">{{item.type}}</div>
                                            <div class="sell_list2">{{item.money}}</div>
                                            <div class="sell_list2">{{item.createtime}}</div>
                                            <div class="sell_list2">{{item.desc}}</div>
                                            <div class="sell_list2 blue" @click='operation' v-show='item.status!=1'>操作</div>
                                            <div class="sell_list2"  v-show='item.status==1'></div>
                                            <div class="clearboth"></div>
                                        </div>
                                    </div>
                                    <div class="sh_table_con" v-show='sell_list.length==0'>
                                        <div class="list_null">{{$t('m.noData')}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="btm" style='margin-top:15px;' v-show='sell_list.length!=0'>
                                <div class="page_con">
                                    <div class="">
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage2"
                                        :page-sizes="[25, 50, 100]"
                                        :page-size="25"
                                        layout="total, prev, pager, next"
                                        :total="2">
                                        </el-pagination>
                                    </div>
                                </div>
                                <div class="mobile_page">
                                    <span class="btn up_page">{{$t('m.previousPage')}}</span>
                                    <span class="btn down_page">{{$t('m.nextPage')}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 购买列表 -->
                        <div class="container_1_2" v-show="container_1_2==2">
                            <div class="sell_top">{{$t('m.cash27')}}</div>
                            <div class="sell_con">
                                <div class="sell_list">
                                    <label for="" class='star_null'>{{$t('m.cash28')}}</label>
                                    <div class="sell_list_ri">
                                        <el-rate
                                            v-model="credit"
                                            disabled
                                            text-color="#ff9900"
                                            score-template="{value}">
                                        </el-rate>
                                    </div>
                                </div>
                                <div class="sell_list">
                                    <label for="" class=''>{{$t('m.cash29')}}</label>
                                    <div class="sell_list_ri">
                                            <select v-model="buy_currency">
                                                <option value="0">{{$t('m.cash30')}}</option>
                                                <option value="1">{{$t('m.cash31')}}</option>
                                            </select>
                                    </div>
                                    <span class="input_null" v-if="tip_show2 && buy_currency=='0'">{{$t('m.cash32')}}</span>
                                </div>
                                <div class="sell_list" v-show='buy_currency !=0'>
                                    <label for="" class='star_null'>{{$t('m.cash33')}}</label>
                                    <div class="sell_list_ri" >
                                            {{xjb2}}
                                    </div>
                                </div>
                                <div class="sell_list">
                                    <label for="" class=''>{{$t('m.cash34')}}</label>
                                    <div class="sell_list_ri">
                                            <select name="" id="" v-model="buy_number">
                                                <option value="0">{{$t('m.cash35')}}</option>
                                                <option value="1">100</option>
                                            </select>
                                    </div>
                                    <span class="input_null" v-if="tip_show2 && buy_number=='0'">{{$t('m.cash36')}}</span>
                                </div>
                                <div class="sell_list" v-show='buy_number !=0'>
                                    <label for="" class='star_null'>{{$t('m.cash37')}}</label>
                                    <div class="sell_list_ri" >
                                         {{rate2}}
                                    </div>
                                </div>
                                <div class="sell_list">
                                    <label for="" class=''>{{$t('m.cash38')}}</label>
                                    <div class="sell_list_ri">
                                        <input type="password" placeholder="请输入交易密码" v-model='dealpassword2'>
                                    </div>
                                    <span class="input_null" v-if="tip_show2 && dealpassword2==''">{{$t('m.cash39')}}</span>
                                </div>
                                <button class='submit' @click='buy'>{{$t('m.cash40')}}</button>
                            </div>
                            <div class="sell_top">{{$t('m.cash41')}}</div>
                            <div class="padding15">
                                <div class="sh_table">
                                    <div class="sh_table_top">
                                        <div class="sell_top_list" v-for="(item,index) in buy_top_list" :key='index'>{{item}}</div>
                                        <div class="clearboth"></div>
                                    </div>
                                    <div class="sh_table_con" v-show='buy_list.length!=0'>
                                        <div class="sell_con_list" v-for="(item,index) in buy_list" :key="index">
                                            <div class="sell_list2 buy_id">{{item.id}}</div>
                                            <div class="sell_list2">{{item.account}}</div>
                                            <div class="sell_list2">{{item.cmobile}}</div>
                                            <div class="sell_list2">{{item.type}}</div>
                                            <div class="sell_list2">{{item.money}}</div>
                                            <div class="sell_list2">{{item.createtime}}</div>
                                            <div class="sell_list2">{{item.desc}}</div>
                                            <div class="order_list" v-if='item.status !=1'>
                                                <button @click='buyfn' class='margin5'>确认</button>
                                                <!-- <button @click="buyquexiao">取消</button> -->
                                            </div>
                                            <div class="clearboth"></div>
                                        </div>
                                    </div>
                                    <div class="sh_table_con" v-show='buy_list.length==0'>
                                        <div class="list_null">{{$t('m.noData')}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="btm" style='margin-top:15px;' v-show='buy_list.length!=0'>
                                <div class="page_con">
                                    <div class="">
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage2"
                                        :page-sizes="[25, 50, 100]"
                                        :page-size="25"
                                        layout="total, prev, pager, next"
                                        :total="2">
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
                    <!-- 我的订单 -->
                    <div class="container_con" v-show="container_show==2">
                        <div class="padding15">
                            <div class="sh_table">
                                <div class="sh_table_top width610">
                                    <div class="order_top_list lf" v-for="(item,index) in order_top_list" :key='index'>{{item}}</div>
                                    <div class="clearboth"></div>
                                </div>
                                <div class="sh_table_con width610" v-show='order_list.length!=0'>
                                    <div class="order_con_list" v-for="(item,index) in order_list" :key="index">
                                        <div class="order_list order_id" v-show='false'>{{item.id}}</div>
                                        <div class="order_list">{{item.leixing}}</div>
                                        <div class="order_list">{{item.type}}</div>
                                        <div class="order_list">{{item.money}}</div>
                                        <div class="order_list">{{item.createtime}}</div>
                                        <div class="order_list">{{item.desc}}</div>
                                        <div class="order_list">{{item.mmobile}}</div>
                                        <div class="order_list blue upload">
                                            <div class='url_con' @click='scaleImg'>
                                                <div v-show='item.voucher==""'>
                                                    上传凭证
                                                </div>
                                                <img style="height:100%;" :src="item.voucher" v-show='item.voucher!=""'/>
                                            </div>
                                            <div class='add_url' v-show='item.voucher==""'>
                                                <div class="data_url" v-show='false' data-src=''></div>
                                                <input type="file" @change="uploadimg">
                                                <div class='add'>+</div>
                                            </div>
                                            <div class='clearboth'></div>
                                        </div>
                                        <div class="order_list" v-if='item.operation==1 && item.status !=2'>
                                            <button @click='orderfn' class="margin5">确认</button>
                                            <button @click="quexiao">取消</button>
                                        </div>
                                        <div class="order_list" v-else-if='item.operation==0'>
                                            <button @click='confirmMoney'>确认打款</button>
                                        </div>
                                        <div class="order_list" v-else></div>
                                        <div class="clearboth"></div>
                                    </div>
                                </div>
                                <div class="sh_table_con width610" v-show='order_list.length==0'>
                                    <div class="list_null">{{$t('m.noData')}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="btm" style='margin-top:15px;' v-show='order_list.length!=0'>
                            <div class="page_con">
                                <div class="">
                                    <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage2"
                                    :page-sizes="[25, 50, 100]"
                                    :page-size="25"
                                    layout="total, prev, pager, next"
                                    :total="2">
                                    </el-pagination>
                                </div>
                            </div>
                            <div class="mobile_page">
                                <span class="btn up_page">{{$t('m.previousPage')}}</span>
                                <span class="btn down_page">{{$t('m.nextPage')}}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 我的认购 -->
                    <div class="container_con" v-show="container_show==3">
                        <div class="padding15">
                            <div class="sh_table">
                                <div class="sh_table_top width610">
                                    <div class="rengou_top_list lf" v-for="(item,index) in rengou_top" :key='index'>{{item}}</div>
                                    <div class="clearboth"></div>
                                </div>
                                <div class="sh_table_con width610" v-show='rengou_list.length!=0'>
                                    <div class="rengou_con_list" v-for="(item,index) in rengou_list" :key="index">
                                        <div class="rengou_list rengou_id" v-show='false'>{{item.id}}</div>
                                        <div class="rengou_list">{{item.leixing}}</div>
                                        <div class="rengou_list">{{item.type}}</div>
                                        <div class="rengou_list">{{item.money}}</div>
                                        <div class="rengou_list">{{item.desc}}</div>
                                        <div class="rengou_list">{{item.sellmobile}}</div>
                                        <div class="rengou_list">{{item.createtime}}</div>
                                        <!-- <div class="rengou_list">上传凭证</div>
                                        <div class="rengou_list">操作</div> -->
                                        <div class="rengou_list blue upload">
                                            <div class='url_con' @click='scaleImg'>
                                                <div v-show='item.voucher==""'>
                                                    上传凭证
                                                </div>
                                                <img style="height:100%;" :src="item.voucher" v-show='item.voucher!=""'/>
                                            </div>
                                            <div class='add_url' v-show='item.voucher==""'>
                                                <div class="data_url" v-show='false' data-src=''></div>
                                                <input type="file" @change="uploadimg">
                                                <div class='add'>+</div>
                                            </div>
                                            <div class='clearboth'></div>
                                        </div>
                                        <div class="rengou_list" v-if='item.operation==1 && item.status !=2'>
                                            <button @click='orderfn' class="margin5">确认</button>
                                            <button @click="quexiao">取消</button>
                                        </div>
                                        <div class="rengou_list" v-else-if='item.operation==0'>
                                            <button @click='confirmMoney2'>确认打款</button>
                                        </div>
                                        <div class="rengou_list" v-else></div>
                                        <div class="clearboth"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="sh_table_con width610" v-show='rengou_list.length==0'>
                                <div class="list_null">{{$t('m.noData')}}</div>
                            </div>
                        </div>
                        <div class="btm" style='margin-top:15px;' v-show='rengou_list.length!=0'>
                            <div class="page_con">
                                <div class="">
                                    <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage2"
                                    :page-sizes="[25, 50, 100]"
                                    :page-size="25"
                                    layout="total, prev, pager, next"
                                    :total="2">
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
        <!-- 图片放大 -->
       <div class="look_det_fixed">
           <div class="look_det_con" @click="closeImg">
                <img class='scale' src="" alt="">
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
                    {url:'./deal',text:this.$t('m.deal2')},
                    {url:'./cashdeal',text:this.$t('m.deal3')}
                ],
                credit:5,                           //信用
                tip_show:false,
                tip_show2:false,
                container_show:1,                   //一级菜单
                container_1_2:1,                    //二级菜单

                currentPage2:50,

                rate:'',                            //汇率
                xjb:'',                             //余额

                

                // 出售列表
                sell_top_list:[
                    this.$t('m.cash19'),
                    this.$t('m.cash20'),
                    this.$t('m.cash21'),
                    this.$t('m.cash22'),
                    this.$t('m.cash23'),
                    this.$t('m.cash24'),
                    this.$t('m.cash25'),
                    this.$t('m.cash26'),
                ],
                sell_list:[],

                rate2:'',                            //汇率
                xjb2:'',                             //余额

                // 购买列表
                buy_top_list:[
                    this.$t('m.cash42'),
                    this.$t('m.cash43'),
                    this.$t('m.cash44'),
                    this.$t('m.cash45'),
                    this.$t('m.cash46'),
                    this.$t('m.cash47'),
                    this.$t('m.cash48'),
                    this.$t('m.cash49')
                ],
                buy_list:[],
                // 我的订单
                order_top_list:[
                    this.$t('m.cash50'),
                    this.$t('m.cash51'),
                    this.$t('m.cash52'),
                    this.$t('m.cash53'),
                    this.$t('m.cash54'),
                    this.$t('m.cash55'),
                    this.$t('m.cash56'),
                    this.$t('m.cash57')
                ], 
                order_list:[],

                // 我的认购
                rengou_top:[
                    this.$t('m.cash58'),
                    this.$t('m.cash59'),
                    this.$t('m.cash60'),
                    this.$t('m.cash61'),
                    this.$t('m.cash62'),
                    this.$t('m.cash63'),
                    this.$t('m.cash64'),
                    this.$t('m.cash65')
                ],
                rengou_list:[],    


                sell_currency:0,            //出售货币数量
                sell_number:0,              //出售数量
                dealpassword:'',            //交易密码


                buy_currency:0,            //出售货币数量
                buy_number:0,              //出售数量
                dealpassword2:'',            //交易密码
            }
        },
        mounted(){
            this.inreload();

            
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            select_con(e){
                var data_id=$(event.currentTarget).attr('data-id');
                switch(data_id){
                    case '1':this.container_show=1;
                        break;
                    case '2':this.container_show=2;
                        break;
                    case '3':this.container_show=3;
                        break;
                }
                $(event.currentTarget).addClass('up_se_list_ac').siblings().removeClass('up_se_list_ac');

            },
            // 二级菜单切换
            select_1_2(){
                var data_id=$(event.currentTarget).attr('data-id');
                switch(data_id){
                    case '1':this.container_1_2=1;
                        break;
                    case '2':this.container_1_2=2;
                        break;
                }
                $(event.currentTarget).addClass('up_se_list_ac').siblings().removeClass('up_se_list_ac');
            },
            // 出售货币
            sell(){
                var _this=this;
                if(this.sell_currency=='0'){
                    this.tip_show=true;
                    return;
                }
                if(this.sell_number=='0'){
                    this.tip_show=true;
                    return;
                }
                if(this.dealpassword==''){
                    this.tip_show=true;
                    return;
                }
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=sell&op1=sell1&password='+_this.dealpassword)
                    .then(function (json) {
                        // console.log(json)
                        if(json.data.status==1){
                            _this.$toast.center(json.data.result);
                            setTimeout(function(){
                                window.location.reload();
                                
                            },1000);
                        }else{
                            _this.$toast.center(json.data.result);
                            setTimeout(function(){
                                window.location.reload();
                                
                            },1000);
                        }
                    
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            },
            // 购买现金币
            buy(){
                if(this.buy_currency=='0'){
                    this.tip_show2=true;
                    return;
                }
                if(this.buy_number=='0'){
                    this.tip_show2=true;
                    return;
                }
                if(this.dealpassword2==''){
                    this.tip_show2=true;
                    return;
                }
                var _this=this;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=request&op1=sell1&password='+_this.dealpassword2)
                    .then(function (json) {
                        // console.log(json)
                        if(json.data.status==1){
                            _this.$toast.center(json.data.result);
                            setTimeout(function(){
                                window.location.reload();

                            },1000);
                        }else{
                            
                            _this.$toast.center(json.data.result);
                            setTimeout(function(){
                                window.location.reload();
                                
                            },1000);
                        }
                    
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            },
             //进页面加载
            inreload(){
                var _this=this
                // 出售
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=sell')
                    .then(function (json) {
                        // console.log(json);
                        var data=json.data.result;
                        if(json.data.status==1){
                            _this.rate=data.men.rate;
                            _this.xjb=data.men.xjb;
                            _this.sell_list=data.list;
                        }
                    
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
                
                // 购买
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=request')
                    .then(function (json) {
                        // console.log(json);
                        var data=json.data.result;
                        if(json.data.status==1){
                           _this.rate2=data.men.rate;
                            _this.xjb2=data.men.xjb;
                            _this.buy_list=data.list;
                        }
                    
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });


                // 我的订单
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=orderlist')
                .then(function (json) {
                    var data=json.data.result;
                    if(json.data.status==1){
                        // console.log(json);
                        _this.order_list=data.list;
                        
                    }
                
                })
                .catch(function (error) {
                    alert(error);
                });

                // 我的认购
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=paylist')
                .then(function (json) {
                    var data=json.data.result;
                    if(json.data.status==1){
                        // console.log(json);
                        _this.rengou_list=data.list;
                        
                    }
                
                })
                .catch(function (error) {
                    alert(error);
                });
            },

            // 操作
            operation(e){
                var _this=this;
                var id=$(e.currentTarget).siblings('.sell_id').html()
                this.$confirm('确认购买, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=sell&op1=pay&id='+id)
                            .then(function (json) {
                                // console.log(json)
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
                                // console.log(error);
                            });
                    }).catch(() => {
                        // this.$message({
                        //     type: 'info',
                        //     message: '已取消删除'
                        // });          
                    });
            },
            // 我的订单确认
            orderfn(e){
                var _this=this;
                var order_id=$(e.currentTarget).parent().siblings('.order_id').html();
                this.$confirm('是否完成交易?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    _this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=orderlist&op1=paysuccess&id='+order_id)
                    .then(function (json) {
                        var data=json.data.result;
                        _this.$toast.center(json.data.result);
                        setTimeout(function(){
                            window.location.reload();
                        },1000)
                    })
                    .catch(function (error) {
                        alert(error);
                    });

                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });          
                });
            },
            // 我的订单取消
            quexiao(e){
                var _this=this;
                var order_id=$(e.currentTarget).parent().siblings('.order_id').html();
                this.$confirm('是否取消交易?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    _this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=orderlist&op1=payerror&id='+order_id)
                    .then(function (json) {
                        var data=json.data.result;
                        _this.$toast.center(json.data.result);
                        setTimeout(function(){
                            window.location.reload();
                        },1000)
                    })
                    .catch(function (error) {
                        alert(error);
                    });

                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });          
                });
            },

            // 购买确认
            buyfn(e){
                var _this=this;
                var buy_id=$(e.currentTarget).parent().siblings('.buy_id').html();
                this.$confirm('是否确认购买?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    _this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=request&op1=pay&id='+buy_id)
                    .then(function (json) {
                        // console.log(json);
                        var data=json.data.result;
                        _this.$toast.center(json.data.result);
                        setTimeout(function(){
                            window.location.reload();
                        },1000)
                    })
                    .catch(function (error) {
                        alert(error);
                    });

                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });          
                });
            },
            
            // 上传凭证
            uploadimg(e){
                var obj=e.currentTarget;
                var _this=this
                var file = obj.files[0];
                if (!file) {
                    return;
                }
                var name = file.name;
                var fileName = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
                if (fileName !== "png" && fileName !== "jpg" && fileName !== "jpeg") {
                    alert("上传图片格式不正确，请重新上传");
                    return;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (f) {
                    var result = obj;
                    var src = f.target.result;
                    $(obj).siblings('.data_url').attr('data-src',src);
                    $(obj).parent().siblings('.url_con').html('<img style="height:100%;" src="'+src+'"/>');
                    
                }
            },
            // 放大图片
            scaleImg(e){
                if($(e.currentTarget).html()=='上传凭证'){
                    return;
                }
                var src=$(e.currentTarget).find('img').attr('src');
                $('.scale').attr('src',src)
                $('.look_det_fixed').fadeIn();
            },
            // 关闭详情
            closeImg(){
                $('.look_det_fixed').fadeOut();
            },
            // 确认打款
            confirmMoney(e){
                var _this=this;
                var src=$(e.currentTarget).parent().siblings('.upload').find('.data_url').attr('data-src');
                // console.log(src);
                if(src==''){
                    _this.$toast.center('请上传凭证');
                    return;
                }
                var order_id=$(e.currentTarget).parent().siblings('.order_id').html();
                _this.axios.post(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=orderlist&op1=auditor',{
                    id:order_id,
                    src:src
                })
                .then(function (json) {
                    // console.log(json);
                    var data=json.data.result;
                    _this.$toast.center(json.data.result);
                    setTimeout(function(){
                        window.location.reload();
                    },1000)
                })
                .catch(function (error) {
                    alert(error);
                });

            },
            // 我的认购确认打款
            confirmMoney2(e){
                var _this=this;
                var src=$(e.currentTarget).parent().siblings('.upload').find('.data_url').attr('data-src');
                // console.log(src);
                if(src==''){
                    _this.$toast.center('请上传凭证');
                    return;
                }
                var order_id=$(e.currentTarget).parent().siblings('.rengou_id').html();
                _this.axios.post(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=paylist&op1=auditor',{
                    id:order_id,
                    src:src
                })
                .then(function (json) {
                    // console.log(json);
                    var data=json.data.result;
                    _this.$toast.center(json.data.result);
                    setTimeout(function(){
                        window.location.reload();
                    },1000)
                })
                .catch(function (error) {
                    alert(error);
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
        margin-top: 13px;
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
        background:#323f52;
    }
    .sell_top_list{
        float: left;
        width:12.857%;
        background: #323F52;
        font-size: 14px;
        font-weight: 500;
        padding:8px;
        text-align:left;
    }
    .sell_top_list:first-child{
        float: left;
        width:10%;
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
    /* 出售现金币、 */
    .container_1_2{
    }
    .blue{
        color:#1886D8;
        cursor: pointer;
    }
    .sell_top{
        line-height: 40px;
        font-size: 16px;
        text-align: left;
        padding-left: 30px;
    }
    .sell_con{
        max-width: 425px;
        margin: 0 auto;
    }
    .sell_list>label::before{
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
    }
    .sell_list>.star_null::before{
        display: none;
    }
    .sell_list{
        position: relative;
        padding-left: 190px;
        margin-bottom: 7px;
        
        font-size: 14px;
        margin-top: 3px;
    }
    .sell_list>div{
        height: 35px;
        line-height: 35px;
        text-align: left;
    }
    .sell_list>label{
        position: absolute;
        display: inline-block;
        left: 0;
        text-align: right;
        width: 170px;
         height: 35px;
        line-height: 35px;
        color: #9fa9b2;
    }
    .sell_list>input{
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
    .sell_list select,.sell_list input{
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
    .sell_list>.input_null{
        color: red;
        display: inline-block;
        padding: 2px 0;
        width: 100%;
        height: 23px;
        text-align: left;
        font-size: 14px;
    }
    .sell_list_ri>div{
        height: 35px;
        line-height: 35px;
        text-align: left;
    }
    .sell_list>div i{
        font-size: 28px;
    }
    .submit{
        background-color: #0f87ff;
        border-color: #0f87ff;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        color:#fff;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        width: 260px;
        max-width: 400px;
        margin-top: 15px;
    }
    /* 出售列表 */
    
    .sell_list2{
        float: left;
        width:15%;
        min-height: 33px;
        background: #323F52;
        font-size: 14px;
        font-weight: 500;
        padding:8px;
        text-align:left;
    }
    .sell_con_list{
        background:#38485F;
        border-bottom:1px solid #425671;

    }
    .chushou_top, .sell_list2{
        width:12.857%;
    }
    .sell_list2{
        background:#38485F;
    }
    /* 我的订单 */
    .order_top_list,.order_list{
        float: left;
        width:12.5%;
        min-height: 36px;
        background: #323F52;
        font-size: 14px;
        font-weight: 500;
        padding:8px;
        text-align:left;
    }
    .order_con_list{
        border-bottom:1px solid #425671;
        background: #38485F;
    }
    .order_list{
        background:#38485F;
    }
    .sell_top_list:first-child,.sell_list2:first-child{
        width:10%;
    }
    .order_list>button{
        display: inline-block;
        background:#1886D8;
        color:#fff;
        border:none;
        border-radius: 3px;
    }
    .blue{
        color:#1886D8;
        cursor: pointer;
    }
    
    .add_url{
        position: relative;
        float: right;
        margin-right: 8%;
        margin-top: 4px;
        overflow: hidden;
    }
    .add_url>input{
        position: absolute;
        display: block;
        opacity: 0;
        top:0;
        bottom:0;
        width:100%;
        z-index: 100;
    }

    .url_con{
        float: left;
        height: 28px;
        line-height: 28px;
    }
    
    .add{
        width:20px;
        height: 20px;
        border-radius: 50%;
        border:1px solid #fff;
        font-size: 16px;
        text-align: center;
        line-height: 20px;
        color:#fff;
    }
    /* 我的认购 */
    .rengou_con_list{
        background: #38485F;
        border-bottom:1px solid #425671;
    }
    .rengou_top_list,.rengou_list{
        float: left;
        width:12.5%;
        min-height: 36px;
        background: #323F52;
        font-size: 14px;
        font-weight: 500;
        padding:8px;
        text-align:left;
    }
    .rengou_list{
        background:#38485F;
    }
    .rengou_list>button{
        display: inline-block;
        background:#1886D8;
        color:#fff;
        border:none;
        border-radius: 3px;
    }
    .upload{
        padding: 4px 8px;
    }
    /* 暂无数据 */
    .list_null{
        min-height: 60px;
        text-align: center;
        line-height: 60px;
        color:#909399;
        background:#38485F;
    }
    .padding15{
        padding:0 15px;
    }
    .page_con{
        display: block
    }
    .mobile_page{
        display: none;
    }


    /* 放大图片 */
    .look_det_fixed{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        margin: 0;
        background: rgba(0,0,0,.4);
        z-index: 999;
        display: none;
    }
    .look_det_con{
        position: relative;
        
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
    .scale{
        position: absolute;
        top:50%;
        left: 50%;
        max-width: 80%;
        max-height: 80%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
    }

    /* 移动端 */
    @media screen and (max-width: 767px){
        .up_con{
            margin:0px;
            padding-bottom: 0px;
        }
        .up_select_con{
            padding:0 15px;
        }
        .sell_con{
            padding:0 15px;
        }
        .sell_list{
            padding:0px;
        }
        .sell_list>label{
            position: static;
            width:100%;
            text-align: left;
        }
        .sh_table{
            overflow: scroll;
            width:100%;
        }
        .sh_table_top, .sh_table_con{
            width:780px;
        }
        .width610{
            width:1000px;
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
        .look_det_con{
            width:100%;
            height: 100%;
            overflow: hidden;
        }
        .look_det_con img{
            max-width: 70%;
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
        .margin5{
            /* margin-bottom: 5px; */
        }

    }
</style>