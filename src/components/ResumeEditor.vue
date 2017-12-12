<template>

  <div id="resumeEditor">
    <nav>
      <ol>
        <li v-for="(item,index) in resume.config" :class="{active: item.field === selected}" @click="selected = item.field">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-${item.icon}`"></use>
          </svg>
        </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-for="item in resume.config" v-show="item.field === selected">
        <div v-if="resume[item.field] instanceof Array">
          <div class="subitem" v-for="subitem in resume[item.field]">
            <div class="resumeField" v-for="(value,key) in subitem">
              <label> {{ key }} </label>
              <input type="text" :value="value" @input="value = $event.target.value"> 
            </div>
            <hr>
          </div>
        </div>

        <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
          <label> {{ key }} </label>
          <input type="text" v-model="resume[item.field][key]">
        </div>
      </li>
    </ol>
  </div>

</template>

<script>
export default {
  name: 'ResumeEditor',
  computed: {
    selected: {
      get(){
        return this.$store.state.selected
      },
      set(value){
        return this.$store.commit('switchTab', value) // 计算属性默认只能 get，而这里UI事件会导致数据变更，所以需要启用 set，同时传入载荷，也就是最新的 selected
      }
    },
    resume(){
      return this.$store.state.resume
    },
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
  #resumeEditor {
    min-width: 35%; //因为 预览区是 flex，所以会挤压元素，所以这里改成 min-width
    background:#fff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    border-radius: 4px;
    overflow: hidden;
    > nav {
      width: 80px;
      background: #000;
      color: #fff;
      > ol {
        > li {
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 16px;
          margin-bottom: 16px;
          &.active {
            background: #fff;
            color: #000;
          }
        }
      }
    }
    > .panels {
      flex-grow: 1;
      > li { padding: 24px; }
    }
  }

  .resumeField {
    > label {
      display: block;
    }
    input[type="text"] {
      margin: 16px 0;
      border: 1px solid #ddd;
      box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.25);
      width: 100%;
      height: 40px;
      padding: 0 8px;
    }
  }

  ol { list-style: none; }

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 24px 0;
  }
</style>


