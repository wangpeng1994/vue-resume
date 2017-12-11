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
        {{ resume[item.field] }}
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
          name: '',
          city: '',
          titile: ''
        },
        'work history': [],
        education: [],
        projects: [],
        awards: [],
        contacts: []
      }
      
    }
  }
}
</script>

<style lang="scss">
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
  }
  ol {
    list-style: none;
  }
</style>


