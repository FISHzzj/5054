
<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 公共部分 -->
       <my-Com :lf-index=0 :top-data="topData" :now-add="home"></my-Com>
       <!-- 内容 -->
       <div class="index_con">
           <div class="index_top clearfix">
               <div class="index_top_lf">
                   <label for="">{{ $t('m.hello') }}，{{nickname}}&nbsp;&nbsp;&nbsp;</label>
                   <!-- <img :src="levelsrc" alt=""> -->
                   <span>{{levelname}}</span>
               </div>
               <div class="index_top_ri">
                   <div class="index_top_ri_list" v-for="(item,index) in personal" :key="index">
                        <router-link :to="item.url">
                            <img :src="item.src" alt="">
                            <span>{{item.text}}</span>
                        </router-link>
                   </div>
               </div>
           </div>
           <div class="index_img">
               <img :src="index_img" alt="">
           </div>
           <div class="index_list_con clearfix">
               <div class="index_list clearfix" v-for="(item,index) in index_list" :key='index'>
                   <div class="index_list_lf">
                       <img :src="item.src" alt="">
                   </div>
                   <div class="index_list_ri">
                       <p>{{item.text1}}</p>
                       <p>{{item.text2}}</p>
                   </div>
                   <div class="clearboth"></div>
               </div>
               <div class="clearboth"></div>
           </div>
           <div class="zheline_con">
               <div class="zheline_top">{{ $t('m.zoushi') }}<span>{{each}}</span>/{{ $t('m.gu') }},{{ $t('m.allprice') }}{{allgu}}</div>
                <div id="zheline" ></div>
           </div>
           <div class="index_video_con">
               <div class="index_video_lf">
                   <video controls :src="videoUrl"></video>
               </div>
               <div class="index_video_ri">
                   <p >TNT{{$t('m.promotional')}}</p>
                   <p>TNT{{$t('m.promotional')}}</p>
               </div>
               <div class="clearboth"></div>
           </div>
       </div>
        <!-- 遮罩层 -->
        <div class="shade_con">

        </div>
        <!-- 公告 -->
        <div>
            <el-dialog
                title="最新新闻公告"
                :visible.sync="dialogVisible"
                >
                <div class="ls_from ls_from-icon-label min-input">
                    <p class="title">【{{notice.title}}】</p>
                    <p class="time">发布时间：{{notice.createtime}}</p>
                    <div class="content">
                        <div  class="pre" v-html="notice.detail"></div>
                        <!-- <div>{{notice.detail}}</div> -->
                    </div>
                </div>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import URL from '../url.conf.js';
    import myCom from '../components/Com';
    //引入基本模板
    var echarts = require('echarts');
    // import {jsonp,param} from '../jsonp.js'
    
    export default {
        data(){
            return{
                home:this.$t('m.home'),
                nickname:'',
                levelname:'',
                levelsrc:'./static/img/logo.png',
                index_img:'./static/img/index_bg.jpg',
                personal:[
                    {src:'./static/img/index1.png',text:this.$t('m.person[0]'),url:'./person'},
                    {src:'./static/img/per1.png',text:this.$t('m.person[1]'),url:'./upgrade'},
                    {src:'./static/img/per2.png',text:this.$t('m.person[2]'),url:'./bonus'}
                ],
                topData:'',
                index_list:[
                    {src:'./static/img/index_list0.png',text1:this.$t('m.index_list[0]'),text2:0.00},
                    {src:'./static/img/index_list1.png',text1:this.$t('m.index_list[1]'),text2:0.00},
                    {src:'./static/img/index_list2.png',text1:this.$t('m.index_list[2]'),text2:0.00},
                    {src:'./static/img/index_list3.png',text1:this.$t('m.index_list[3]'),text2:0.00},
                    {src:'./static/img/index_list4.png',text1:this.$t('m.index_list[4]'),text2:0.00},
                    {src:'./static/img/index_list5.png',text1:this.$t('m.index_list[5]'),text2:0.00},
                    {src:'./static/img/index_list6.png',text1:this.$t('m.index_list[6]'),text2:0.00},
                    {src:'./static/img/index_list7.png',text1:this.$t('m.index_list[7]'),text2:0.00},
                    {src:'./static/img/index_list8.png',text1:this.$t('m.index_list[8]'),text2:0.00},
                    {src:'./static/img/index_list9.png',text1:this.$t('m.index_list[9]'),text2:0.00}
                ],
                dialogVisible:false,                       //公告
                notice:'',

                videoUrl:'',
                
                each:'0.00',
                allgu:'0.00',
                datax:[],
                datay:[],
                

            }
        },
        watch:{
           
        },
        methods:{
            
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

            }
        },
        components: {
    		myCom
    	},
        mounted(){
            var _this=this;
            
            $('.arrow_down').hide();
            this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=getUserinfo')
            .then(function (json) {
                // console.log(json)
                var data=json.data.result;
                if(json.data.status==1){
                    _this.nickname=data.mem.account;
                    _this.levelname=data.mem.levelname;
                    _this.each=data.mem.each;
                    _this.allgu=data.mem.price;

                    _this.index_list[0].text2=data.mem.zcb;
                    _this.index_list[1].text2=data.mem.xjb;
                    _this.index_list[2].text2=data.mem.ftb;
                    _this.index_list[3].text2=data.mem.gwb;
                    _this.index_list[4].text2=data.mem.iot;
                    _this.index_list[5].text2=data.mem.totaliot;
                    _this.index_list[6].text2=data.mem.shengiot;
                    _this.index_list[7].text2=data.mem.Tturnover;
                    _this.index_list[8].text2=data.mem.pool;
                    _this.index_list[9].text2=data.mem.zcbnum;

                    _this.videoUrl=data.vidio;

                    if($(window).width()<676){
                        _this.index_img=data.banner;
                    }
                    var each=data.each;
                    // _this.datay=data.each;
                    // for(var i=0;i<_this.datay.length;i++){
                    //     _this.datax.push(i+'时');
                    // }
                    for(let key in each){
                        _this.datax.push(key+'时');
                        _this.datay.push(each[key])
                    }
                    
                }
                // 公告
                
                if(json.data.result.notice.id != 0 && localStorage.getItem('dialogVisible')==1){
                    _this.notice=data.notice;
                    _this.dialogVisible=true;
                    localStorage.setItem('dialogVisible',0)
                }
            })
            .catch(function (error) {
                // console.log(error);
            });

            setTimeout(function(){
                _this.drawLine();
            },350);
        }

    }
