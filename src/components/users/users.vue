<template>
  <el-card class="box-card">
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-row class="searchRow">
      <el-col>
        <el-input
          @clear="loadUserList()"
          clearable
          placeholder="请输入内容"
          v-model="query"
          class="inputSearch">
          <el-button
            @click="searchUser()"
            slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="showAddUserDia()" type="success">添加用户</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-table
      :data="userlist"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="userlist">
          {{userlist.row.create_time | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="changeMgState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="showEditUserDia(scope.row)" size="mini" plain type="primary" icon="el-icon-edit"
                     circle></el-button>
          <el-button @click="showSetUserRoleDia(scope.row)" size="mini" plain type="success" icon="el-icon-check"
                     circle></el-button>
          <el-button @click="showDeleUserMsgBox(scope.row.id)" size="mini" plain type="danger" icon="el-icon-delete"
                     circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2,4,6,8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!--对话框-->
    <!--添加用户的对话框-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑用户的对话框-->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!--分配角色的对话框-->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          {{currUsername}}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              :label="item.roleName"
              :value="item.id"
              v-for="(item,i) in roles"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        query: '',
        //分页相关数据
        total: -1,
        pagenum: 1,
        pagesize: 2,
        //表格绑定的数据
        userlist: [],
        //添加对话框的是否可见属性
        dialogFormVisibleAdd: false,
        dialogFormVisibleEdit: false,
        dialogFormVisibleRol: false,
        //添加用户的表单数据
        form: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        //分配角色
        currRoleId:-1,
        currUserId:-1,
        currUsername:'',
        //保存所有角色数据
        roles:[]
      }
    },
    created() {
      this.getUserList();
    },
    methods: {
      //分配角色
      async setRole(){
        const res = await this.$http.put(`users/${this.currUserId}/role`,{
          rid:this.currRoleId
        })
        this.dialogFormVisibleRol = false;
        if (res.status === 200) {
          this.$message.success(res.data.meta.msg);
          this.getUserList()
        } else {
          this.$message.warning(res.data.meta.msg);
        }
      },
      //分配角色- 打开对话框
      async showSetUserRoleDia(user) {
        this.currUsername = user.username

        //给currUserId赋值  以便在分配角色中使用
        this.currUserId = user.id

        //获取所有的角色
        const res1 = await this.$http.get(`roles`)
        // console.log(res1)
        this.roles = res1.data.data
        //获取当前用户的角色id ->rid
        const res = await this.$http.get(`users/${user.id}/`)
        this.currRoleId = res.data.data.rid
        this.dialogFormVisibleRol = true
      },
      //修改用户状态
      async changeMgState(user) {
        const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
        console.log(res)
      },
      //编辑用户 - 发送请求
      async editUser() {
        const res = await this.$http.put(`users/${this.form.id}`, this.form);
        console.log(res)
        this.dialogFormVisibleEdit = false;
        this.getUserList();
      },
      //编辑用户 - 显示对话框
      showEditUserDia(user) {
        this.dialogFormVisibleEdit = true;
        this.form = user;
      },
      //删除用户 - 打开消息盒子
      showDeleUserMsgBox(userId) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`users/${userId}`);
          console.log(res);
          if (res.data.meta.status === 200) {
            //更新列表
            this.pagenum = 1;
            this.getUserList();
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //添加用户 - 发送请求
      async addUser() {
        const res = await this.$http.post(`users`, this.form);
        console.log(res);
        const {meta: {status, msg}, data} = res.data;
        if (status === 201) {
          this.dialogFormVisibleAdd = false;
          this.$message.success(msg);
          this.getUserList();
          //清空文本框
          this.form = {};
        } else {
          this.$message.warning(msg);
        }
      },
      //添加用户 - 显示对话框
      showAddUserDia() {
        //清空编辑后的form对象的值（添加和编辑公用一个form对象）
        this.form = {};
        this.dialogFormVisibleAdd = true;
      },
      //清空搜索框 重新获取数据
      loadUserList() {
        this.getUserList();
      },
      //搜索用户
      searchUser() {
        console.log('按照搜索框中的query值去搜索用户');
        this.getUserList();
      },
      //分页相关方法
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
        this.getUserList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum = val;
        this.getUserList();
      },
      //获取用户列表的请求
      async getUserList() {
        //query  查询参数 可以为空
        //pagenum 当前页码   不能为空
        //pagesize 每页显示条数  不能为空
        //需要授权的API  必须在请求头中使用Authorization字段提供token令牌
        const AUTH_TOKEN = localStorage.getItem('token');
        this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        const res = await this.$http.get(
          `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
        );
        console.log(res);
        const {
          meta: {status, msg},
          data: {users, total}
        } = res.data;
        if (status === 200) {
          this.userlist = users;
          this.total = total;
          this.$message.success(msg);
        } else {
          this.$message.warning(msg);
        }
      }
    }
  }
</script>

<style>
  .box-card {
    height: 100%;
  }

  .inputSearch {
    width: 300px;
  }

  .searchRow {
    margin-top: 20px;
  }

</style>
