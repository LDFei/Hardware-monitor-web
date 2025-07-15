<template>
  <div class="All_information">
    <div class="background">
      <div class="cpu_name_style">
        <div class="information">
          <div class="cpu_name">
            {{CPU_Name}}{{ cpuData.name || '加载中...' }}
          </div>
          <div class="cpu_power">
            {{CPU_Power}}{{cpuData.power}}W
          </div>
          <div class="cpu_voltage">
            {{CPU_Voltage}}{{cpuData.voltage }}V
          </div>
          <div class="cpu_loads">
            {{CPU_loads}}{{cpuData.loads}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import axios from 'axios'

const CPU_Name = ref('CPU名字:')
const CPU_Power = ref('CPU功率:')
const CPU_Voltage = ref('CPU工作电压:')
const CPU_Clocks = ref('CPU时钟频率:')
const CPU_loads = ref('CPU负载性能:')

const cpuData = ref({
  name: '',
  power: 0,
  voltage: 0,
  clocks: [] as number[],
  loads: [] as number[]
})

const fetchCpuData = async () => {
  try {
    const response = await axios.get('http://127.0.0.234:8081/data')
    console.log(response.data)
    if (response.data?.cpu) {
      cpuData.value = response.data.cpu
    }
  } catch (error) {
    console.error('获取CPU数据失败:', error)
    cpuData.value.name = '数据加载失败'
  }
}

let timer: number;

onMounted(() => {
  fetchCpuData();
  setInterval(fetchCpuData, 3000);
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.cpu_name_style {
  color: #f2f2f2;
}
/*cpu展示页面设计*/
.background {
  background-color: black;
  position: fixed;
  width: 70%;
  height: 80%;
  top: 10%;
  left: 23%;
}
/*大盒子的背景颜色*/
.All_information {
  background-color: #1f1f27;
  width: 100%;
  height: 100%;
}
/*cpu展示信息的字体样式*/
.information {
  color: #f2f2f2;
}
</style>
