<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resume</span>
      
      <div class="actions">
        <button class="save">保存</button>
        <button>预览</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topbar'
}
</script>

<style scoped lang="scss">
  #topbar {
    background: #fff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
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

  button {
    width:72px;
    height:32px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    background: #ddd;
    color: #222;
    &:hover {
      box-shadow: 1px 1px 1px rgba(0,0,0,0.50);
    }
    &.save {
      background:#02af5f;
      color: #fff;
    }

  }


</style>

