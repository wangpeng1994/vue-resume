<template>
  <div id="resumePreview">
    <section data-name="profile" v-show="resume.profile">
      <div>
        <h1> {{ resume.profile.name || '请填写姓名' }} </h1>
      </div>
      <div>
        <p> 应聘岗位：{{ resume.profile.title || '请填写应聘岗位' }} </p>
        <p> 现居城市：{{ resume.profile.city || '请填写现居城市' }} </p>
        <p> 出生年月：{{ resume.profile.birthday || '请填写出生年月' }} </p>
      </div>
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
    background: #fafffc;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    border-radius: 4px;
    overflow: auto;
    * {
      box-sizing: border-box;
      font-weight: normal;
      font-variant: normal;
    }
    ol {
      list-style: none;
      padding: 0 20px;
    }
    section + section { margin-top: 2em; } // 巧妙设置间隙，不用去头或去尾
    p {
      white-space: pre-line; // 合并空白字符，但是保留换行符
      color: #000;  
      font-size: 14px;
    } 
    section {
      margin-bottom: .5em;
      h2:first-child {
        width: 100%;
        text-indent: 16px;
        font-size: 20px;
        color: #fff;
        //background: #7ac7a0;
        background: linear-gradient(to right,#7ac7a0 0%,#fafffc 120%);
        display: inline-block; //这样背景色就不会占满正行
        padding: .2em;
        margin-bottom: 16px;
      }
    }
    section[data-name="profile"] {
      margin-top: 24px;
      display: flex;
      justify-content: space-around;
      h1 {
        font-size: 2.4em;
        margin: 16px 0 0 0;
      }
      p { border-bottom: 2px solid #aedec6; }
      p + p { margin-top: 8px; }
      div {
        width: 50%;
        padding: 0 40px;
        text-align: center;
        & + div {
          text-align: left;
          border-left: 3px solid #aedec6;
          padding: 0 40px 0 80px;
        }
      }
    }
    section[data-name="projects"],
    section[data-name="workHistory"],
    section[data-name="awards"] {
      li + li { margin-top: 1em; }
      li {
        h3 {
          font-size: 16px;
          border-bottom: 1px solid #ddd;
          padding-bottom: .3em;
          margin-bottom: .3em;
        }
        line-height: 1.5;
      }
    }
    section[data-name="education"],
    section[data-name="contacts"] {
      h3 {
        font-size: 16px;
        padding-bottom: .3em;
        margin-bottom: .3em;
      }
      td:first-child { padding-right: 1em; }
    }
  }
</style>


