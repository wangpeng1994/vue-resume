<template>
  <div class="page">
    <header>
      <Topbar/>
    </header>
    <main>
      <ResumeEditor/>
      <ResumePreview/>
    </main>
  </div>
</template>

<script>
import 'normalize.css'
import './assets/reset.css' //因为 webpack 支持这样引入css

import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'

import store from './store/index'

export default {
  name: 'app',
  store,
  data(){
    return {
      text: '哈喽'
    }
  },
  components: {Topbar, ResumeEditor, ResumePreview}
}
</script>

<style lang="scss">
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #eaebec;
    min-width: 1024px;
    >main {
      flex-grow: 1;
    }
    >main {
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
  // 引入svg通用样式
  .icon {
    width: 1.5em; height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
