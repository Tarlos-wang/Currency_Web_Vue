<template>
  <el-container>
    <el-main>
      <div >
        <el-card v-for="article in articles" class="article-card">
          <h2>{{article.title}}</h2>
          <p>{{article.preview}}</p>
          <el-button text>阅读更多</el-button>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import myaxios from "../myaxios"

interface Article {
  _id: string
  title: string
  content: string
  preview: string
}

const articles = ref<Article[]>([])

const fetchArticle = async () => {
  try {
    const response = await myaxios.get<Article[]>('/articles')
    articles.value = response.data
    console.log('articles loaded:', articles.value);

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

.no-data {
  text-align: center;
  font-size: 1.2em;
  color: #999;
}
</style>