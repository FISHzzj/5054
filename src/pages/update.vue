<template>
    <div>
        <div v-wechat-title="$route.meta.title" ></div>
        <!-- 公共部分 -->
       <my-Com :lf-index=1 :top-data="topData" :top-index=1 :now-add='this.$t("m.modifiedData")' ></my-Com>
       <div class="index_con">
           <div class="bazaar_con">
               <div class="bz_con_top">
                   {{ $t('m.modifiedData') }}
               </div>
               <div class="bz_ct_con">
                    <div class="bz_ct_con_list">
                       <label for="" class="none_before">{{ $t('m.account') }}</label>
                       <div class="input_con">
                           <input type="text" readonly v-model="login_account">
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="" class="none_before">{{ $t('m.cellPhoneNumber') }}</label>
                       <div class="input_con">
                           <input type="text"  name="" id="" v-model="iphone" readonly>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{ $t('m.realName') }}</label>
                       <div class="input_con">
                           <input type="text" :placeholder="this.$t('m.inputRealName')" v-model="realname">
                           <span class="input_null" v-if="tip_show && realname==''">{{ $t('m.inputRealName') }}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{ $t('m.idcardNo') }}</label>
                       <div class="input_con">
                           <input type="text" :placeholder="this.$t('m.inputIdcardNo')" v-model='idnumber'>
                           <span class="input_null" v-if="tip_show && idnumber==''">{{ $t('m.inputIdcardNo') }}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{ $t('m.bankName') }}</label>
                       <div class="input_con">
                           <input type="text" :placeholder="this.$t('m.inputBankName')" v-model='bank_name'>
                           <span class="input_null" v-if="tip_show && bank_name==''">{{ $t('m.inputBankName') }}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{ $t('m.NameOfCardholder') }}</label>
                       <div class="input_con">
                           <input type="text" :placeholder="this.$t('m.inputNameOfCardholder')" v-model='chika_name'>
                           <span class="input_null" v-if="tip_show && chika_name==''">{{ $t('m.inputNameOfCardholder') }}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{ $t('m.nameOfTheBranch') }}</label>
                       <div class="input_con">
                           <input type="text" :placeholder="this.$t('m.inputnameOfTheBranch')" v-model='signature'>
                           <span class="input_null" v-if="tip_show && signature==''">{{ $t('m.inputnameOfTheBranch') }}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{ $t('m.bankAccount') }}</label>
                       <div class="input_con">
                           <input type="number" :placeholder="this.$t('m.inputbankAccount')" v-model='bank_number'>
                           <span class="input_null" v-if="tip_show && bank_number==''">{{ $t('m.inputbankAccount') }}</span>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="" class="none_before">{{ $t('m.WeChat') }}</label>
                       <div class="input_con">
                           <input type="text" :placeholder="this.$t('m.inputWeChat')" v-model='weixin'>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="" class="none_before">{{ $t('m.WeChatQrCode') }}</label>
                       <div class="input_con dashed" >
                           <input type="file"  accept="image/*" @change="uploadimg('weixinimg',$event)">
                           <input type="hidden" v-model='weixinimg'>
                           <div class="add">+</div>
                           <!-- <div class="add" v-show="weixinimg!='信息待完善'">已上传</div> -->
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="" class="none_before">{{ $t('m.Alipay') }}</label>
                       <div class="input_con">
                           <input type="text" :placeholder="this.$t('m.inputAlipay')" v-model='apliy'>
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="" class="none_before">{{ $t('m.AlipayQrCode') }}</label>
                       <div class="input_con dashed">
                           <input type="file"  accept="image/*" @change="uploadimg('apliyimg',$event)">
                           <input type="hidden" v-model="apliyimg">
                           <div class="add">+</div>
                           <!-- <div class="add" v-show="apliyimg!='信息待完善'">已上传</div> -->
                       </div>
                    </div>
                    <div class="bz_ct_con_list">
                       <label for="">{{ $t('m.dealpassword') }}</label>
                       <div class="input_con">
                           <input type="password" :placeholder="this.$t('m.inputDealpassword')" v-model='password'>
                           <span class="input_null" v-if="tip_show && password ==''">{{ $t('m.inputDealpassword') }}</span>
                       </div>
                    </div>
                    <button class="resig" @click="updata">{{ $t('m.CommitChangesL') }}</button>
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
                    {url:'./person',text:this.$t('m.personalData')},
                    {url:'./update',text:this.$t('m.modifiedData')},
                    {url:'./passwordmana',text:this.$t('m.PasswordManagement')}
                ],
                tip_show:false,
                login_account:'',
                iphone:'',

                realname:'',
                idnumber:'',
                bank_name:'',
                chika_name:'',
                signature:'',
                bank_number:'',
                password:'',

                weixin:'',
                weixinimg:'',
                apliy:'',
                apliyimg:''
            }
        },
        components: {
    		myCom,
    	},
        mounted(){
            this.inload();
        },
        methods:{
            inload(){
                var _this=this;
                _this.axios.get(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter')
                .then(function(json){
                    var data=json.data;
                    if(data.status==1){
                        _this.login_account=data.result.mem.account;
                        _this.iphone=data.result.mem.mobile;
                        _this.realname=data.result.mem.realname;
                        _this.idnumber=data.result.mem.IDCard;
                        _this.bank_name=data.result.mem.bank_name;
                        _this.chika_name=data.result.mem.signature;
                        _this.signature=data.result.mem.bank_branch;
                        _this.bank_number=data.result.mem.bank_card;
                        _this.weixin=data.result.mem.weixin;
                        _this.weixinimg=data.result.mem.weixinimg;
                        _this.apliy=data.result.mem.alipay;
                        _this.apliyimg=data.result.mem.alipayimg;
                    }
                }).catch(function(error){
                    alert(error)
                })
            },
             updata(){
                if(this.login_account==''){
                    this.tip_show=true;
                    return;
                }
                if(this.iphone==''){
                    this.tip_show=true;
                    return;
                }
                if(this.realname==''){
                    this.tip_show=true;
                    return;
                }
                if(this.idnumber==''){
                    this.tip_show=true;
                    return;
                }
                if(this.bank_name=='0'){
                    this.tip_show=true;
                    return;
                }
                if(this.chika_name==''){
                    this.tip_show=true;
                    return;
                }
                if(this.signature==''){
                    this.tip_show=true;
                    return;
                }
                if(this.bank_number==''){
                    this.tip_show=true;
                    return;
                }
                if(this.password==''){
                    this.tip_show=true;
                    return;
                }
                var _this=this;
                _this.axios.post(URL+'/app/index.php?i=1&c=entry&do=member&m=sz_yi&p=iotcenter&op=updateinfo',{
                    realname:_this.realname,
                    idnumber:_this.idnumber,
                    bank_name:_this.bank_name,
                    chika_name:_this.chika_name,
                    signature:_this.signature,
                    bank_number:_this.bank_number,
                    password:_this.password,
                    weixin:_this.weixin,
                    weixinimg:_this.weixinimg,
                    apliy:_this.apliy,
                    apliyimg:_this.apliyimg

                })
                .then(function(json){
                    if(json.data.status==1){
                        _this.$toast.center(json.data.result);
                        setTimeout(function(){
                            window.location.reload()
                        },1000)
                    }
                    
                    
                }).catch(function(error){
                    alert(error)
                })
             },
            //  上传图片
            uploadimg(indeximg,event){
                var obj=event.currentTarget;
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
                    if(indeximg=='weixinimg'){
                        _this.weixinimg=src;
                    }else{
                        _this.apliyimg=src;
                    }
                    $(obj).siblings('.add').html('已上传');
                    
                }
            }
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
        background: #3C4E66;
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
    .bz_ct_con{
        max-width: 425px;
        margin: 0 auto;
        padding:15px;
        font-size: 14px;
        
    }
    .bz_ct_con_list{
        position: relative;
        padding-left: 190px;
        margin-bottom: 7px;
    }
    .bz_ct_con_list>label{
       
        position: absolute;
        display: inline-block;
        left: 0;
        text-align: right;
        width: 170px;
        height: 35px;
        line-height: 35px;
        color: #9fa9b2;
    }
    .bz_ct_con_list>label::before{
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
    }
    .input_con>input,.input_con>span{
        height: 35px;
        line-height: 35px;
    }
    .bz_ct_con_list>span{
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
    .sh_title{
        line-height: 35px;
        color:#b3b3b3;
        display:inline-block;
        margin-left: 10%;
    }
    .bz_ct_con_list>.sh_title:before{
        content: '';
    }
    .sh_title input{
        display: none;
    }
    .sh_title span {
        position: relative;
        width: 16px;
        height: 16px;
        display: inline-block;
        border: 1px solid #999;
        background: #fff;
        border-radius: 3px;
        z-index: 200;
        top:3px;
        margin-right: 5px; 
    }
    input:checked+span {
        background-color: #0F87FF;
        border: 1px solid #0F87FF;
    }

    input:checked+span::after {
        position: absolute;
        content: "";
        width: 4px;
        height: 8px;
        top: 2px;
        left: 4px;
        border: 2px solid #fff;
        border-top: none;
        border-left: none;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        border-radius: 3px;
    }
    .bz_ct_con_list>.sh_title{
        color:#0F87FF;
    }
    .input_con>.input_null{
        color: red;
        display: inline-block;
        padding: 2px 0;
        width: 100%;
        height: 23px;
        text-align: left;
    }
    .resig{
        background: #0d80f3;
        border-color: #0d80f3;
        color: #fff;
        width: 260px;
        max-width: 400px;
        height: 40px;
        border-radius: 5px;
        outline: none;
    }
    .dashed{
        color: #fff;
        line-height: 35px;
        border: 1px dashed #d9d9d9;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        text-align: center;
        position: relative;
        cursor: pointer;
    }
    .dashed>input{
        position: absolute;
        z-index: 100;
        opacity: 0;
        left: 0;
        top:0;
        width:100%;
        height:100%;
        cursor: pointer;
    }
    .bz_ct_con_list>.none_before:before {
        content: "";
        color: #f56c6c;
        margin-right: 4px;
    }
    @media screen and (max-width: 767px){
        .bazaar_con{
            margin:0px;
        }
        .bz_ct_con_list{
            padding-left:0px;
        }
        .bz_ct_con_list>label{
            position: static;
            width:100%;
            text-align: left;
        }
    }
</style>