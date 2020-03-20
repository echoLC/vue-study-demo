<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <v-form 
      :model="userInfo" 
      :rules="rules" 
      :label-width="80" 
      class="home-form"
      ref="VForm">
      <v-form-item label="用户名" prop="username">
        <v-input v-model="userInfo.username" placeholder="请输入用户名" />
      </v-form-item>
      <v-form-item label="密码" prop="password">
        <v-input v-model="userInfo.password" type="password" placeholder="请输入密码" />
      </v-form-item>
      <v-form-item>
        <button @click="submit">提交</button>
      </v-form-item>
    </v-form>
  </div>
</template>

<script>
// @ is an alias to /src
import VForm from '@/components/VForm'
import VInput from '@/components/VInput'

const VFormItem = VForm.Item

export default {
  name: 'Home',

  components: {
    VForm,
    VFormItem,
    VInput
  },

  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名称' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },

  methods: {
    submit () {
      this.$refs.VForm.validate((result) => {
        alert(result)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-form {
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
