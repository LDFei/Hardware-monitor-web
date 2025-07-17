<template>
  <div class="All_information">
    <div class="background">
      <div class="mem_name_style">
        <!-- 刷新按钮 -->
        <div class="refresh-section">
          <button class="refresh-btn" @click="handleRefresh">
            <span class="refresh-icon">↻</span> 刷新数据
          </button>
        </div>

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

// 是否已加载静态数据
const staticDataLoaded = ref(false)

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

// 获取静态内存数据 (GET请求)
const fetchStaticMemData = async () => {
  if (staticDataLoaded.value) return // 如果已加载则不再获取

  try {
    const response = await axios.get('http://127.0.0.234:8081/info?memory=true')
    if (response.data?.memory) {
      staticMem.value = {
        size: parseFloat(response.data.memory.size) || 0,
        names: response.data.memory.names || []
      }
      staticDataLoaded.value = true
    }
  } catch (error) {
    console.error('获取静态内存数据失败:', error)
    staticMem.value = {
      size: -1,
      names: ['数据加载失败']
    }
  }
}

// 手动刷新数据
const handleRefresh = async () => {
  await Promise.all([
    fetchDynamicMemData(),
    fetchStaticMemData() // 手动刷新时也刷新静态数据
  ])
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
  // 只定时刷新动态数据
  setInterval(fetchDynamicMemData, 3000)
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

.refresh-section {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}

.refresh-btn {
  background: linear-gradient(135deg, #6a1b9a, #9c27b0);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.refresh-btn:hover {
  background: linear-gradient(135deg, #9c27b0, #6a1b9a);
}

.refresh-icon {
  margin-right: 5px;
  transition: transform 0.3s ease;
}

.refresh-btn:hover .refresh-icon {
  transform: rotate(180deg);
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
