import AV from './leancloud'

export default function(user){
  var {id, attributes:{username}} = user || AV.User.current() || {attributes:{}} // 如果调用 leancloud 的API 还是获取不到，则设为空
  console.log({id, username})
  return {id, username}
}