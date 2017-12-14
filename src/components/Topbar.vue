<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resume</span>
      <div class="actions">
        <div class="userActions" v-if="logined">
          <span class="welcome">你好，{{ user.username }}</span>
          <el-button type="danger" @click="signOut">注销</el-button>
          <el-button type="success" @click="save">保存</el-button>
        </div>
        <div class="userActions" v-else>
          <el-button type="success" @click="signUpDialogVisible = true">注册</el-button>
          <el-button type="primary" @click="signInDialogVisible = true">登录</el-button>
        </div>
        <el-button type="primary" @click="preview">预览</el-button>
      </div>
    </div>
    <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
      <SignUpForm @success="signIn($event)"/>
    </MyDialog>
    <MyDialog title="登录" :visible="signInDialogVisible" @close="signInDialogVisible = false">
      <SignInForm @success="signIn($event)"/>
    </MyDialog>
  </div>
</template>

<script>
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import AV from '../lib/leancloud'

export default {
  name: 'Topbar',
  data(){
    return {
      signUpDialogVisible: false,
      signInDialogVisible: false,      
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    },
    logined(){
      return this.user.id
    }
  },
  components: {MyDialog, SignUpForm, SignInForm},
  methods: {
    signIn(user){ // 注意这里的 user 不是计算属性，只是形参，是由子组件 emit 时携带的信息
      this.signUpDialogVisible = false
      this.signInDialogVisible = false
      this.$store.commit('setUser', user)
      this.$message({
        type: 'success',
        message: '恭喜你，登录成功！'
      })
    },
    signOut(){
      this.$confirm('如果简历未保存，注销将会丢失改动，是否继续？', '提示', {
        confirmButtonText: '注销',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        AV.User.logOut()  // 调用注销接口
        this.$store.commit('removeUser') // 同时修改仓库
        this.$message({
          type: 'success',
          message: '当前用户已注销'
        })
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已回到当前编辑状态'
        })
      })
    },
    preview(){
      this.$emit('preview')
    },
    save(){
      // ... 待实现  

      this.$message({
        type: 'success',
        message: '恭喜你，保存成功！'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  #topbar {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    font-size: 20px;
    > .wrapper {
      max-width: 1440px;
      margin: 0 auto;
      height: 64px;
    }
    > .wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
    }
    .logo {
      font-size: 24px;
      color:#000;
    }
  }
  .actions {
    display: flex;
    .userActions {
      margin-right: 0.7em;
      .welcome {
        margin-right: .5em;
      }
    }
  }
  // 修改 Element UI 样式
  .el-button {
    line-height: 0.8;
    font-size: 16px;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.4);
  }
</style>

