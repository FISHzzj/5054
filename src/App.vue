<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  
  export default {
    name: 'App'
  }
</script>
<style>
  *{
    box-sizing: border-box;
  }
  html,body{
    /* overflow:hidden; */
    -webkit-overflow-scrolling: touch;
  }
  body{
    padding-right:0 !important 
  }
  html, body, #app{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height:auto;
    width:100%;
    padding:0px;
    margin:0px;
    box-sizing: border-box;
    background:#4F647F;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  input[type=number] { -moz-appearance:textfield; }
  input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
  input,select,button{ 
    font-size:100%;
    outline:0;
    vertical-align:middle;
    -webkit-appearance: none;
    }
    input:-webkit-autofill {
      -webkit-box-shadow:0 0 0px 1000px transparent inset; 
      -webkit-text-fill-color: #333; 
    }
  .index_con{
    /* -webkit-overflow-scrolling: touch; */
    /* margin-left:  */
  }
  .el-date-editor .el-range-input {
      border-radius: 4px;
      background-color: #2c394a;
      border: 1px solid #2c394a;
      height: 35px;
      line-height: 35px;
      color: #fff;
  }
  .el-select{
    height: 100;
  }
  .el-input{
    height: 100%;
  }
  .el-input--suffix .el-input__inner{
    height: 35px;
    background-color: #2c394a;
    border: 1px solid #2c394a;
    color:#fff;
    
  }
  .el-select-dropdown {
      background-color: #38485f!important;
      border: 1px solid #38485f!important;
      box-shadow: 0 4px 10px 0 #2c394a;
      margin: 0!important;
      padding: 0!important;
  }
  .el-select-dropdown__item{
    color:#fff!important;
    text-align: left;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background-color: #425671;
  }
  .el-popper .popper__arrow{
    display: none;
  }
  .popper__arrow{
    display: none!important;
  }
  .el-pagination__total{
    display: inline-block!important;
    padding: 0 15px;
    height: 35px!important;
    line-height: 35px!important;
    cursor: pointer;
    color: #fff!important;
    background: #38485F;
    border-right: 1px solid #3c587f;
    font-size: 14px;
    margin:0px!important;
    }
    .el-pagination .btn-next, .el-pagination .btn-prev{
      display: inline-block!important;
      padding: 0 15px;
      height: 35px!important;
      line-height: 35px!important;
      cursor: pointer;
      color: #fff;
      background: #38485F;
      border-right: 1px solid #3c587f;
      font-size: 14px;
      margin:0px!important;
    }
    .el-pager li{
      display: inline-block!important;
      padding: 0 15px;
      height: 35px!important;
      line-height: 35px!important;
      cursor: pointer;
      color: #fff;
      background: #38485F;
      border-right: 1px solid #3c587f;
      font-size: 14px;
      margin:0px!important;
      cursor: pointer;
    }
    .el-pagination button:disabled {
      display: inline-block!important;
      padding: 0 15px;
      height: 35px!important;
      line-height: 35px!important;
      /* cursor: pointer; */
      color: #fff!important;
      background-color: #38485F!important;
      border-right: 1px solid #3c587f!important;
      font-size: 14px;
      margin:0px!important;
    }
    .el-pagination button:disabled{
      background-color: #38485f;
    }
    .el-dialog, .el-pager li{
      background: #38485F;
      color: #fff;
    }
    .el-pager li{
      background: #38485F!important;
    }
    .el-loading-mask{
      position: fixed;
      z-index: 2000;
      background-color: rgba(255,255,255,1);
      margin: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      -webkit-transition: opacity .3s;
      transition: opacity .3s;
      height: 100%;
      width: 100%;
    }
    .el-input--mini .el-input__inner{
      height: 35px!important;
      line-height: 35px!important;
    }
    .el-pager li.active{
      color: #409EFF!important;
      cursor: default!important;
    }
    .el-pagination .btn-next, .el-pagination .btn-prev{
      background: 50% no-repeat #38485F!important;
      color:#fff!important;
    }
    /* 公告 */
    .el-dialog__header{
        padding: 10px 20px 10px!important;
        color:#fff!important;
        text-align: left!important;
        background: #38485F;
    }
    .el-dialog__headerbtn{
      top: 13px!important;
    }
    .el-dialog__title{
      color:#fff!important;
    }
    .el-dialog__body{
      background-color: #3c4e66!important;
      color: #fff!important;
    }
    .el-dialog__close{
      color:#fff!important;
    }
    @media screen and (max-width:767px){
      .index_con{
        padding:20px!important;
      }
      .el-message-box{
        min-width: auto!important;
        width: 90%!important;
      }
      .el-dialog{
        width:80%!important;
      }
      .el-dialog__body{
        padding:0px
      }
    }
    /* 翻译样式 */
    #WidgetFloaterPanels{
      display:none !important;
    }
    #WidgetLogoPanel{
      display:none !important;
    }

    /* .block{
      position: static!important;
    } */
</style>
