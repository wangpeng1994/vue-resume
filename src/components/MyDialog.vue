<template>
  <div class="dialogWrapper" v-show="visible">
    <div class="dialog">
      <header>
        {{ title }}
        <i class="el-icon-close" @click="close"></i>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDialog',
  // 子组件要显式地用 props 选项声明它预期的数据  
  props: ['title', 'visible'],
  methods: {
    close(){
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
  .dialogWrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog {
    height: 240px;
    width: 350px;
    background: #fff;
    border-radius: 5px;
    > header {
      padding: 16px 18px;
      display: flex;
      font-size: 16px;

      justify-content: space-between;
      i {
        cursor: pointer;
        &:hover {
          color: #66b1ff;
        }
      }
    }
  }

  // 下方是注册登录表单样式
main {
  padding: 16px 32px;
  .row {
    position: relative;
    input {
      height: 35px;
      width: 100%;
      padding: 5px 5px 5px 32px;
      font-size: 14px;
      border: 1px solid #999;
      border-radius: 4px;
      background-color: #faffbd;
      &:hover { border: 1px solid #666; }
    }
    // 引入svg通用样式
    .icon {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 1em; 
      height: 1em;
      vertical-align: -0.15em;
      fill: #666;
      overflow: hidden;
    }
    & + .row { margin-top: 16px; }
  }

  .actions {
    .errorMessage {
      display: block;
      margin: 8px 0;
      height: 20px;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      color: #ff9800;
    }
    input {
      width: 100%;
      border-radius: 4px;
      font-size: 16px;
      line-height: 2;
      outline: none;
      color: #fff;
      cursor: pointer;
      &[value="注册"] {
        border: 1px solid #67c23a;
        background: #67c23a;
        &:hover {
          background: #85ce61;
          border-color: #85ce61;
        }
      }
      &[value="登录"] {
        border: 1px solid #409eff;
        background: #409eff;
        &:hover {
          background: #66b1ff;
          border-color: #66b1ff;
        }
      }
    }
  }
}
</style>


