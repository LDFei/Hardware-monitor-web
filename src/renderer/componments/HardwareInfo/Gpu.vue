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
/* 整体容器 */
.All_information {
  flex: 1;
  padding: 30px 50px;
  background: transparent; /* 使用父容器的背景 */
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e6e8ef;
}

/* 卡片背景 */
.background {
  width: 100%;
  max-width: 800px;
  background: linear-gradient(135deg, #1e1e2f, #151521);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 标题和刷新按钮区域 */
.refresh-section {
  display: flex;
  justify-content: flex-end;
}

.refresh-btn {
  background: linear-gradient(135deg, #ff00cc, #7928ca);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(121, 40, 202, 0.4);
}

.refresh-btn:hover {
  background: linear-gradient(135deg, #7928ca, #ff00cc);
  transform: translateY(-1px);
}

.refresh-icon {
  margin-right: 6px;
  transition: transform 0.3s ease;
}

.refresh-btn:hover .refresh-icon {
  transform: rotate(180deg);
}

/* 表格样式 */
.gpu-info {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
}

.gpu-info td {
  padding: 14px 18px;
  font-size: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.gpu-info .label {
  text-align: right;
  color: #a8adbd;
  font-weight: 500;
  width: 40%;
}

.gpu-info .value {
  text-align: left;
  color: #e6e8ef;
  font-weight: 600;
}

/* GPU 标题行 */
.gpu-title {
  text-align: center;
  font-weight: 700;
  color: #ff79c6;
  font-size: 16px;
  padding: 12px;
  border-bottom: 2px solid #7928ca !important;
  background: rgba(255, 255, 255, 0.04);
}

/* 没有数据时 */
.no-gpu {
  text-align: center;
  color: #bbb;
  padding: 20px;
  font-size: 15px;
  font-style: italic;
}

</style>
