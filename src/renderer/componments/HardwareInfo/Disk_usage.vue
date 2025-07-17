<template>
  <div class="All_information">
    <div class="background">
      <div class="disk_name_style">
        <div class="section">
          <h2 class="section-title">磁盘使用情况</h2>
          <table class="disk-info">
            <thead>
            <tr>
              <th>磁盘名称</th>
              <th>已用空间(GB)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="disk in diskUsage" :key="disk.name">
              <td class="label">{{ disk.name }}</td>
              <td class="value">{{ formatNumber(disk.used_space) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'

// 磁盘使用数据
const diskUsage = ref<Array<{name: string, used_space: number}>>([])

// 格式化数字，保留两位小数
const formatNumber = (num: number) => {
  if (num === undefined || num === null || isNaN(num)) return 'N/A'
  return num.toFixed(2)
}

// 获取磁盘数据
const fetchDiskData = async () => {
  try {
    const response = await axios.get('http://127.0.0.234:8081/info?disk_usage=true')

    if (response.data?.disk_usage) {
      diskUsage.value = response.data.disk_usage.map((disk: any) => ({
        name: disk.name || '未知磁盘',
        used_space: parseFloat(disk.used_space) || 0
      }))
    }
  } catch (error) {
    console.error('获取磁盘数据失败:', error)
    diskUsage.value = [
      { name: '数据加载失败', used_space: -1 }
    ]
  }
}

let timer: number

onMounted(() => {
  fetchDiskData()
  timer = setInterval(fetchDiskData, 3000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
/* 复用内存组件的样式，只做少量调整 */
.disk_name_style {
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

.disk-info {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: black;
  border-collapse: collapse;
  color: #fff;
  font-family: sans-serif;
  font-size: 16px;
}

.disk-info th,
.disk-info td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #333;
}

.disk-info .label {
  font-weight: normal;
  width: 40%;
}

.disk-info .value {
  width: 60%;
}
</style>
