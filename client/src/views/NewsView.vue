<template>
<div class="news-container">
  <el-container>
    <el-main>
        <el-card v-for="article in articles" class="article-card">
          <h2>{{article.title}}</h2>
          <p>{{article.preview}}</p>
          <el-button text @click=viewDetail(article._id)>阅读更多</el-button>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import myaxios from "../myaxios"
import { useAuthStore } from "../stores/auth";
import { ElMessage } from "element-plus";
import router from "../router";
import { Article } from "../types/Article";


const articles = ref<Article[]>([])
const authStore = useAuthStore()

const viewDetail = (id:string) =>{
    if(!authStore.isAuth){
      ElMessage.error('请登录')
    }else{
      router.push({
        name:"NewsDetail",
        params:{ id }
      })
    }
}

const fetchArticle = async () => {
  try {
    const response = await myaxios.get<Article[]>('/articles')
    articles.value = response.data

  } catch (error) {
    console.error('failed to load article', error);

  }

}

onMounted(fetchArticle)
</script>

<style scoped>
.article-card {
  margin: 20px 0;
}

.news-container {
  display: flex;
  justify-content: center;
  align-items: start;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}

.no-data {
  text-align: center;
  font-size: 1.2em;
  color: #999;
}
</style>