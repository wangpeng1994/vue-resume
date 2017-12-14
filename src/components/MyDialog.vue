<template>
  <div class="dialogWrapper" v-show="visible">
    <div class="dialog">
      <header>
        {{ title }}
        <span class="close" @click="close">X</span>
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

<style scoped lang="scss">
  .dialogWrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog {
    min-height: 4em;
    min-width: 8em;
    background: #fff;
    > header {
      padding: 16px;
      display: flex;
      justify-content: space-between;
    }
    > main { padding: 16px; }
  }


</style>


