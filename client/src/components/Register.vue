<template>
  <div class="auth-container">
    <el-form  class="auth-form" @submit.prevent="Register">
      <el-form-item label="用户名" label-width="80px" >
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" label-width="80px">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" />
      </el-form-item>
      <div class="center-button">
        <el-button type="primary" native-type="submit" >注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import myaxios from '../myaxios'
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const form = ref({
  username: '',
  password: ''
})

const router = useRouter()

const Register = async () => {

  try {
    const res = await myaxios.post('/auth/Register', {
      username: form.value.username,
      password: form.value.password
    })

    localStorage.setItem('token', res.data.token)
    ElMessage.success('注册成功')
    
    router.push({
      name: 'News'
    })
  } catch (error) {
    ElMessage.error('注册失败，请检查用户名和密码。');
    
  }

}

</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}

.center-button {
  display: flex;
  justify-content: center;
}

.auth-form {
  width: 100%;
  max-width: 360px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>