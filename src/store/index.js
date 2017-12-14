import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'  // 引入 object-path，方便查找 resume 的属性

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resume: {
      config: [
        { field: 'profile', icon: 'id' },
        { field: 'projects', icon: 'folder' },
        { field: 'workHistory', icon: 'work' },
        { field: 'education', icon: 'hat' },
        { field: 'awards', icon: 'cup' },
        { field: 'contacts', icon: 'phone' }
      ],
      profile: {
        name: '张三丰',
        title: '掌门人',
        city: '武当山',
        birthday: '1542-05-01'
        
      },
      projects: [
        { name: '项目1', content: '文字' },
        { name: '项目2', content: '文字' }
      ],
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
      awards: [
        { name: '吉尼斯编程大赛', content: '连续十年蝉联冠军' },
        { name: '统一冰红茶大奖赛', content: '再来一瓶幸运王' }          
      ],
      contacts: [
        { contact: 'phone', content: '18556529263' },
        { contact: 'email', content: '947034046@qq.com' },
      ]
    }
  },

  mutations: {
    initState(state, payload){
      Object.assign(state, payload) //将后者所有可枚举属性拷贝到前者中
    },
    switchTab(state, payload){ // 设置载荷
      state.selected = payload
      localStorage.setItem('state', JSON.stringify(state)) // 页面重载后，tab 也会载入上次 selected
    },
    updataResume(state, {path, value}){
      // 调用 objectPath 的 set 接口，为 state.resume 的 path 设置 值，这里的 path 可能是单层的键名，也可能是数组下的对象的键名
      objectPath.set(state.resume, path, value)
      localStorage.setItem('state', JSON.stringify(state)) //input 内容每次变动，都会 commit 到这里，也因此实时储存
    },
    setUser(state, payload){
      Object.assign(state.user, payload)
    },
    removeUser(state){
      state.user.id = ''
    }
  }
})