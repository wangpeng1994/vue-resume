<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resume</span>
      
      <div class="actions">
        <el-button type="success" @click="signUpDialogVisible = true">注册</el-button>
        <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
          <signUpForm @success="login($event)"/>
        </MyDialog>
        <el-button type="primary">登录</el-button>
        <el-button type="success">保存</el-button>
        <el-button type="primary">预览</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'

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
    }
  },
  components: {MyDialog, SignUpForm},
  methods: {
    login(user){ // 注意这里的 user 不是计算属性，只是形参，是由子组件 emit 时携带的信息
      this.signUpDialogVisible = false
      this.$store.commit('setUser', user)
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
  // 修改 Element UI 样式
  .el-button {
    line-height: 0.8;
    font-size: 16px;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.4);
  }
</style>

