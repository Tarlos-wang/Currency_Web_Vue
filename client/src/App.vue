<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item index="Home">首页</el-menu-item>
        <el-menu-item index="CurrencyExchange">兑换货币</el-menu-item>
        <el-menu-item index="News">查看新闻</el-menu-item>
        <el-menu-item index="Login">登录</el-menu-item>
        <el-menu-item index="Register">注册</el-menu-item>
        <el-menu-item index="Logout">退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
      <el-button @click="console.log($route.params)">测试按钮</el-button>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, watch ,computed} from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 定义 activeIndex 的初始值为当前路由的名称
const activeIndex = computed(()=>route.name?.toString() || 'home')

const handleSelect = (key: string) => {
  console.log(key)
  router.push({
    name: key.charAt(0).toUpperCase() + key.slice(1)
  })
}
</script>

<style scoped>
.el-menu-demo {
  line-height: 60px;
}
</style>