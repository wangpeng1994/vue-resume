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
            <el-button class="el-icon-delete" type="danger" plain @click="deleteSubItem(item.field, i)"></el-button>
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
          <el-button type="primary" plain @click="addSubItem(item.field)">新增</el-button>
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
    addSubItem(field){
      this.$store.commit('addSubItem', field)
    },
    deleteSubItem(field, subItemIndex){
      this.$confirm('你正在尝试删除当前条目，是否继续？', '提示', {
        confirmBUttonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$store.commit('deleteSubItem', {field, subItemIndex})
        this.$message({
          type: 'success',
          message: '当前条目已删除'
        })
      })
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
      padding: 8px;
    }
    input[type="text"] {
      height: 40px;
    }
  }
  .resumeField::after {
    display: block;
    content: '';
    clear: both;
  }

  // 引入svg通用样式
  .icon {
    width: 1.5em; height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .subitem { 
    position: relative;
    .el-icon-delete {
      position: absolute;
      right: 0;
      top: -4px;
      line-height: 0;
      font-size: 16px;
    }
    hr {
      border: none;
      border-top: 1px solid #ddd;
      margin: 24px 0;
    }  
  }

  ol { list-style: none; }
</style>


