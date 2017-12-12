<template>
  <div id="resumePreview">
    
    <section data-name="profile" v-show="resume.profile">
      <h1>
        {{ resume.profile.name }}
      </h1>
      <h2> {{ resume.profile.title }} </h2>
      <p>
        <small> {{ resume.profile.city }} </small>
        <small> {{ resume.profile.birthday }} </small>
      </p>
    </section>

    <section data-name="workHistory" v-show="resume.workHistory">
      <h2>工作经历</h2>
      <ol>
        <li v-for="item in resume.workHistory">
          <h3> {{ item.company }} </h3>
          <p v-show="item.content"> {{ item.content }} </p>
        </li>
      </ol>
    </section>

    <section data-name="education" v-show="resume.education">
      <h2>毕业院校</h2>
      <ol>
        <li v-for="item in resume.education">
          <h3>
            {{ item.school }}
            <span v-show="item.content"> - {{ item.content }} </span>
          </h3>
        </li>
      </ol>
    </section>




  </div>
</template>

<script>
export default {
  name: 'ResumePreview',
  computed: {
    resume(){
      return this.$store.state.resume
    }
  }
}
</script>

<style lang="scss">
  #resumePreview {
    flex-grow: 1;
    margin-left: 16px;
    background:#fff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    border-radius: 4px;
    overflow-Y: auto;
    * {
      box-sizing: border-box;
      font-weight: normal;
      font-variant: normal;
    }
    ol { list-style: none; }
    section + section { margin-top: 2em; } // 巧妙设置间隙，不用去头或去尾
    p { white-space: pre-line; } // 合并空白字符，但是保留换行符
    section {
      margin-bottom: .5em;
      > h2:first-child {
        background: #ddd;
        display: inline-block; //这样背景色就不会占满正行
        padding: .2em;
      }
    }
    section[data-name="profile"] {
      > h1 {
        margin: .1em 0;
        font-size: 3.2em;
      }
    }
    section[data-name="workHistory"] {
      li + li { margin-top: 1em; }
      li {
        h3 {
          border-bottom: 1px solid #999;
          padding-bottom: .3em;
          margin-bottom: .3em;
        }
      }
    }
    section[data-name="education"] {
      li { line-height: 1.5; }
    }

  }
</style>


