<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 公共部分 -->
       <my-Com :lf-index=5 :top-data="topData" :top-index=0 now-add="奖金详情"></my-Com>
       <div class="index_con">
           <div class="bazaar_con">
                <div class="bz_con_top">
                   奖金详情
                   <router-link to="./bonus" class="back">返回</router-link>
                </div>
                <div class="bonus_det_con">
                    <div>
                        <select name="" id="" class="bonus_type">
                            <option value="">请选择奖金类型</option>
                            <option value="">直推奖</option>
                            <option value="">对碰奖</option>
                            <option value="">领导奖</option>
                            <option value="">见点奖</option>
                        </select>
                    </div>
                    <div>
                        <button class="finds">查询</button>
                    </div>
                </div>
                <div class="up_ct_con">
                    <div class="sh_ct_con">
                        <div class="sh_table">
                            <div class="sh_table_top">
                                <div class="sh_table_top_list" v-for="(item,index) in table_top_list" :key='index'>{{item}}</div>
                                <div class="clearboth"></div>
                            </div>
                            <div class="sh_table_con" v-show="table_con_list.length!=0">
                                <div class="sh_table_con_list clearfix" v-for="(item,index) in table_con_list" :key="index">
                                    <div class="table_con_list_list" :class='{blue:index==6}' v-for="(value,key,index) in item" :key="key">{{value}}</div>
                                    <div class="clearboth"></div>
                                </div>
                            </div>
                        </div>
                        <div class="sh_table_con" v-show='table_con_list.length==0'>
                            <div class="list_null">暂无数据</div>
                        </div>
                    </div>
                    <div class="btm" style='margin-top:15px;' v-show='table_con_list.length!=0'>
                        <div class="page_con">
                            <div class="">
                                <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage2"
                                :page-sizes="[25, 50, 100]"
                                :page-size="25"
                                layout="total, sizes, prev, pager, next"
                                :total="2">
                                </el-pagination>
                            </div>
                        </div>
                        <div class="mobile_page">
                            <span class="btn up_page">上一页</span>
                            <span class="btn down_page">下一页</span>
                        </div>
                    </div>
                </div>
           </div>
       </div>
    </div>
</template>

<script>
    import myCom from '../components/Com';
    export default {
        data(){
            return{
                container_show:true,
                topData:[
                    {url:'./bonus',text:'奖金明细'},
                    
                ],

                table_top_list:[
                    '奖金类型',
                    '奖金来源',
                    '奖金总额',
                    '注册币',
                    '现金币',
                    '时间'
                ],
                table_con_list:[
                    {user:'cxl13191',name:'习大大',bianhao:'cxl13191',biaohao2:'cxl13191',add:'右区',number:'13000000000'},
                    {user:'cxl13191',name:'习大大',bianhao:'cxl13191',biaohao2:'cxl13191',add:'右区',number:'13000000000'}
                ]
            }
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
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
        width:16.666%;
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
        
        width:16.666%;
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
   .bonus_type{
       border-radius: 4px;
        background-color: #2c394a;
        border: 1px solid #2c394a;
        height: 35px;
        line-height: 35px;
        color: #fff;
        padding:0 5px;
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
    /* 移动端 */
    @media screen and (max-width: 767px){
        .bazaar_con{
            margin:0px;
        }
        .sh_ct_con{
            width:100%;
            overflow: scroll;
        }
        .sh_table_top,.sh_table_con{
            width:560px;
        }
        .up_ct_con{
            padding:15px;
            overflow: hidden;
        }
        .sh_ct_con{
            padding:0px;
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
</style>