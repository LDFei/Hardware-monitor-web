<template>
  <div class="status-container">
    <!-- 顶部标题和时间 -->
    <div class="status-header">
      <h1>状态概览</h1>
      <div class="time">{{ currentTime }}</div>
    </div>

    <!-- 核心指标环形图 -->
    <div class="core-metrics">
      <div class="metric-item">
        <div class="empty-circle">
          <span class="metric-percent">{{ cpuUsage }}%</span>
        </div>
        <div class="metric-label">CPU占用</div>
      </div>
      <div class="metric-item">
        <div class="empty-circle">
          <span class="metric-percent">{{ memoryUsage }}%</span>
        </div>
        <div class="metric-label">内存</div>
      </div>
      <div class="metric-item">
        <div class="empty-circle">
          <span class="metric-percent">{{ diskUsage }}%</span>
        </div>
        <div class="metric-label">硬盘占用</div>
      </div>
      <div class="metric-item">
        <div class="empty-circle">
          <span class="metric-percent">{{ gpuUsage }}%</span>
        </div>
        <div class="metric-label">GPU占用</div>
      </div>
    </div>

    <!-- 详细信息区域 -->
    <div class="detail-sections">
      <!-- CPU信息 -->
      <div class="detail-section">
        <h3>CPU信息</h3>
        <div class="detail-row">
          <span>温度</span>
          <span>{{ cpuTemp }} ℃</span>
        </div>
        <div class="detail-row">
          <span>频率</span>
          <span>{{ cpuFreq }} MHz</span>
        </div>
        <div class="detail-row">
          <span>功率</span>
          <span>{{ cpuPower }} W</span>
        </div>
        <div class="detail-row">
          <span>电压</span>
          <span>{{ cpuVoltage }} V</span>
        </div>
      </div>

      <!-- GPU信息 -->
      <div class="detail-section">
        <h3>GPU信息</h3>
        <div class="detail-row">
          <span>温度</span>
          <span>{{ gpuTemp }} ℃</span>
        </div>
        <div class="detail-row">
          <span>频率</span>
          <span>{{ gpuFreq }} MHz</span>
        </div>
        <div class="detail-row">
          <span>功率</span>
          <span>{{ gpuPower }} W</span>
        </div>
        <div class="detail-row">
          <span>型号</span>
          <span>{{ gpuName }}</span>
        </div>
      </div>

      <!-- 硬盘信息 -->
      <div class="detail-section">
        <h3>磁盘信息</h3>
        <div v-for="disk in diskInfo" :key="disk.name" class="detail-row">
          <span>{{ disk.name }}</span>
          <span>{{ disk.used_space }} GB</span>
        </div>
      </div>
    </div>

    <!-- 网络状态 -->
    <div class="network-status">
      <h3>网络状态</h3>
      <div class="network-row">
        <span>下载速度</span>
        <span>0 KB/s</span>
      </div>
      <div class="network-row">
        <span>上传速度</span>
        <span>0 KB/s</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'

// 状态数据
const cpuUsage = ref(0)
const memoryUsage = ref(0)
const diskUsage = ref(0)
const gpuUsage = ref(0)
const cpuTemp = ref(0)
const cpuFreq = ref(0)
const cpuPower = ref(0)
const cpuVoltage = ref(0)
const gpuTemp = ref(0)
const gpuFreq = ref(0)
const gpuPower = ref(0)
const gpuName = ref('')
const diskInfo = ref<Array<{name: string, used_space: number}>>([])

// 当前时间
const currentTime = computed(() => {
  const now = new Date()
  return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
})

// 计算CPU平均负载
const calculateCpuUsage = (loads: number[]) => {
  if (!loads || loads.length === 0) return 0
  return Math.round(loads.reduce((a, b) => a + b, 0) / loads.length)
}

// 计算CPU平均频率
const calculateCpuFreq = (clocks: number[]) => {
  if (!clocks || clocks.length === 0) return 0
  return Math.round(clocks.reduce((a, b) => a + b, 0) / clocks.length)
}

// 获取数据 (CPU/GPU/内存)
const fetchDynamicData = async () => {
  try {
    const response = await axios.get('http://127.0.0.234:8081/data')
    const data = response.data

    // CPU数据
    if (data.cpu) {
      cpuUsage.value = calculateCpuUsage(data.cpu.loads || [])
      cpuFreq.value = calculateCpuFreq(data.cpu.clocks || [])
      cpuPower.value = data.cpu.power || 0
      cpuVoltage.value = data.cpu.voltage || 0
      cpuTemp.value = 50 // 假设温度，实际API未提供
    }

    // GPU数据
    if (data.gpus && data.gpus.length > 0) {
      const gpu = data.gpus[0]
      gpuUsage.value = gpu.loads || 0
      gpuFreq.value = gpu.freq || 0
      gpuPower.value = gpu.power || 0
      gpuName.value = gpu.name || '未知'
      gpuTemp.value = 39 // 假设温度，实际API未提供
    }

    // 内存数据
    if (data.mem) {
      const total = (data.mem.used_size || 0) + (data.mem.free_size || 0)
      memoryUsage.value = total > 0 ? Math.round((data.mem.used_size / total) * 100) : 0
    }
  } catch (error) {
    console.error('获取动态数据失败:', error)
  }
}

// 获取静态数据 (磁盘/显示器/主板)
const fetchStaticData = async () => {
  try {
    const response = await axios.post('http://127.0.0.234:8081/info',
      ["disk_usage", "display", "board"],
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const data = response.data

    // 磁盘数据
    if (data.disk_usage) {
      diskInfo.value = data.disk_usage
      // 计算总磁盘使用率
      const totalSpace = diskInfo.value.reduce((sum, disk) => sum + disk.used_space, 0)
      diskUsage.value = Math.round(totalSpace / diskInfo.value.length)
    }

    // 其他数据可根据需要添加
  } catch (error) {
    console.error('获取静态数据失败:', error)
  }
}

// 统一获取数据
const fetchAllData = async () => {
  await Promise.all([
    fetchDynamicData(),
    fetchStaticData()
  ])
}

let timer: number

onMounted(() => {
  fetchAllData()
  setInterval(fetchAllData, 3000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
/* 保持之前的样式不变 */
.status-container {
  width: 100%;
  padding: 20% 60%;
  background-color: #1a1a1a;
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.status-header h1 {
  font-size: 24px;
  color: #fff;
  margin: 0;
  font-weight: normal;
}

.time {
  font-size: 18px;
  color: #aaa;
}

.core-metrics {
  display: flex;
  justify-content: flex-start;
  gap: 40px;
  margin-bottom: 30px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-circle {
  width: 80px;
  height: 80px;
  border: 3px solid #4fc3f7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}

.metric-percent {
  font-size: 18px;
  color: #fff;
}

.metric-label {
  font-size: 14px;
  color: #aaa;
}

.detail-sections {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.detail-section {
  flex: 1;
  min-width: 200px;
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 15px;
}

.detail-section h3 {
  color: #4fc3f7;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: normal;
  border-bottom: 1px solid #444;
  padding-bottom: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.network-status {
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 15px;
}

.network-status h3 {
  color: #4fc3f7;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: normal;
  border-bottom: 1px solid #444;
  padding-bottom: 8px;
}

.network-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}

.network-row:last-child {
  margin-bottom: 0;
}
</style>
