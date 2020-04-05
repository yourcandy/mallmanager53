<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">
          <img src="http://www.wfsectech.com/images/logo.png" alt="">
        </div></el-col>
        <el-col :span="18" class="middle"><div class="grid-content bg-purple-light">
          <h3>后台管理系统</h3>
        </div></el-col>
        <el-col :span="1"><div class="grid-content bg-purple">
          <a class="loginout" href="#">退出</a>
        </div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="mian">Main</el-main>
    </el-container>
  </el-container>

</template>

<script>
  export default {
    name: "home"
  }
</script>

<style>
  .container{
    height: 100%;
  }
  .header {
    background-color: #b3c0d1;
  }
  .aside {
    background-color: #d3dce6;
  }
  .mian {
    background-color: #e9eef3;
  }
  /*头部样式*/
  .middle {
    text-align: center;
  }
  .loginout{
    line-height: 60px;
    text-decoration: none;
  }

</style>
