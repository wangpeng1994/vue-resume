<template>
  <div>
    <div class="page">
      <header>
        <Topbar @preview="preview" @fetchState="fetchState" v-show="!previewMode"/>
      </header>
      <main>
        <ResumeEditor v-show="!previewMode"/>
        <ResumePreview/>
      </main>
      <el-button class="exitPreview" type="danger" @click="exitPreview" v-show="previewMode">退出预览</el-button>
    </div>
  </div>
</template>

<script>
import 'normalize.css'
import './assets/reset.css' //因为 webpack 支持这样引入css

import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'

import store from './store/index'
import AV from './lib/leancloud'
import getAVUser from './lib/getAVUser'

export default {
  name: 'app',
  store,
  data(){
    return {
      previewMode: false
    }
  },
  components: {Topbar, ResumeEditor, ResumePreview},
  created(){
    // 之前 SIgnUpForm 注册成功后，其父组件 Tobbar 会commit setUser， 而这一次是 App 主组件下页面载入时，也要去试着获取登录用户
    this.$store.commit('setUser', getAVUser()) // 如果是已经登录的用户，这里的 getAVUser 就能通过 AV.User.current() 获取到用户
    this.fetchState()
  },
  methods: {
    preview(){
      this.previewMode = true
    },
    exitPreview(){
      this.previewMode = false
    },
    fetchState(){
      if(this.$store.state.user.id){
        let query = new AV.Query('AllStates')
        query.find().then((state)=>{
          let avAllStates = state[0]
          this.$store.commit('initState', JSON.parse(avAllStates.attributes.content))
          // 很重要，如果用户第一次点击保存，实际上创建时state里的id是空的，只存在于内存中（但依然可以作为下次保存的依据，并且下次保存时就会把state id更新到对象中，从此万事大吉）
          // 但是！此时如果只点击了一次保存（实际上是创建操作），就刷新或者退出重登（都会引起内存的刷新), 虽然可以正常fetch（只要用户id存在就能fetch），但是再点击保存，就失去了依据（创建OR更新的依据没了，保存时需要指定数据表中的state id的依据也没了！）
          this.$store.state.id = avAllStates.id
        }, (error)=>{
          this.$message({
            type: 'error',
            message: '服务器出错，获取用户数据失败！'
          })
        })
      }
    }
  }
}
</script>

<style lang="scss">
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #eaebec;
    min-width: 1024px;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    >main {
      flex-grow: 1;
    }
    >main {
      height: calc(100vh - 96px); // 为了兼容 Edge 和 Firefox 中 overflow: auto  与 Chrome 的差异问题
      max-width: 1440px;
      margin-top: 16px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      width: 100%;
      align-self: center;
    }
  }


  .exitPreview {
    position: fixed;
    right: 16px;
    bottom: 16px;
  }
</style>
