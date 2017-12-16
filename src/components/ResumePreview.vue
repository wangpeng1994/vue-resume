<template>
  <div id="resumePreview">
    <section data-name="profile" v-show="resume.profile">
      <h1>
        {{ resume.profile.name || '请填写姓名' }}
      </h1>
      <h2> {{ resume.profile.title || '请填写职位' }} </h2>
      <p>
        <small> {{ resume.profile.city || '请填写城市' }} </small>
        <small> {{ resume.profile.birthday || '请填写出生年月' }} </small>
      </p>
    </section>

    <section data-name="projects" v-show="resume.projects">
      <h2>项目经历</h2>
      <ol>
        <li v-for="item in resume.projects">
          <h3> {{ item.name || '请填写项目名称' }} </h3>
          <p> {{ item.content || '请填写项目内容' }} </p>
        </li>
      </ol>
    </section>

    <section data-name="workHistory" v-show="resume.workHistory">
      <h2>工作经历</h2>
      <ol>
        <li v-for="item in resume.workHistory">
          <h3> {{ item.name || '请填写公司名称' }} </h3>
          <p> {{ item.content || '请填写工作内容' }} </p>
        </li>
      </ol>
    </section>

    <section data-name="education" v-show="resume.education">
      <h2>毕业院校</h2>
      <ol>
        <li v-for="item in resume.education">
          <h3>
            {{ item.name || '请填写学校名称' }} - {{ item.content || '请填写学历' }}
          </h3>
        </li>
      </ol>
    </section>

    <section data-name="awards" v-show="resume.awards">
      <h2>获奖情况</h2>
      <ol>
        <li v-for="item in resume.awards">
          <h3> {{ item.name || '请填写奖项名称' }} </h3>
          <p> {{ item.content || '请填写所获等次' }} </p>
        </li>
      </ol>
    </section>

    <section data-name="contacts" v-show="resume.contacts">
      <h2>联系方式</h2>
      <ol>
        <li v-for="item in resume.contacts">
          <h3>
            {{ item.name || '请填写联系类型' }} - {{ item.content || '请填写联系方式' }}
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
    padding: 24px;
    max-width: 900px;
    margin: 0 auto;
    flex-grow: 1;
    background:#fff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    border-radius: 4px;
    overflow: auto;
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
    section[data-name="projects"],
    section[data-name="workHistory"],
    section[data-name="awards"] {
      li + li { margin-top: 1em; }
      li {
        h3 {
          border-bottom: 1px solid #999;
          padding-bottom: .3em;
          margin-bottom: .3em;
        }
        line-height: 1.5;
      }
    }
    section[data-name="contacts"] {
      td:first-child { padding-right: 1em; }
    }
  }
</style>


