import { defineStore } from 'pinia'
import myaxios from '../myaxios'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const isAuth = computed(()=> !!token.value)
  const login = async (username: string, password: string) => {
    try {
      const res = await myaxios.post('/auth/login', { username: username, password: password })
      token.value = res.data.token
      localStorage.setItem('token', res.data.token)
      ElMessage.success('登录成功')
    } catch (error) {
      ElMessage.error('登录失败，请检查用户名和密码。')
      throw error
    }
  }

  const logout = () => {
    token.value = null
    localStorage.removeItem('token')
  }

  return {
    login,
    logout,
    isAuth
  }
})
