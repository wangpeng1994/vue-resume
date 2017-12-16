import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'  // 引入 object-path，方便查找 resume 的属性

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resume: {
      config: [
        { field: 'profile', icon: 'id',
          alias: {
            name: '姓名',
            title: '应聘岗位',
            city: '现居城市',
            birthday: '出生年月'
          }
        },
        { field: 'projects', icon: 'folder',
          alias: {
            name: '项目名称',
            content: '项目描述'
          }
        },
        { field: 'workHistory', icon: 'work',
          alias: {
            name: '单位名称',
            content: '工作内容'
          }
        },
        { field: 'education', icon: 'hat',
          alias: {
            name: '学校名称',
            content: '学历'
          }
        },
        { field: 'awards', icon: 'cup',
          alias: {
            name: '奖项名称',
            content: '所获等次'
          }
        },
        { field: 'contacts', icon: 'phone',
          alias: {
            name: '联系类型',
            content: '联系方式'
          }
        }
      ],
      profile: {
        name: '张三丰',
        title: 'web前端开发工程师',
        city: '武当山太和宫',
        birthday: '1247-04-09'
        
      },
      projects: [
        {
          name: '基于React+Redux的天眼数据平台', content: `1. 基于React全家桶，并使⽤AntDesign和Echarts组件库完成开发 
          2. 使⽤Redux进⾏全局状态管理，并使⽤Redux-devtools⼯具辅助开发
          3. 适配移动端，并与原⽣APP对接，⽀持⼿机从APP进⼊访问
          `
        },
        {
          name: '基于Vue+Vant的Mobile端⻚⾯', content: `1. 基于Vue，并使⽤Vant组件库完成开发，并实现与原⽣APP数据交互
          2. 使⽤H5的getUserMedia调⽤⽤户摄像头，并进⾏拍照
          3. 基于Vue，并使⽤Vant组件库完成开发，并实现与原⽣APP数据交互`
        }
      ],
      workHistory: [
        {
          name: '饭跑跑股份有限公司', content: `公司总部设在XXXX地区，是中国知名的在线外卖订餐平台，已经覆盖中国数千个城市，为不同类型的餐饮及零售行业商户提供基于互联网技术的一体化运营解决方案。
          我的主要工作如下：
          1. 制造 bug
          2. 修复 bug`
        },
        {
          name: '大饼责任有限公司', content: `公司总部设在XXXX地区，是中国知名的在线外卖订餐平台，已经覆盖中国数千个城市，为不同类型的餐饮及零售行业商户提供基于互联网技术的一体化运营解决方案。
          我的主要工作如下：
          1. 制造 bug
          2. 修复 bug`
        }
      ],
      education: [
        { name: '哈佛大学', content: '本科' },
        { name: '牛津大学', content: '硕士' }          
      ],
      awards: [
        { name: '吉尼斯编程大赛', content: '连续十年蝉联冠军' },
        { name: '统一冰红茶大奖赛', content: '再来一瓶幸运王' }          
      ],
      contacts: [
        { name: 'phone', content: '18556529263' },
        { name: 'email', content: '947034046@qq.com' },
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
    },
    setUser(state, payload){
      Object.assign(state.user, payload)
    },
    removeUser(state){
      state.user.id = ''
    },
    addSubItem(state, payload){
      state.resume[payload].push({
        name: '',
        content: ''
      })
    },
    deleteSubItem(state, payload){
      state.resume[payload.field].splice(payload.subItemIndex, 1)
    }
  }
})