<template>
  <div>
    <form @submit.prevent="signIn">
      <div class="row">
        <label>用户名</label>
        <input type="text" v-model="formData.username" required>
      </div>
      <div class="row">
        <label>密码</label>
        <input type="password" v-model="formData.password" required>
      </div>
      <div class="actions">
        <input type="submit" value="提交">
        <span class="errorMessage"> {{ errorMessage }} </span>
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
  created(){

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
 