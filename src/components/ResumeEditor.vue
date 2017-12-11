<template>

  <div id="resumeEditor">
    <nav>
      <ol>
        <li v-for="(item,index) in resume.config" :class="{active: item.field === selected}" @click="selected = item.field"
            >
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
              <input type="text" :value="value"> 
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
  data(){
    return {
      selected: 'profile',
      resume: {
        config: [
          { field: 'profile', icon: 'id' },
          { field: 'work history', icon: 'work' },
          { field: 'education', icon: 'hat' },
          { field: 'projects', icon: 'folder' },
          { field: 'awards', icon: 'cup' },
          { field: 'contacts', icon: 'phone' },
        ],
        profile: {
          name: '222',
          city: '333',
          titile: '444'
        },
        'work history': [
          {company: '百度', content: '担任百度藏经阁扫地僧'},
          {company: '腾讯', content: '担任腾讯QB管理员'}
        ],
        education: [
          { school: '哈佛大学', content: '文字' },
          { school: '牛津大学', content: '文字' }          
        ],
        projects: [
          { name: '项目1', content: '文字' },
          { name: '项目2', content: '文字' }
        ],
        awards: [
          { name: '获奖1', content: '文字' },
          { name: '获奖2', content: '文字' }          
        ],
        contacts: [
          { contact: 'phone', content: '18556529263' },
          { contact: '邮箱', content: '947034046@qq.com' },
        ]
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
  #resumeEditor {
    width: 35%;
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
    input[type=text] {
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


