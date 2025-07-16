<template>
  <div class="All_information">
    <div class="background">
      <div class="gpu_name_style">
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
                <td class="value">{{ gpu.power }}W</td>
              </tr>
              <tr>
                <td class="label">{{ GPU_Freq }}</td>
                <td class="value">{{ gpu.freq }}MHz</td>
              </tr>
              <tr>
                <td class="label">{{ GPU_Loads }}</td>
                <td class="value">{{ gpu.loads }}%</td>
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

const fetchGpuData = async () => {
  try {
    const response = await axios.get('http://127.0.0.234:8081/data')
    console.log(response.data)
    if (response.data?.gpus) {
      gpuData.value = response.data.gpus
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

let timer: number

onMounted(() => {
  fetchGpuData()
  setInterval(fetchGpuData, 3000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.gpu_name_style {
  color: #f2f2f2;
}

/* GPU展示页面设计 - 复用CPU的样式 */
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

.gpu-info {
  width: 100%;
  max-width: 400px;
  margin: 30px auto;
  background-color: black;
  border-collapse: collapse;
  color: #fff;
  font-family: sans-serif;
  font-size: 16px;
  border-bottom: 1px solid white;
}

.gpu-info td {
  padding: 4% 5%;
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
  color: #4fc3f7; /* 浅蓝色突出显示 */
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
