import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,

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
        name: '张三丰',
        city: '武当',
        titile: '掌门人'
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
  },

  mutations: {
    increment(state){
      state.count++
    },
    switchTab(state, payload){
      state.selected = payload
    }
  }
})