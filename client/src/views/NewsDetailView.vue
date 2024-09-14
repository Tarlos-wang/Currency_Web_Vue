<template>
  <div class="news-container">
    <el-container>
      <el-main>
        <el-card>
          <h2>{{ article?.title }}</h2>
          <p>{{ article?.content }}</p>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Article } from '../types/Article';
import myaxios from "../myaxios"
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';


const route = useRoute()
const article = ref<Article | null>(null)

const fetchArticleDetail = async () => {
  const { id } = route.params
  try {

    const res = await myaxios.get<Article>(`/articles/${id}`)
    console.log('article', res.data);

    article.value = res.data
  } catch (error) {
    console.log("fail to load article");


  }
}

onMounted(fetchArticleDetail)

</script>

<style scoped>
.article-detail {
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