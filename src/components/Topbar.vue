<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resume</span>
      
      <div class="actions">
        <div class="userActions" v-if="logined">
          <span>你好，{{ user.username }}</span>
          <el-button type="danger" @click="signOut">注销</el-button>
        </div>

        <div class="userActions" v-else>
          <el-button type="success" @click="signUpDialogVisible = true">注册</el-button>
          <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
            <signUpForm @success="signIn($event)"/>
          </MyDialog>
          <el-button type="primary">登录</el-button>
        </div>

        <el-button type="success">保存</el-button>
        <el-button type="primary">预览</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'
import AV from '../lib/leancloud'

export default {
  name: 'Topbar',
  data(){
    return {
      signUpDialogVisible: false
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
  components: {MyDialog, SignUpForm},
  methods: {
    signIn(user){ // 注意这里的 user 不是计算属性，只是形参，是由子组件 emit 时携带的信息
      this.signUpDialogVisible = false
      this.$store.commit('setUser', user)
    },
    signOut(){
      AV.User.logOut()
      this.$store.commit('removeUser')
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
      margin-right: 3em;
    }
  }
  // 修改 Element UI 样式
  .el-button {
    line-height: 0.8;
    font-size: 16px;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.4);
  }
</style>