</script>

<style scoped>
    /* @import url('../../static/css/index.css');
    @import url('../../static/css/indexm.css'); */
    .clearfix:after, .clearfix:before {
        display: table;
        content: " ";
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
    .index_top{
        background-color: #38485f;
        padding: 0 40px;
        height: 50px;
        line-height: 50px;
        color: #fff;
    }
    .index_top_lf{
        float: left;
    }
    .index_top_lf img{
        vertical-align: middle;
        margin-left: 15px;
        width:68px;
    }
    .index_top_ri{
        float: right;
        line-height: 50px;
        display: block;
    }
    .index_top_ri_list{
        float: left;
        margin-right: 20px;
    }
    .index_top_ri_list >a{
        line-height: 50px;
        display: inline-block;
    }
    .index_top_ri_list >a>img{
        vertical-align: middle;
    }
    .index_top_ri_list:last-child{
        margin-right: 0px;
    }
    .index_top_ri_list>img{
        vertical-align: middle;
    }
    .index_top_ri_list span{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding:0 8px;
        background:#435770;
        border-radius: 3px;
        cursor: pointer;
        margin-left: 5px;
        color:#fff;
        font-size: 14px;
    }
    .index_top_ri_list span:hover{
        background: #326AD5;
    }

    .index_img img{
        width:100%;
    }
    .index_list_con{
        padding: 40px;
    }
    
    .index_list{
        width: 19%;
        margin: 0 1% 20px 0;
        float: left;
    }
    
    .index_list_lf{
        position: relative;
        float: left;
        width: 35%;
        height: 100px;
        background-image: linear-gradient(180deg,#25508d 0,#374a66);
        overflow: hidden;
        padding:0 8%;
        line-height: 100px;
    }
    .index_list_lf>img{
        vertical-align: middle;
        width:80%;
    }
    .index_list_ri{
        padding:0 8%;
        text-align: left;
        position: relative;
        float: left;
        width: 65%;
        height: 100px;
        color: #fff;
        background-image: linear-gradient(180deg,#2e67d6 0,#4878d4);
    }
    .index_list_ri>p{
        text-align: center;
    }
    #zheline{
        height: 345px;
    }
    .zheline_con{
        background:#3C4E66;
        margin:0 40px;
    }
    .zheline_top{
        min-height: 50px;
        line-height: 30px;
        padding: 10px 30px;
        background-color: #38485f;
        font-size: 18px;
        color: #fff;
        text-align: left;
    }
    .zheline_top >span{
        color:red;
        font-size: 18px;
    }
    .index_video_con{
        margin:40px;
        background: #3C4E66;
        margin-bottom: 0px;
    }
    .index_video_lf, .index_video_ri{
        width:50%;
        float: left;
    }
    .index_video_ri{
        background: #3C4E66;
        color:#fff;
        padding:30px;
        text-align: left;
    }
    .index_video_lf>video{
        width:100%;
    }
    .index_video_ri>p:first-child{
        font-size: 18px;
    }
    .index_video_ri>p:last-child{
        color:#9fa9b2;
    }
    
    div.ls_from {
        overflow: hidden;
        padding: 15px;
    }
    div.ls_from p.title {
        margin-bottom: 15px;
        text-align: center;
        font-size: 22px;
        margin-top: 0px;
    }
    .el-dialog.news-dialog p.time {
        font-size: 12px;
        text-align: center;
        margin-bottom: 15px;
    }
    div.content{
        padding: 15px 0;
        overflow: auto;
        max-height: 300px;
        
    }
    .content::-webkit-scrollbar-track
     {
         background-color: none;
         -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
     }
     .pre{
        white-space: pre-wrap; /*css-3*/ 
        white-space: -moz-pre-wrap; /*Mozilla,since1999*/ 
        white-space: -pre-wrap; /*Opera4-6*/ 
        white-space: -o-pre-wrap; /*Opera7*/ 
        word-wrap: break-word; /*InternetExplorer5.5+*/ 

     }
     /*定义滚动条高宽及背景*/
    .content::-webkit-scrollbar{
        width: 10px;
        background-color: rgba(0, 0, 0, 0);
    }
     /*定义滚动条*/
     .content::-webkit-scrollbar-thumb
     {
         background-color: #788494;
         border-radius: 10px;
     }
     .el-dialog{
         width:50%;
     }
     /* 移动端样式 */
    @media  (max-width: 1199px) and (min-width: 992px){
        .index_list{
            width: 32%;
            margin: 0 1% 20px 0;
            float: left;
        }
    }
    @media (max-width: 991px) and (min-width: 768px){
        .index_list{
            width: 49%;
            margin: 0 1% 20px 0;
            float: left;
        }
        #zheline{
            height: 280px;
        }
    }
    @media screen and (max-width:767px){
        .index_con{
            margin-left: 200px;
        }
        #zheline{
            height: 180px;
        }
        .index_list{
            width: 100%;
            margin: 0 0 10px;
        }
        .index_con{
            padding-bottom: 15px;
        }
        .index_list_con{
            padding:0px;
        }
        .index_top_ri{
            display: none;
        }
        .index_img{
            height: auto;
        }
        .index_video_lf, .index_video_ri{
            width:100%;
        }
        .zheline_con{
            margin:0 0px;
        }
        .index_video_con{
            margin:20px 0px;
        }
        .index_list_lf{
            height: 80px;
            line-height: 80px;
        }
        .index_list_lf>img{
            width:55%;
        }
        .index_list_ri{
            height: 80px;
        }
        .el-dialog{
            width:80%;
        }
        .zheline_top{
            font-size: 16px;
            padding: 8px 18px;
        }
        @media screen and (max-width:320px){
            .index_top{
                font-size: 14px;
                padding: 0px 13px;
            }
            .zheline_top{
                font-size: 14px;
                padding: 6px 13px;
            }

        }
    }
</style>