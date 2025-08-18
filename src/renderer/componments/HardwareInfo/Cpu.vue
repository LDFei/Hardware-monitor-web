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
/* 整体容器 */
.All_information {
  left: 10%;
  height: 100%;
  width: 90%;
  display: flex;
  justify-content: center;
  padding: 30px 0;
  background: transparent;
  color: #e6e8ef;
  box-sizing: border-box;
}

/* 卡片背景 */
.background {
  width: 90%;
  max-width: 900px;
  background: linear-gradient(135deg, #1e1e2f, #151521);
  border-radius: 20px;
  padding: 30px 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 25px;
  box-sizing: border-box;
}

/* 刷新按钮 */
.refresh-section {
  display: flex;
  justify-content: flex-end;
}

.refresh-btn {
  background: linear-gradient(135deg, #ff00cc, #7928ca);
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 6px 16px rgba(121, 40, 202, 0.4);
}

.refresh-btn:hover {
  background: linear-gradient(135deg, #7928ca, #ff00cc);
  transform: translateY(-2px);
}

.refresh-icon {
  margin-right: 6px;
  transition: transform 0.3s ease;
}

.refresh-btn:hover .refresh-icon {
  transform: rotate(180deg);
}

/* 表格样式 */
.cpu-info {
  width: 100%;
  border-collapse: separate;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.1);
  table-layout: fixed;
}

.cpu-info caption {
  text-align: center;
  font-weight: 700;
  color: #ff79c6;
  font-size: 18px;
  padding: 14px 0;
  border-bottom: 2px solid #7928ca;
  background: rgba(255, 255, 255, 0.05);
}

.cpu-info td {
  padding: 12px 15px;
  font-size: 15px;
  vertical-align: middle;
  word-break: break-word;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
}

.cpu-info tr td:first-child {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.cpu-info .label {
  text-align: right;
  color: #a8adbd;
  font-weight: 500;
  width: 35%;
  padding-right: 20px;
}

.cpu-info .value {
  text-align: left;
  color: #e6e8ef;
  font-weight: 600;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .background {
    padding: 20px 15px;
  }

  .cpu-info td {
    padding: 10px 8px;
  }

  .cpu-info .label {
    width: 40%;
    font-size: 14px;
  }

  .cpu-info .value {
    font-size: 14px;
  }
}


</style>
