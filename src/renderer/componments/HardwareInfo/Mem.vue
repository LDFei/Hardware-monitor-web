<template>
  <div class="All_information">
    <div class="background">
      <div class="mem_name_style">
        <!-- 动态内存信息 -->
        <div class="section">
          <h2 class="section-title">内存信息</h2>
          <table class="mem-info">
            <tbody>
            <tr>
              <td class="label">已用内存:</td>
              <td class="value">{{ formatNumber(dynamicMem.used_size) }} GB</td>
            </tr>
            <tr>
              <td class="label">虚拟内存已用:</td>
              <td class="value">{{ formatNumber(dynamicMem.vmem_used_size) }} GB</td>
            </tr>
            <tr>
              <td class="label">空闲内存:</td>
              <td class="value">{{ formatNumber(dynamicMem.free_size) }} GB</td>
            </tr>
            <tr>
              <td class="label">虚拟内存空闲:</td>
              <td class="value">{{ formatNumber(dynamicMem.vmem_free_size) }} GB</td>
            </tr>
            <tr>
              <td class="label">内存频率:</td>
              <td class="value">{{ formatNumber(dynamicMem.clock) }} MHz</td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- 静态内存信息 -->
        <div class="section">
          <table class="mem-info">
            <tbody>
            <tr>
              <td class="label">内存大小:</td>
              <td class="value">{{ formatNumber(staticMem.size) }} GB</td>
            </tr>
            <tr>
              <td class="label">内存名称列表:</td>
              <td class="value">
                <ul class="name-list">
                  <li v-for="(name, index) in staticMem.names" :key="index">{{ name }}</li>
                </ul>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import axios from 'axios'

// 动态内存数据
const dynamicMem = ref({
  used_size: 0,
  vmem_used_size: 0,
  free_size: 0,
  vmem_free_size: 0,
  clock: 0
})

// 静态内存数据
const staticMem = ref({
  size: 0,
  names: [] as string[]
})

// 格式化数字，保留两位小数
const formatNumber = (num: number) => {
  if (num === undefined || num === null || isNaN(num)) return 'N/A'
  return num.toFixed(2)
}

// 获取动态内存数据 (GET请求)
const fetchDynamicMemData = async () => {
  try {
    const response = await axios.get('http://127.0.0.234:8081/data')
    if (response.data?.mem) {
      dynamicMem.value = {
        used_size: parseFloat(response.data.mem.used_size) || 0,
        vmem_used_size: parseFloat(response.data.mem.vmem_used_size) || 0,
        free_size: parseFloat(response.data.mem.free_size) || 0,
        vmem_free_size: parseFloat(response.data.mem.vmem_free_size) || 0,
        clock: parseFloat(response.data.mem.clock) || 0
      }
    }
  } catch (error) {
    console.error('获取动态内存数据失败:', error)
    dynamicMem.value = {
      used_size: -1,
      vmem_used_size: -1,
      free_size: -1,
      vmem_free_size: -1,
      clock: -1
    }
  }
}

// 获取静态内存数据 (POST请求)
const fetchStaticMemData = async () => {
  try {
    const response = await axios.get('http://127.0.0.234:8081/info?memory=true')
    if (response.data?.memory) {
      staticMem.value = {
        size: parseFloat(response.data.memory.size) || 0,
        names: response.data.memory.names || []
      }
    }
  }
catch (error) {
    console.error('获取静态内存数据失败:', error)
    staticMem.value = {
      size: -1,
      names: ['数据加载失败']
    }
  }
}

// 统一获取数据
const fetchAllMemData = async () => {
  await Promise.all([
    fetchDynamicMemData(),
    fetchStaticMemData()
  ])
}

let timer: number

onMounted(() => {
  fetchAllMemData()
  timer = setInterval(fetchAllMemData, 3000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.mem_name_style {
  color: #f2f2f2;
  padding: 20px;
}

.background {
  background-color: black;
  position: fixed;
  width: 70%;
  height: 80%;
  top: 10%;
  left: 23%;
  overflow-y: auto;
}

.All_information {
  background-color: #1f1f27;
  width: 100%;
  height: 100%;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  color: #4fc3f7;
  margin-bottom: 15px;
  font-size: 18px;
  border-bottom: 1px solid #4fc3f7;
  padding-bottom: 5px;
}

.mem-info {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: black;
  border-collapse: collapse;
  color: #fff;
  font-family: sans-serif;
  font-size: 16px;
  border-bottom: 1px solid #333;
}

.mem-info td {
  padding: 12px 15px;
  vertical-align: middle;
}

.mem-info .label {
  font-weight: normal;
  text-align: right;
  padding-right: 30px;
  white-space: nowrap;
  border-bottom: 1px solid #333;
}

.mem-info .value {
  width: 60%;
}

.mem-info tr {
  height: auto;
}

.mem-info tr:not(:last-child) {
  border-bottom: 1px solid #333;
}

.name-list {
  margin: 0;
  padding-left: 20px;
}

.name-list li {
  margin-bottom: 5px;
  word-break: break-all;
}
</style>
