<template>
  <div class="All_information">
    <div class="background">
      <div class="display_name_style">
        <div class="section">
          <h2 class="section-title">显示器信息</h2>
          <table class="display-info">
            <tbody>
            <tr v-for="(display, index) in displayData" :key="index">
              <td class="label">显示器 {{ index + 1 }}:</td>
              <td class="value">
                <table class="display-details">
                  <tr>
                    <td>分辨率:</td>
                    <td>{{ display.pixWidth }} × {{ display.pixHeight }}</td>
                  </tr>
                  <tr>
                    <td>刷新率:</td>
                    <td>{{ display.freq }} Hz</td>
                  </tr>
                  <tr>
                    <td>色彩深度:</td>
                    <td>{{ display.colorDepth }}</td>
                  </tr>
                </table>
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

interface DisplayInfo {
  pixWidth: number
  pixHeight: number
  freq: number
  colorDepth: string
}

const displayData = ref<DisplayInfo[]>([])

const fetchDisplayData = async () => {
  try {
    const response = await axios.get('http://127.0.0.234:8081/info?display=true')
    if (response.data?.display) {
      displayData.value = response.data.display.map((d: any) => ({
        pixWidth: Number(d.pixWidth) || 0,
        pixHeight: Number(d.pixHeight) || 0,
        freq: Number(d.freq) || 0,
        colorDepth: d.colorDepth || '未知'
      }))
    }
  } catch (error) {
    console.error('获取显示器数据失败:', error)
    displayData.value = [{
      pixWidth: -1,
      pixHeight: -1,
      freq: -1,
      colorDepth: '数据加载失败'
    }]
  }
}

let timer: number

onMounted(() => {
  fetchDisplayData()
  setInterval(fetchDisplayData, 3000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.display_name_style {
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

.display-info {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: black;
  border-collapse: collapse;
  color: #fff;
  font-family: sans-serif;
  font-size: 16px;
}

.display-info td {
  padding: 12px 15px;
  vertical-align: middle;
}

.display-info .label {
  font-weight: normal;
  text-align: right;
  padding-right: 30px;
  color: #4fc3f7;
  width: 30%;
}

.display-info .value {
  width: 70%;
}

.display-info tr:not(:last-child) {
  border-bottom: 1px solid #333;
}

.display-details {
  width: 100%;
  border-collapse: collapse;
}

.display-details td {
  padding: 6px 0;
  border: none;
}

.display-details td:first-child {
  color: #ff00ff;
  padding-right: 15px;
}
</style>
