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
          <div class="subitem" v-for="(subitem, i) in resume[item.field]">
            <div class="resumeField" v-for="(value,key) in subitem">
              <label> {{ item.alias[key] }} </label>
              <textarea
                v-if="key === 'content' && (item.field === 'projects' || item.field === 'workHistory')"
                rows="8" 
                placeholder="请输入内容" 
                :value="value"
                @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)">
              </textarea>
              <input
                type="text"
                v-else
                placeholder="请输入内容"
                :value="value"
                @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)"
              >
            </div>
            <hr>
          </div>
          <el-button type="primary" @click="addNew(item.field)">新增</el-button>
        </div>

        <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
          <label> {{ item.alias[key] }} </label>
          <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)"> 
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
      // 计算属性，是伪属性，默认只能 get，而这里UI事件会导致数据变更，所以需要启用 set，同时传入载荷，也就是最新的 selected
      set(value){
        return this.$store.commit('switchTab', value)
      }
    },
    resume(){
      return this.$store.state.resume
    }
  },
  methods: {
    changeResumeField(path, value){
      this.$store.commit('updataResume', {path, value})
    },
    addNew(field){
      console.log(field)
      this.$store.commit('addNew', field)
    }
  }
}
</script>

<style scoped lang="scss">
  #resumeEditor {
    margin-right: 16px;
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
          cursor: pointer;
          &.active {
            background: #fff;
            color: #000;
          }
        }
      }
    }
    > .panels {
      overflow: auto;
      flex-grow: 1;
      > li { padding: 24px; }
    }
  }

  .resumeField {
    > label {
      display: block;
    }
    input, textarea {
      margin: 16px 0;
      border: 1px solid #ddd;
      box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.25);
      width: 100%;
      padding: 0 8px;
    }
    input[type="text"] {
      height: 40px;
    }
  }

  ol { list-style: none; }

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 24px 0;
  }
</style>


