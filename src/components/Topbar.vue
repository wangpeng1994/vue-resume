<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resume</span>
      <div class="actions">
        <div class="userActions" v-if="logined">
          <span class="welcome">你好，{{ user.username }}</span>
          <el-button type="danger" @click="signOut">注销</el-button>
          <el-button type="success" @click="createOrUpdateState">保存</el-button>
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
      this.$emit('fetchState')
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
        window.location.reload()
      })
    },
    preview(){
      this.$emit('preview')
    },
    createOrUpdateState(){
      if(this.$store.state.id){
        this.updataState()
      }else{
        this.createState()
      }
    },
    createState(){
      let dataString = JSON.stringify(this.$store.state)
      let AVState = AV.Object.extend('AllStates')
      let avState = new AVState()
      var acl = new AV.ACL()
      acl.setReadAccess(AV.User.current(), true)
      acl.setWriteAccess(AV.User.current(), true)
      avState.set('content', dataString)
      avState.setACL(acl)
      avState.save().then((state)=>{
        // 创建成功后将新建state的id设置到仓库store对象中，作为下次登录、刷新前（实际就是fetch之前）的重要依据。目的有二：1、再次点击保存时，逻辑判断为属于更新；2、更新时需要指明更新哪个state；3、
        this.$store.state.id = state.id 
        this.$message({
          type: 'success',
          message: '恭喜你，创建成功！'
        })
      }, (error)=>{
        this.$message({
          type: 'error',
          message: '创建时服务器出错，保存失败！'
        })
      })
    },
    updataState(){
      let dataString = JSON.stringify(this.$store.state)
      let avState = AV.Object.createWithoutData('AllStates', this.$store.state.id)
      avState.set('content', dataString)
      avState.save().then(()=>{
        this.$message({
          type: 'success',
          message: '恭喜你，保存成功！'
        })
      }, (error)=>{
        this.$message({
          type: 'error',
          message: '更新时服务器出错，保存失败！'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  #topbar {
    background: #000;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
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
      color: #01e2c5;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        animation: rainbow 3s linear infinite;
      }
      @keyframes rainbow {  // 开心就好
        0% { color: #01e2c5; }
        10% { color: #0de201; }
        20% { color: #bee201; }
        30% { color: #e27501; }
        40% { color: #e20101; }
        50% { color: #e201b0; }
        60% { color: #6e01e2; }
        60% { color: #3d01e2; }          
        70% { color: #0117e2; }
        80% { color: #0178e2; }
        90% { color: #01ade2; }
        100% { color: #01e2c5; }          
      }
    }
  }
  .actions {
    display: flex;
    .userActions {
      margin-right: 0.7em;
      .welcome {
        color: #fff;
        font-size: 20px;
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
  .el-button + .el-button {
    margin-left: 6px;
  }
</style>

