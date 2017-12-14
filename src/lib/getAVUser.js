import AV from './leancloud'

export default function(user){
  var {id, attributes:{username}} = user || AV.User.current() || {attributes:{}} 
  // 如果调用 leancloud 的API 还是获取不到，则设为空
  return {     
    id: id || '',
    username: username || '' 
  }
}

/*
绝对不能让 id 和 username 变为 undefined 或者 null, 因为：
Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。
由于 Vue 不允许动态添加根级响应式属性，所以必须在初始化实例前声明根级响应式属性，哪怕只是一个空值。
*/

