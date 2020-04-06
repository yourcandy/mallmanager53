<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="http://www.wfsectech.com/images/logo.png" alt="">
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <div class="grid-content bg-purple-light">
            <h3>后台管理系统</h3>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <a class="loginout" @click="handleSignout()" href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!--侧边栏导航el-menu-->
        <el-menu
          :router="true"
          :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-location"></i>
              <span>用户列表</span>
            </el-menu-item>

          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>权限列表</span>
            </el-menu-item>

          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>分类列表</span>
            </el-menu-item>
            <el-menu-item index="1-3">
              <i class="el-icon-location"></i>
              <span>商品分类</span>
            </el-menu-item>

          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>数据报表</span>
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>订单列表</span>
            </el-menu-item>
            <el-menu-item index="1-3">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="mian">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  export default {
    beforeCreate() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push({name: 'login'})
      }
    },
    methods: {
      handleSignout() {
        localStorage.clear();
        this.$message.success('退出成功');
        this.$router.push({name: 'login'})
      }
    }
  }
</script>

<style>
  .container {
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

  .loginout {
    line-height: 60px;
    text-decoration: none;
  }

</style>
