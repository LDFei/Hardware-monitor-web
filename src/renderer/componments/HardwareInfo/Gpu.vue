<template>
  <div class="All_information">
    <div class="background">
      <div class="gpu_name_style">
        <!-- 刷新按钮 -->
        <div class="refresh-section">
          <button class="refresh-btn" @click="handleRefresh">
            <span class="refresh-icon">↻</span> 刷新数据
          </button>
        </div>

        <div class="information">
          <table class="gpu-info" v-if="gpuData.length > 0">
            <tbody>
            <template v-for="(gpu, index) in gpuData" :key="index">
              <tr>
                <td colspan="2" class="gpu-title">GPU {{ index + 1 }}</td>
              </tr>
              <tr>
                <td class="label">{{ GPU_Name }}</td>
                <td class="value">{{ gpu.name }}</td>
              </tr>
              <tr>
                <td class="label">{{ GPU_Power }}</td>
                <td class="value">{{ formatNumber(gpu.power) }}W</td>
              </tr>
              <tr>
                <td class="label">{{ GPU_Freq }}</td>
                <td class="value">{{ formatNumber(gpu.freq) }}MHz</td>
              </tr>
              <tr>
                <td class="label">{{ GPU_Loads }}</td>
                <td class="value">{{ formatNumber(gpu.loads) }}%</td>
              </tr>
            </template>
            </tbody>
          </table>
          <div v-else class="no-gpu">
            {{ noGPUDataMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import axios from 'axios'

const GPU_Name = ref('GPU名字:')
const GPU_Power = ref('GPU功率:')
const GPU_Freq = ref('GPU频率:')
const GPU_Loads = ref('GPU负载:')
const noGPUDataMessage = ref('正在加载GPU数据...')

const gpuData = ref<Array<{
  name: string
  power: number
  freq: number
  loads: number
}>>([])

// 格式化数字，保留两位小数
const formatNumber = (num: number) => {
  if (num === undefined || num === null || isNaN(num)) return 'N/A'
  return num.toFixed(2)
}

const fetchGpuData = async () => {
  try {
    const response = await axios.get('http://127.0.0.234:8081/data')
    console.log(response.data)
    if (response.data?.gpus) {
      gpuData.value = response.data.gpus.map(gpu => ({
        name: gpu.name || '未知GPU',
        power: parseFloat(gpu.power) || 0,
        freq: parseFloat(gpu.freq) || 0,
        loads: parseFloat(gpu.loads) || 0
      }))

      if (gpuData.value.length === 0) {
        noGPUDataMessage.value = '未检测到GPU设备'
      }
    }
  } catch (error) {
    console.error('获取GPU数据失败:', error)
    noGPUDataMessage.value = 'GPU数据加载失败'
    gpuData.value = []
  }
}

// 手动刷新数据
const handleRefresh = async () => {
  await fetchGpuData()
}

let timer: number

onMounted(() => {
  fetchGpuData()
  timer = setInterval(fetchGpuData, 3000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.gpu_name_style {
  color: #f2f2f2;
}

.background {
  background-color: black;
  position: fixed;
  width: 70%;
  height: 80%;
  top: 10%;
  left: 23%;
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

.gpu-info {
  width: 100%;
  padding: 25% 25%;
  max-width: 500px;
  margin: 30px auto;
  background-color: black;
  border-collapse: collapse;
  color: #fff;
  font-family: sans-serif;
  font-size: 16px;
  border-bottom: 1px solid white;
}

.gpu-info td {
  padding: 3% 2%;
  vertical-align: middle;
}

.gpu-info .label {
  font-weight: normal;
  text-align: right;
  padding-right: 30px;
}

.gpu-info .value {
  width: 60%;
}

.gpu-info tr {
  height: 40px;
}

/* 下方白线 */
.gpu-info tr:not(:last-child) {
  border-bottom: 1px solid white;
}

/* GPU标题样式 */
.gpu-title {
  font-weight: bold;
  color: #4fc3f7;
  text-align: center;
  padding-top: 15px;
  border-bottom: 2px solid #4fc3f7 !important;
}

.no-gpu {
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 16px;
}
</style>
