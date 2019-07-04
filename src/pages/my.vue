<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 公共部分 -->
       <my-Com :lf-index=3 :top-data="topData" :top-index=0 :now-add="this.$t('m.my1')" ></my-Com>
       <div class="index_con">
           <div class="my_con">
               <div class="my_con_top">
                    {{$t('m.my1')}}
               </div>
                <div class="my_ct">
                    <div class="my_ct_top">
                        <div class="input_con">
                            <input type="text"  v-model="findname" :placeholder="this.$t('m.my8')">
                        </div>
                        <button class="my_ct_btn" @click='find'>{{$t('m.my2')}}</button>
                        <button class="my_ct_btn" @click='upturning'>{{$t('m.my3')}}</button>
                        <button class="my_ct_btn" @click='leftlow'>{{$t('m.my4')}}</button>
                        <button class="my_ct_btn" @click='rightlow'>{{$t('m.my5')}}</button>
                        <button class="my_ct_btn" @click='inload' v-show='backtop!=memberaccount'>{{$t('m.my6')}}</button>
                        <div class="clearboth"></div>
                    </div>
                    <div class="my_ct_con" v-if='onetree!=""'>
                        <!-- 第一层 -->
                        <div class="ct_list">
                            <div class="ct_list_top">
                                <label for="" @click.stop="look_det(onetree.achievement)">{{$t('m.my7')}}</label>
                                <span>
                                    <img :src="leval1" alt="">
                                </span>
                            </div>
                            <div class="ct_list_ct">
                                <p>{{$t('m.my10')}}：{{onetree.name}}({{$t('m.my9')}})</p>
                                <div class="ct_list_btm">
                                    <div class="ct_item">
                                        <span>{{$t('m.my11')}}</span>
                                        <span>{{$t('m.my12')}}</span>
                                        <span>{{$t('m.my13')}}</span>
                                    </div>
                                    <div class="ct_item">
                                        <span>{{$t('m.my14')}}</span>
                                        <span>{{onetree.achievement.leftachievement}}</span>
                                        <span>{{onetree.achievement.rightachievement}}</span>
                                    </div>
                                    <div class="ct_item">
                                        <span>{{$t('m.my15')}}</span>
                                        <span>{{onetree.achievement.leftSurplus}}</span>
                                        <span>{{onetree.achievement.rightSurplus}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 第二、三层控制器 -->
                        <!-- <div class="two_control" v-show="!(twotree[0].id=='a' && twotree[1].id=='a')">  -->
                        <div class="two_control" v-show="twotree!=''"> 
                            <!-- 线 -->
                            <div class="ct_list bg_list1"></div>
                            <!-- 第二层 -->
                            <div class="ct_list ct_list2">
                                <!-- 左边 -->
                                <div class="ct_list2_lf">
                                    <div class="list2_lf_con" v-if="twotree[0].id !='a'" @click='look_down'>
                                        <div class="data" v-show="false">{{twotree[0].member_id}}</div>
                                        <div class="ct_list_top">
                                            <label for="" @click.stop="look_det(twotree[0].achievement)">{{$t('m.my7')}}</label>
                                            <span>
                                                <img :src="leval1" alt="">
                                            </span>
                                        </div>
                                        <div class="ct_list_ct">
                                            <p>{{$t('m.my10')}}：{{twotree[0].name}}({{$t('m.my9')}})</p>
                                            <div class="ct_list_btm">
                                                <div class="ct_item">
                                                    <span>{{$t('m.my11')}}</span>
                                                    <span>{{$t('m.my12')}}</span>
                                                    <span>{{$t('m.my13')}}</span>
                                                </div>
                                                <div class="ct_item">
                                                    <span>{{$t('m.my14')}}</span>
                                                    <span>{{twotree[0].achievement.leftachievement}}</span>
                                                    <span>{{twotree[0].achievement.rightachievement}}</span>
                                                </div>
                                                <div class="ct_item">
                                                    <span>{{$t('m.my15')}}</span>
                                                    <span>{{twotree[0].achievement.leftSurplus}}</span>
                                                    <span>{{twotree[0].achievement.rightSurplus}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ct_list2_ri" style="margin-right: 16%" v-else>
                                        <div class="list2_lf_con edit">
                                            <p>
                                                <span>{{$t('m.my16')}}</span>
                                                <router-link tag="a" :to="{path:'./bazaar', query:{anzhiposition:twotree[0].anzhiposition,anzhiid:onetree.account}}">
                                                    <span>
                                                        <img :src="register" style="wdith:14px;height:14px;" alt="">
                                                    </span>
                                                </router-link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <!-- 右边 -->
                                <div class="ct_list2_ri">
                                    <div class="list2_lf_con" v-if="twotree[1].id !='a'" @click='look_down'>
                                        <div class="data" v-show="false">{{twotree[1].member_id}}</div>
                                        <div class="ct_list_top">
                                            <label for="" @click.stop="look_det(twotree[1].achievement)">{{$t('m.my7')}}</label>
                                            <span>
                                                <img :src="leval1" alt="">
                                            </span>
                                        </div>
                                        <div class="ct_list_ct">
                                            <p>{{$t('m.my10')}}：{{twotree[1].name}}({{$t('m.my9')}})</p>
                                            <div class="ct_list_btm">
                                                <div class="ct_item">
                                                    <span>{{$t('m.my11')}}</span>
                                                    <span>{{$t('m.my12')}}</span>
                                                    <span>{{$t('m.my13')}}</span>
                                                </div>
                                                <div class="ct_item">
                                                    <span>{{$t('m.my14')}}</span>
                                                    <span>{{twotree[1].achievement.leftachievement}}</span>
                                                    <span>{{twotree[1].achievement.rightachievement}}</span>
                                                </div>
                                                <div class="ct_item">
                                                    <span>{{$t('m.my15')}}</span>
                                                    <span>{{twotree[1].achievement.leftSurplus}}</span>
                                                    <span>{{twotree[1].achievement.rightSurplus}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ct_list2_ri" style="float:none;margin-left:12%;" v-else>
                                        <div class="list2_lf_con edit">
                                            <p>
                                                <span>{{$t('m.my16')}}</span>
                                                <router-link tag="a" :to="{path:'./bazaar',query:{anzhiposition:twotree[1].anzhiposition,anzhiid:onetree.account}}">
                                                    <span>
                                                        <img :src="register" style="wdith:14px;height:14px;" alt="">
                                                    </span>
                                                </router-link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 第三层控制器 -->
                            <div class="three_control" v-show="threetree!=''">
                                <!-- 线 -->
                                <div class="ct_list bg_list2">
                                    <div class="bg_list2_lf" v-show="twotree[0].id !='a'"></div>
                                    <div class="bg_list2_ri" v-show="twotree[1].id !='a'"></div>
                                </div>
                                <!-- 第三层 -->
                                <div class="ct_list ct_list3">
                                    <!-- 左边 -->
                                    <div class="ct_list3_lf" v-show="twotree[0].id !='a'" >
                                        <div class="ct_list ct_list2">
                                            <div class="ct_list2_lf" v-if='threetree[1].id !="a"'>
                                                <div class="list2_lf_con" @click='look_down'>
                                                    <div class="data" v-show="false">{{threetree[1].member_id}}</div>
                                                    <div class="ct_list_top">
                                                        <label for="" @click.stop="look_det(threetree[1].achievement)">{{$t('m.my7')}}</label>
                                                        <span>
                                                            <img :src="leval1" alt="">
                                                        </span>
                                                    </div>
                                                    <div class="ct_list_ct">
                                                        <p>{{$t('m.my10')}}：{{threetree[1].name}}({{$t('m.my9')}})</p>
                                                        <div class="ct_list_btm">
                                                            <div class="ct_item">
                                                                <span>{{$t('m.my11')}}</span>
                                                                <span>{{$t('m.my12')}}</span>
                                                                <span>{{$t('m.my13')}}</span>
                                                            </div>
                                                            <div class="ct_item">
                                                                <span>{{$t('m.my14')}}</span>
                                                                <span>{{threetree[1].achievement.leftachievement}}</span>
                                                                <span>{{threetree[1].achievement.rightachievement}}</span>
                                                            </div>
                                                            <div class="ct_item">
                                                                <span>{{$t('m.my15')}}</span>
                                                                <span>{{threetree[1].achievement.leftSurplus}}</span>
                                                                <span>{{threetree[1].achievement.rightSurplus}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ct_list2_lf" v-else>
                                                <div class="list2_lf_con edit">
                                                    <p>
                                                        <span style="margin-left:10%;">{{$t('m.my16')}}</span>
                                                        <router-link tag="a" :to="{path:'./bazaar', query:{anzhiposition:threetree[1].anzhiposition,anzhiid:threetree[1].anzhiid}}">
                                                            <span>
                                                                <img :src="register" style="wdith:14px;height:14px;" alt="">
                                                            </span>
                                                        </router-link>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="ct_list2_ri"  v-if='threetree[2].id !="a"'>
                                                <div class="list2_lf_con" @click='look_down'>
                                                    <div class="data" v-show="false">{{threetree[2].member_id}}</div>
                                                    <div class="ct_list_top">
                                                        <label for="" @click.stop="look_det(threetree[2].achievement)">{{$t('m.my7')}}</label>
                                                        <span>
                                                            <img :src="leval1" alt="">
                                                        </span>
                                                    </div>
                                                    <div class="ct_list_ct">
                                                        <p>{{$t('m.my10')}}：{{threetree[2].name}}({{$t('m.my9')}})</p>
                                                        <div class="ct_list_btm">
                                                            <div class="ct_item">
                                                                <span>{{$t('m.my11')}}</span>
                                                                <span>{{$t('m.my12')}}</span>
                                                                <span>{{$t('m.my13')}}</span>
                                                            </div>
                                                            <div class="ct_item">
                                                                <span>{{$t('m.my14')}}</span>
                                                                <span>{{threetree[2].achievement.leftachievement}}</span>
                                                                <span>{{threetree[2].achievement.rightachievement}}</span>
                                                            </div>
                                                            <div class="ct_item">
                                                                <span>{{$t('m.my15')}}</span>
                                                                <span>{{threetree[2].achievement.leftSurplus}}</span>
                                                                <span>{{threetree[2].achievement.rightSurplus}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ct_list2_ri" v-else>
                                                <div class="list2_lf_con edit">
                                                    <p>
                                                        <span style="margin-left:10%;">{{$t('m.my16')}}</span>
                                                        <router-link tag="a" :to="{path:'./bazaar', query:{anzhiposition:threetree[2].anzhiposition,anzhiid:threetree[2].anzhiid}}">
                                                            <span>
                                                                <img :src="register" style="wdith:14px;height:14px;" alt="">
                                                            </span>
                                                        </router-link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 右边 -->
                                    <div class="ct_list3_ri" v-show="twotree[1].id !='a'">
                                        <div class="ct_list ct_list2">
                                            <div class="ct_list2_lf" v-if='threetree[3].id !="a"'>
                                                <div class="list2_lf_con" @click='look_down'>
                                                    <div class="data" v-show="false">{{threetree[3].member_id}}</div>
                                                    <div class="ct_list_top">
                                                        <label for="" @click.stop="look_det(threetree[3].achievement)">{{$t('m.my7')}}</label>
                                                        <span>
                                                            <img :src="leval1" alt="">
                                                        </span>
                                                    </div>
                                                    <div class="ct_list_ct">
                                                        <p>{{$t('m.my10')}}：{{threetree[3].name}}({{$t('m.my9')}})</p>
                                                        <div class="ct_list_btm">
                                                            <div class="ct_item">
                                                                <span>{{$t('m.my11')}}</span>
                                                                <span>{{$t('m.my12')}}</span>
                                                                <span>{{$t('m.my13')}}</span>
                                                            </div>
                                                            <div class="ct_item">
                                                                <span>{{$t('m.my14')}}</span>
                                                                <span>{{threetree[3].achievement.leftachievement}}</span>
                                                                <span>{{threetree[3].achievement.rightachievement}}</span>
                                                            </div>
                                                            <div class="ct_item">
                                                                <span>{{$t('m.my15')}}</span>
                                                                <span>{{threetree[3].achievement.leftSurplus}}</span>
                                                                <span>{{threetree[3].achievement.rightSurplus}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ct_list2_lf" v-else>
                                                <div class="list2_lf_con edit">
                                                    <p>
                                                        <span>{{$t('m.my16')}}</span>
                                                        <router-link tag="a" :to="{path:'./bazaar', query:{anzhiposition:threetree[3].anzhiposition,anzhiid:threetree[3].anzhiid}}">
                                                            <span>
                                                                <img :src="register" style="wdith:14px;height:14px;" alt="">
                                                            </span>
                                                        </router-link>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="ct_list2_ri" v-if='threetree[4].id !="a"' >
                                                <div class="list2_lf_con" @click='look_down'>
                                                    <div class="data" v-show="false">{{threetree[4].member_id}}</div>
                                                    <div class="ct_list_top">
                                                        <label for="" @click.stop="look_det(threetree[4].achievement)">{{$t('m.my7')}}</label>
                                                        <span>
                                                            <img :src="leval1" alt="">
                                                        </span>
                                                    </div>
                                                    <div class="ct_list_ct">
                                                        <p>{{$t('m.my10')}}：{{threetree[4].name}}({{$t('m.my9')}})</p>
                                                        <div class="ct_list_btm">
                                                            <div class="ct_item">
                                                                <span>{{$t('m.my11')}}</span>
                                                                <span>{{$t('m.my12')}}</span>
                                                                <span>{{$t('m.my13')}}</span>
                                                            </div>
                                                            <div class="ct_item">
                                                                <span>{{$t('m.my14')}}</span>
                                                                <span>{{threetree[4].achievement.leftachievement}}</span>
                                                                <span>{{threetree[4].achievement.rightachievement}}</span>
                                                            </div>
                                                            <div class="ct_item">
                                                                <span>{{$t('m.my15')}}</span>
                                                                <span>{{threetree[4].achievement.leftSurplus}}</span>
                                                                <span>{{threetree[4].achievement.rightSurplus}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ct_list2_ri" v-else>
                                                <div class="list2_lf_con edit">
                                                    <p>
                                                        <span style="margin-left:7%;">{{$t('m.my16')}}</span>
                                                        <router-link tag="a" :to="{path:'./bazaar', query:{anzhiposition:threetree[4].anzhiposition,anzhiid:threetree[4].anzhiid}}">
                                                            <span>
                                                                <img :src="register" style="wdith:14px;height:14px;" alt="">
                                                            </span>
                                                        </router-link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                   <span>{{$t('m.my17')}}</span>
                   <button class="look_det_close sh_model_btm" @click="close"></button>
               </div>
               <div class="det_ct_con">
                   <div class="det_con_top">
                       <div class="det_con_top_list">{{$t('m.my11')}}</div>
                       <div class="det_con_top_list">{{$t('m.my12')}}</div>
                       <div class="det_con_top_list">{{$t('m.my13')}}</div>
                       <div class="clearboth"></div>
                   </div>
                   <div class="det_ct_con_ct">
                        <div class="det_ct_row">
                           <div class="det_ct_col">{{$t('m.my18')}}</div>
                           <div class="det_ct_col">{{leftachievement}}</div>
                           <div class="det_ct_col">{{rightachievement}}</div>
                           <div class="clearboth"></div>
                        </div>
                        <div class="det_ct_row">
                           <div class="det_ct_col">{{$t('m.my15')}}</div>
                           <div class="det_ct_col">{{leftSurplus}}</div>
                           <div class="det_ct_col">{{rightSurplus}}</div>
                           <div class="clearboth"></div>
                        </div>
                        <!-- <div class="det_ct_row">
                           <div class="det_ct_col">已结算</div>
                           <div class="det_ct_col">555</div>
                           <div class="det_ct_col">0</div>
                           <div class="clearboth"></div>
                        </div>
                        <div class="det_ct_row">
                           <div class="det_ct_col">业绩统计</div>
                           <div class="det_ct_col">222</div>
                           <div class="det_ct_col">0</div>
                           <div class="clearboth"></div>
                        </div> -->
                        <!-- <div class="det_ct_row">
                           <div class="det_ct_col">会员数量</div>
                           <div class="det_ct_col">777</div>
                           <div class="det_ct_col">0</div>
                           <div class="clearboth"></div>
                        </div> -->
                        <div class="det_ct_row padding_15">
                           <div class="det_ct_col">{{$t('m.my19')}}</div>
                           <div class="det_ct_col">{{leftachievement}}</div>
                           <div class="det_ct_col">{{rightachievement}}</div>
                           <div class="clearboth"></div>
                        </div>
                        <div class="det_ct_row padding_15">
                           <div class="det_ct_col">{{$t('m.my20')}}</div>
                           <div class="det_ct_col">{{leftcount}}</div>
                           <div class="det_ct_col">{{rightcount}}</div>
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
    export default {
        data(){
            return{
                topData:[
                    {url:'./my',text:this.$t('m.my1')}
                ],
                leval1:'./static/img/leval1.png',
                register:'./static/img/edit.png',
                backtop:'',            //返回顶层
                memberaccount:'',           //当前用户名称
                topid:'',                   //顶层id
                // 第一层
                onetree:'',
                // 第二层
                twotree:'',
                // 第三层
                threetree:'',

                findname:'',            //查询

                // 查看详情
                leftadd:'',
                rightadd:'',
                leftSurplus:'',
                rightSurplus:'',

                leftachievement:'',
                rightachievement:'',

                leftcount:'',
                rightcount:'',
               
            }
        },
        mounted(){
            this.inload();
        },
        methods:{
            
            // 点击详情
            look_det(data){
                // console.log(data);
                this.leftadd=data.leftadd
                this.rightadd=data.rightadd
                this.leftSurplus=data.leftSurplus
                this.rightSurplus=data.rightSurplus

                this.leftachievement=data.leftachievement
                this.rightachievement=data.rightachievement

                this.leftcount=data.leftcount
                this.rightcount=data.rightcount
                $('.look_det_fixed').fadeIn();
            },
            // 关闭详情
            close(){
                $('.look_det_fixed').fadeOut();
            },
            // 进入页面和返回顶层
            inload(){
                var _this=this
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=twoway')
                    .then(function (json) {
                        if(json.data.status==1){
                            _this.onetree=json.data.result.topTree;                 //第一层
                            _this.twotree=json.data.result.twoTree;                 //第二层
                            _this.threetree=json.data.result.threeTree;             //第三层
                            _this.memberaccount=json.data.result.memberaccount;     //顶层用户名
                            _this.backtop=json.data.result.topTree.account;     //顶层id 
                            _this.topid=json.data.result.topTree.member_id
                            
                        }
                    
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            },
            // 点击查看下一级
            look_down(e){
                var member_id=$(e.currentTarget).find('.data').html();
                var _this=this
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=twoway&treeid='+member_id)
                    .then(function (json) {
                        if(json.data.status==1){
                            _this.onetree=json.data.result.topTree;                 //第一层
                            _this.twotree=json.data.result.twoTree;                 //第二层
                            _this.threetree=json.data.result.threeTree;             //第三层
                            _this.memberaccount=json.data.result.memberaccount;     //顶层用户名
                            _this.backtop=json.data.result.topTree.account;     //顶层id 
                            _this.topid=json.data.result.topTree.member_id;
                        }
                    
                    })
                    .catch(function (error) {
                        alert(error);
                    });
                
            },
            // 上翻
            upturning(){
                var _this=this;
                var tipid=this.onetree.member_id;
                 this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=twoway&op1=upturning&id='+tipid)
                    .then(function (json) {
                        if(json.data.status==1){
                            _this.onetree=json.data.result.topTree;                 //第一层
                            _this.twotree=json.data.result.twoTree;                 //第二层
                            _this.threetree=json.data.result.threeTree;             //第三层
                            _this.memberaccount=json.data.result.memberaccount;     //顶层用户名
                            _this.backtop=json.data.result.topTree.account;     //顶层id 
                            _this.topid=json.data.result.topTree.member_id;
                        }else{
                            _this.$toast.center(json.data.result);
                        }
                    
                    })
                    .catch(function (error) {
                        alert(error);
                    });
            },
            // 查询
            find(){
                var _this=this;
                if(this.findname==''){
                    return
                }
                 this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=twoway&op1=find&account='+_this.findname)
                    .then(function (json) {
                        if(json.data.status==1){
                            _this.onetree=json.data.result.topTree;                 //第一层
                            _this.twotree=json.data.result.twoTree;                 //第二层
                            _this.threetree=json.data.result.threeTree;             //第三层
                            _this.memberaccount=json.data.result.memberaccount;     //顶层用户名
                            _this.backtop=json.data.result.topTree.account;     //顶层id 
                            _this.topid=json.data.result.topTree.member_id;
                        }
                    
                    })
                    .catch(function (error) {
                        alert(error);
                    });
            },
            // 左区极低
            leftlow(){
                var _this=this;
                var tipid=this.onetree.member_id;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=twoway&op1=left&id='+tipid)
                    .then(function (json) {
                        // console.log(json);
                        if(json.data.status==1){
                            _this.onetree=json.data.result.topTree;                 //第一层
                            _this.twotree=json.data.result.twoTree;                 //第二层
                            _this.threetree=json.data.result.threeTree;             //第三层
                            _this.memberaccount=json.data.result.memberaccount;     //顶层用户名
                            _this.backtop=json.data.result.topTree.account;     //顶层id 
                            _this.topid=json.data.result.topTree.member_id;
                        }
                    
                    })
                    .catch(function (error) {
                        conosle.log(error);
                    });
            },
            // 右区极低
            rightlow(){
                var _this=this;
                var tipid=this.onetree.member_id;
                this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=twoway&op1=right&id='+tipid)
                    .then(function (json) {
                        if(json.data.status==1){
                            _this.onetree=json.data.result.topTree;                 //第一层
                            _this.twotree=json.data.result.twoTree;                 //第二层
                            _this.threetree=json.data.result.threeTree;             //第三层
                            _this.memberaccount=json.data.result.memberaccount;     //顶层用户名
                            _this.backtop=json.data.result.topTree.account;     //顶层id 
                            _this.topid=json.data.result.topTree.member_id;
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
   html, body, #app{
       overflow-x: scroll;
   }
    .index_con{
        background:#4F647F;
        margin-left: 256px;
        padding-bottom: 40px;
        /* transition: all .3s; */
    }
    .my_con{
        margin:40px;
        border-radius: 4px;
        background-color: #3c4e66;
         padding-bottom: 40px;
         min-width: 1024px;
    }
    .my_con_top{
        min-height: 50px;
        line-height: 30px;
        padding: 10px 30px;
        background-color: #38485f;
        box-shadow: 0 4px 10px 0 #2c394a;
        border-radius: 4px;
        font-size: 18px;
        color: #fff;
        text-align: center;
    }
    .my_ct_top>div{
        float: left;
    }
    .input_con{
        max-width: 200px;
        height: 35px;
        margin-bottom: 10px;
        margin-right: 10px;
    }
    .input_con>input{
        width:100%;
        height: 100%;
        border-radius: 5px;
        padding-left: 5px;
    }
    .my_ct_top{
        text-align: left;
        padding: 30px;
        overflow: hidden;
    }
    .my_ct_btn{
        height: 35px;
        line-height: 35px;
        padding: 0 20px;
        margin-bottom: 10px;
        background: #0f87ff;
        border:none; 
        border-radius: 5px;
        outline: none; 
        color:#fff;  
        cursor: pointer;
    }
    .my_ct_con{
        max-width: 1024px;
        min-width: 1024px;
        margin: 0 auto;
        padding: 15px;
    }
    .ct_list{
        text-align: center;
        width: 245px;
        display: inline-block;
        cursor: pointer;
        font-size: 14px;
    }
    .ct_list_top{
        background-color: #343f53;
        line-height: 40px;
        height: 40px;
        border-radius: 4px 4px 0 0;
        position: relative;
    }
    .ct_list_top>label{
        position: absolute;
        left: 15px;
        color: #3cb6dc;
    }
    .ct_list_top>span{
        width: 60px;
        height: 28px;
        position: absolute;
        right: 13px;
        top: 6px;
        background-position: 50%;
        cursor: s;
    }
    .ct_list_top>span>img{
        width:100%;
    }
    .ct_list_ct{
        background-color: #4f647f;
        color: #fff;
        border-radius: 0 0 4px 4px;
        box-shadow: 0 4px 10px 0 #2c394a;
        font-size: 13px;
        padding: 15px;
    }
    .ct_list_ct>p{
        margin-top: 0px;
    }
    .ct_list_btm{
        display: inline-block;
        width: 100%;
        border-top: 1px solid #2c394a;
    }
    .ct_item{
        overflow: hidden;
        width: 100%;
    }
    .ct_item>span{
        float: left;
        width: 33.333%;
        line-height: 30px;
    }
    .bg_list1{
        width: 100%;
        height: 60px;
        background: url('../../static/img/my_center.png') no-repeat;
        background-position: center center;
        background-size: contain;
    }
    .ct_list2{
        overflow: hidden;
        width: 100%;
        margin-top: -5px;
    }
    .ct_list2_lf{
        float: left;
        width: 48%;
        overflow: hidden;
    }
    .ct_list2_ri{
        float: right;
        width: 48%;
        overflow: hidden;
    }
    .list_lf_con{
        cursor: pointer;
        max-width: 245px;
        display: inline-block;
        width: 100%;
    }
    .my_ct p{
        margin-top: 0px;
    }
    .list2_lf_con{
        cursor: pointer;
        max-width: 245px;
        display: inline-block;
        width: 100%;
    }
    .bg_list2{
        overflow: hidden;
        width: 100%;
        margin-top: -5px;
    }
    .bg_list2_lf{
        float: left;
        width: 48%;
        overflow: hidden;
        height: 60px;
        background: url('../../static/img/my_left.png') no-repeat;
        background-position: center center;
        background-size: contain;
    }
    .bg_list2_ri{
        float: rigth;
        width: 48%;
        overflow: hidden;
        height: 60px;
        background: url('../../static/img/my_left.png') no-repeat;
        background-position: center center;
        background-size: contain;
    }
    /* 第三层 */
    .ct_list3{
        width:100%;
        margin-top: -6px;
    }
    .ct_list3_lf{
        float: left;
        width: 48%;
        overflow: hidden;
    }
    .ct_list3_ri{
        float: right;
        width: 48%;
        overflow: hidden;
    }
    /* 注册会员编辑 */
    .edit{
        color:#fff;
    }
    .edit>p{
        margin-top: 5px;
    }
    .ct_list2_lf>.edit>p>span:first-child{
        margin-left: -4%;
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
        background: rgba(0,0,0,.4);
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
        padding:10px 20px 10px;
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
        width:33.3%;
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
        width:33.3%;
        text-align: left;
        padding:0px 5px;
    }
    .padding_15{
        padding:20px 5px;
    }
    .bg_list2_ri{
        float: right;
    }
    .bg_list2_lf{
        float:left;
    }
    @media screen and (max-width: 767px){
        .my_con{
            margin:0px;
            min-width: 1024px;
        }
        .index_con{
            overflow: scroll;
        }
        .look_det_con{
            width:90%;

        }
    }
</style>