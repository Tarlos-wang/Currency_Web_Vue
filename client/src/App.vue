<template>
  <el-container class="full-page">
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
        @select="handleSelect">
        <el-menu-item index="Home">首页</el-menu-item>
        <el-menu-item index="CurrencyExchange">兑换货币</el-menu-item>
        <el-menu-item index="News">查看新闻</el-menu-item>
        <el-menu-item index="Login" v-if="!authStore.isAuth">登录</el-menu-item>
        <el-menu-item index="Register" v-if="!authStore.isAuth">注册</el-menu-item>
        <el-menu-item index="Logout" v-if="authStore.isAuth">退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
      <el-button @click="console.log($route.params)">测试按钮</el-button>
    </el-main>
  </el-container>
</template>


<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore()
const router = useRouter();
const route = useRoute();

// 定义 activeIndex 的初始值为当前路由的名称
const activeIndex = computed(() => route.name?.toString() || 'home')

const handleSelect = (key: string) => {
  console.log(key)
  console.log(authStore.isAuth);
  
  if (key === 'Logout') {
    authStore.logout()
    router.push({
      name: 'Home'
    })
  } else {
    router.push({
      name: key.charAt(0).toUpperCase() + key.slice(1)
    })
  }


}


</script>

<style scoped>
/* 确保 html 和 body 占满整个页面 */
html, body {
  height: 100%;
  margin: 0;
}

/* 确保 el-container 高度填充整个页面 */
.full-page {
  height: 100%;
  width: 100%; /* 确保宽度也填充整个页面 */
  display: flex;
  flex-direction: column;
}

el-main, el-header {
  width: 100%; /* 确保 el-main 和 el-header 的宽度为 100% */
}

.el-menu-demo {
  line-height: 60px;
}
</style>