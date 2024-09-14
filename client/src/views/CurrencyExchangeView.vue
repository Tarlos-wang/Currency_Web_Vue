<template>
  <el-container>
    <el-form :model="form" class="exchange-form">
      <el-form-item label="金额">
        <el-input v-model="form.amount" type="number" placeholder="输入金额" />
      </el-form-item>
      <el-form-item label="从货币">
        <el-select v-model="form.fromCurrency" placeholder="选择货币">
          <el-option v-for="currency in currencies" :label="currency" :value="currency" />
        </el-select>
      </el-form-item>
      <el-form-item label="到货币">
        <el-select v-model="form.toCurrency" placeholder="选择货币">
          <el-option v-for="currency in currencies" :label="currency" :value="currency" />
        </el-select>
      </el-form-item>

      <div class="center-button"> 
        <el-button type="primary" @click="exchange">兑换货币</el-button>
      </div>
      <div v-if="result" class="result">
        <p>兑换结果:{{ result }}</p>
      </div>
    </el-form>
  </el-container>

</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import myaxios from "../myaxios"
import { error, log } from 'console';

interface ExchangeInfo {
  fromCurrency: string;
  toCurrency: string;
  rate: number
}
// do not use same name with ref
const form = ref({
  fromCurrency: '',
  toCurrency: '',
  amount: 0
})

const rates = ref<ExchangeInfo[]>([])
const currencies = ref<string[]>([])
const result = ref<number | null>(null)

const fetchCurrencies = async () => {
  try {
    const response = await myaxios.get<ExchangeInfo[]>('/exchangeRates')
    
    rates.value = response.data;
    currencies.value = [...new Set(response.data.map((rate: ExchangeInfo) => [rate.fromCurrency, rate.toCurrency]).flat())]

  } catch (error) {
    console.log("failed load", error)
  }


}

const exchange = () => {
  const nowRate = rates.value.find(
    (rate) => 
        rate.fromCurrency === form.value.fromCurrency &&
        rate.toCurrency === form.value.toCurrency
    )?.rate
    

  if (nowRate) {
    result.value = form.value.amount * nowRate
  } else {
    console.log("rate not found");
    result.value = null
  }

}

onMounted(fetchCurrencies)
</script>

<style scoped>
.exchange-form {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.center-button{
  display: flex;
  justify-content: center;
  align-items: center;
}

.result {
  margin-top: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: center;
  font-size: 18px;
}
</style>