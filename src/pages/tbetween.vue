<template>
    <div>
        <div v-wechat-title="$route.meta.title" ></div>
        <!-- 公共部分 -->
       <my-Com :lf-index=4 :top-data="topData" :top-index=2 :now-add='this.$t("m.fin8")' ></my-Com>
       <div class="index_con">
           <div class="tran_con">
               <div class="tran_con_top">
                   {{ $t('m.fin8') }}
               </div>
               <div class="tran_ct_con">
                   <div class="tran">
                        <div class="tran_list">
                            <label for="" class=''>{{ $t('m.tbw1') }}</label>
                            <div class="tran_list_ri">
                                <select v-model="outcoin">
                                    <option value="0">{{ $t('m.tbw2') }}</option>
                                    <option value="1">{{ $t('m.tbw3') }}</option>
                                </select>
                            </div>
                            <span class="input_null" v-if="tip_show && outcoin=='0'">{{ $t('m.tbw2') }}</span>
                        </div>
                        <div class="tran_list">
                            <label for="" class=''>{{ $t('m.tbw4') }}</label>
                            <input type="number" readonly v-model="money">
                        </div>
                        <div class="tran_list">
                            <label for="" class=''>{{ $t('m.tbw5') }}</label>
                            <input type="text" v-model="target" :placeholder="this.$t('m.tbw8')">
                            <span class="input_null" v-if="tip_show && target==''">{{ $t('m.tbw8') }}</span>
                        </div>
                        <div class="tran_list">
                            <label for="" class=''>{{ $t('m.tbw6') }}</label>
                            <input type="number" v-model="number" :placeholder="this.$t('m.tbw9')">
                            <span class="input_null" v-if="tip_show && number==''">{{ $t('m.tbw9') }}</span>
                        </div>
                        
                    </div>
                    <button class="transition"  @click="tbwbtn">{{ $t('m.tbw7') }}</button>
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
                    {url:'./finance',text:this.$t('m.fin1')},
                    {url:'./transition',text:this.$t('m.tran1')},
                    {url:'./tbetween',text:this.$t('m.fin8')}
                ],

                tip_show:false,
                outcoin:0,
                money:0,
                target:'',
                number:'',

                
            }
        },
        components: {
    		myCom,
    	},
        mounted(){
            var _this=this;
            _this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=interturn')
                .then(function(json){
                    var data=json.data;
                    if(data.status==1){
                        _this.money=data.result;
                       
                    }else{
                        _this.$toast.center(json.data.result);
                    }
                }).catch(function(error){
                    console.log(error)
                })
        },
        methods:{
            tbwbtn(){
                var _this=this;
                if(this.outcoin==0){
                    _this.tip_show=true;
                    return;
                }
                if(this.target==''){
                    _this.tip_show=true;
                    return;
                }
                if(this.number==''){
                    _this.tip_show=true;
                    return;
                }
                $('.transition').attr('disabled','disabled');
                _this.axios.post(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=interturn&op1=sub',{
                    leixing:_this.outcoin,
                    target:_this.target,
                    number:_this.number
                })
                .then(function(json){
                    $('.transition').removeAttr('disabled');
                    var data=json.data;
                    if(data.status==1){
                        _this.$toast.center(json.data.result);
                        setTimeout(function(){
                            window.location.reload();
                        },1000);
                    }else{
                        _this.$toast.center(json.data.result);
                    }
                }).catch(function(error){
                    consonle.log(error)
                })

            },
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
    .tran_con{
        margin:40px;
        border-radius: 4px;
        background: #3C4E66;
         padding-bottom: 40px;
    }
    .tran_con_top{
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
    .tran_ct_con{
        max-width: 425px;
        margin: 0 auto;
        padding:15px;
        font-size: 14px;
        
    }
    .tran{
        max-width: 425px;
        margin: 0 auto;
    }
    .tran_list>label::before{
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
    }
    .tran_list>.star_null::before{
        display: none;
    }
    .tran_list{
        position: relative;
        padding-left: 190px;
        margin-bottom: 7px;
        
        font-size: 14px;
        margin-top: 3px;
    }
    .tran_list>div{
        height: 35px;
        line-height: 35px;
        text-align: left;
        color:#fff;
    }
    .tran_list>label{
        position: absolute;
        display: inline-block;
        left: 0;
        text-align: right;
        width: 170px;
         height: 35px;
        line-height: 35px;
        color: #fff;
    }
    
    .tran_list select,.tran_list input{
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
        border-radius: 5px;
    }
    .transition{
        background: #0d80f3;
        border-color: #0d80f3;
        color: #fff;
        width: 260px;
        max-width: 400px;
        height: 40px;
        border-radius: 5px;
        outline: none;
        margin-top: 15px;
    }
    .tran_list{
        text-align: left;
    }
    .tran_list> span{
        color:red;
        margin:5px 0px 8px 0px;
    }
    @media screen and (max-width: 767px){
        .tran_con{
            margin:0px;
        }
        .tran_ct_con_list{
            padding-left:0px;
        }
        .tran_ct_con_list>label{
            position: static;
            width:100%;
            text-align: left;
        }
       
        .tran_list{
            padding:0px;
        }
        .tran_list>label{
            position: static;
            width:100%;
            text-align: left;
        }
        .tran_lv{
            margin-bottom: 0px;
        }
        .tran_lv>label{
            width: auto;
        }
    }
</style>