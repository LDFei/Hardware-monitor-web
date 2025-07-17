<template>
  <div class="All_information">
    <div class="background">
      <div class="cpu_name_style">
        <!-- 刷新按钮 -->
        <div class="refresh-section">
          <button class="refresh-btn" @click="handleRefresh">
            <span class="refresh-icon">↻</span> 刷新数据
          </button>
        </div>

        <div class="information">
          <table class="cpu-info">
            <caption>{{ cpuData.name }}</caption>
            <tbody>
            <tr>
              <td class="label">名称</td>
              <td class="value">1</td>
              <td class="label">核心数</td>
              <td class="value">{{ cpuData.cores || '未获取到数据' }}</td>
            </tr>
            <tr>
              <td class="label">线程数</td>
              <td class="value">{{ cpuData.threads || '未获取到数据' }}</td>
              <td class="label">处理器名称</td>
              <td class="value">{{ cpuData.name }}</td>
            </tr>
            <tr>
              <td class="label">CPU原始频率</td>
              <td colspan="3" class="value">{{ formatFrequency(cpuData.clocks) }} MHz</td>
            </tr>
            <tr>
              <td class="label">CPU ID</td>
              <td class="value">{{ cpuData.id || '未获取到数据' }}</td>
              <td class="label">CPU品牌名称</td>
              <td class="value">{{ cpuData.brand || cpuData.name }}</td>
            </tr>
            <tr>
              <td class="label">CPU厂商</td>
              <td class="value">{{ cpuData.manufacturer || '未获取到数据' }}</td>
              <td class="label">热设计功耗(TDP)</td>
              <td class="value">{{ formatNumber(cpuData.tdp) }} W</td>
            </tr>
            <tr>
              <td class="label">CPU平台</td>
              <td colspan="3" class="value">{{ cpuData.platform || '未获取到数据' }}</td>
            </tr>
            <tr>
              <td class="label">CPU核数</td>
              <td colspan="3" class="value">{{ cpuData.cores || '未获取到数据' }}</td>
            </tr>
            <!-- 添加电压和功率信息 -->
            <tr>
              <td class="label">CPU工作电压</td>
              <td colspan="3" class="value">{{ formatNumber(cpuData.voltage) }} V</td>
            </tr>
            <tr>
              <td class="label">CPU功率</td>
              <td colspan="3" class="value">{{ formatNumber(cpuData.power) }} W</td>
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

const cpuData = ref({
  name: '',
  power: 0,
  voltage: 0,
  clocks: [] as number[],
  cores: 0,
  threads: 0,
  id: '',
  brand: '',
  manufacturer: '',
  tdp: 0,
  platform: ''
})

// 格式化数字，保留两位小数
const formatNumber = (num: number) => {
  if (num === undefined || num === null) return 'N/A'
  return num.toFixed(2)
}

// 格式化频率数据
const formatFrequency = (clocks: number[]) => {
  if (!clocks || clocks.length === 0) return 'N/A'
  const avg = clocks.reduce((a, b) => a + b, 0) / clocks.length
  return formatNumber(avg)
}

const fetchCpuData = async () => {
  try {
    const response = await axios.get('http://127.0.0.234:8081/data')
    console.log(response.data)
    if (response.data?.cpu) {
      cpuData.value = {
        ...cpuData.value,
        ...response.data.cpu
      }
    }
  } catch (error) {
    console.error('获取CPU数据失败:', error)
    cpuData.value.name = '数据加载失败'
  }
}

// 手动刷新数据
const handleRefresh = async () => {
  await fetchCpuData()
}

let timer: number;

onMounted(() => {
  fetchCpuData();
  timer = setInterval(fetchCpuData, 3000);
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.cpu_name_style {
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

.cpu-info {
  width: 100%;
  max-width: 600px;
  margin: 30px auto;
  background-color: black;
  border-collapse: collapse;
  color: #fff;
  font-family: sans-serif;
  font-size: 16px;
  border-bottom: 1px solid #444
}

.cpu-info caption {
  color: #ff00ff; /* 粉色标题 */
  font-size: 18px;
  font-weight: bold;
  padding: 10px 0;
  text-align: center;
  border-bottom: 2px solid #ff00ff;
  margin-bottom: 10px;
}

.cpu-info td {
  padding: 10px 15px;
  vertical-align: middle;
}

.cpu-info .label {
  font-weight: normal;
  text-align: right;
  padding-right: 10px;
  color: #ff00ff; /* 粉色标签 */
  position: relative;
}

.cpu-info .label::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #ff00ff; /* 粉色小方块 */
  margin-right: 8px;
}

.cpu-info .value {
  text-align: left;
  padding-left: 10px;
}

.cpu-info tr {
  height: 40px;
}

.cpu-info tr:not(:last-child) {
  border-bottom: 1px solid #444; /* 较淡的分隔线 */
}
</style>
