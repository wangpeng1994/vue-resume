import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 'profile',
    resume: {
      config: [
        { field: 'profile', icon: 'id' },
        { field: 'workHistory', icon: 'work' },
        { field: 'education', icon: 'hat' },
        { field: 'projects', icon: 'folder' },
        { field: 'awards', icon: 'cup' },
        { field: 'contacts', icon: 'phone' },
      ],
      profile: {
        name: '张三丰',
        title: '掌门人',
        city: '武当山',
        birthday: '1542-05-01'
        
      },
      workHistory: [
        {
          company: '饭跑跑股份有限公司', content: `公司总部设在XXXX地区， 先后在北京、上海成立分公司。是中国知名的在线外卖订餐平台，已经覆盖中国数千个城市，聚集了数百万家餐饮商户。为不同类型的餐饮及零售行业商户提供基于互联网技术的一体化运营解决方案。
          我的主要工作如下：
          1. 制造 bug。
          2. 修复 bug。
          3. 完成产品设计需求。`
        },
        {
          company: '大饼责任有限公司', content: `公司总部设在XXXX地区， 先后在北京、上海成立分公司。是中国知名的在线外卖订餐平台，已经覆盖中国数千个城市，聚集了数百万家餐饮商户。为不同类型的餐饮及零售行业商户提供基于互联网技术的一体化运营解决方案。
          我的主要工作如下：
          1. 制造 bug。
          2. 修复 bug。
          3. 完成产品设计需求。`
        }
      ],
      education: [
        { school: '哈佛大学', content: '本科' },
        { school: '牛津大学', content: '硕士' }          
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
    switchTab(state, payload){ // 设置载荷，便于set
      state.selected = payload
    }
  }
})