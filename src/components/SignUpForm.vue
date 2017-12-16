<template>
  <div>
    <form @submit.prevent="signUp">
      <div class="row">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-username"></use>
        </svg>
        <input type="text" v-model="formData.username" placeholder="请设置用户名" required>
      </div>
      <div class="row">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-password"></use>
        </svg>
        <input type="password" v-model="formData.password" placeholder="请设置登录密码" required>
      </div>
      <div class="actions">
        <span class="errorMessage"> {{ errorMessage }} </span>
        <input type="submit" value="提交">
      </div>
    </form>
  </div>
</template>

<script>
import AV from '../lib/leancloud'
import getErrorMessage from '../lib/getErrorMessage'
import getAVUser from '../lib/getAVUser'

export default {
  name: 'SignUpForm',
  data(){
    return {
      formData: {
        username: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    signUp(){
      if(this.checkOut() === false) return
      let {username, password} = this.formData
      var user = new AV.User()
      user.setUsername(username)
      user.setPassword(password)
      user.signUp().then((loginedUser)=>{
        this.$emit('success', getAVUser())
      }, (error)=>{
        this.errorMessage = getErrorMessage(error)
      })
    },
    checkOut(){
      console.log(this.formData.username, this.formData.password)
      if(!/^\w{4,16}$/.test(this.formData.username)){
        this.errorMessage = '用户名需输入4-16个字符，包括字母数字下划线'
        return false
      }
      if(!/^\w{8,16}$/.test(this.formData.password)){
        this.errorMessage = '密码需输入8-16个字符，包括字母数字下划线'
        return false
      }
    }
  }
}
</script>
 