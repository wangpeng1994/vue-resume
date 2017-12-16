<template>
  <div>
    <form @submit.prevent="signIn">
      <div class="row">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-username"></use>
        </svg>
        <input type="text" v-model="formData.username" placeholder="请输入用户名" required>
      </div>
      <div class="row">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-password"></use>
        </svg>
        <input type="password" v-model="formData.password" placeholder="请输入登录密码" required>
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
  name: 'SignInForm',
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
    signIn(){
      let {username, password} = this.formData
      AV.User.logIn(username, password).then(()=>{
        this.$emit('success', getAVUser())
      }, (error)=>{
        this.errorMessage = getErrorMessage(error)
      })
    }
  }
}
</script>
 