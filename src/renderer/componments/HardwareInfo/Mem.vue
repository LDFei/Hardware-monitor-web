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
        <div class="information">
          <table class="mem-info" v-if="dynamicMem">
            <tbody>
            <template v-for="(item, index) in dynamicMemRows" :key="index">
              <tr>
                <td class="label">{{ item.label }}</td>
                <td class="value">{{ item.value }}</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>

        <!-- 静态内存信息 -->
        <div class="information">
          <table class="mem-info" v-if="staticMem">
            <tbody>
            <tr>
              <td class="label">内存大小</td>
              <td class="value">{{ formatNumber(staticMem.size) }} GB</td>
            </tr>
            <tr>
              <td class="label">内存名称列表</td>
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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import axios from 'axios'

const dynamicMem = ref({
  used_size: 0,
  vmem_used_size: 0,
  free_size: 0,
  vmem_free_size: 0,
  clock: 0
})

const staticMem = ref({
  size: 0,
  names: [] as string[]
})

const staticDataLoaded = ref(false)

const formatNumber = (num: number) => {
  if (num === undefined || num === null || isNaN(num)) return 'N/A'
  return num.toFixed(2)
}

const fetchDynamicMemData = async () => {
  try {
    const res = await axios.get('http://127.0.0.234:8081/data')
    if (res.data?.mem) {
      dynamicMem.value = {
        used_size: parseFloat(res.data.mem.used_size) || 0,
        vmem_used_size: parseFloat(res.data.mem.vmem_used_size) || 0,
        free_size: parseFloat(res.data.mem.free_size) || 0,
        vmem_free_size: parseFloat(res.data.mem.vmem_free_size) || 0,
        clock: parseFloat(res.data.mem.clock) || 0
      }
    }
  } catch (err) {
    console.error(err)
  }
}

const fetchStaticMemData = async () => {
  if (staticDataLoaded.value) return
  try {
    const res = await axios.get('http://127.0.0.234:8081/info?memory=true')
    if (res.data?.memory) {
      staticMem.value = {
        size: parseFloat(res.data.memory.size) || 0,
        names: res.data.memory.names || []
      }
      staticDataLoaded.value = true
    }
  } catch (err) {
    console.error(err)
  }
}

const handleRefresh = async () => {
  await Promise.all([fetchDynamicMemData(), fetchStaticMemData()])
}

const dynamicMemRows = computed(() => [
  { label: '已用内存', value: `${formatNumber(dynamicMem.value.used_size)} GB` },
  { label: '虚拟内存已用', value: `${formatNumber(dynamicMem.value.vmem_used_size)} GB` },
  { label: '空闲内存', value: `${formatNumber(dynamicMem.value.free_size)} GB` },
  { label: '虚拟内存空闲', value: `${formatNumber(dynamicMem.value.vmem_free_size)} GB` },
  { label: '内存频率', value: `${formatNumber(dynamicMem.value.clock)} MHz` }
])

let timer: number

onMounted(() => {
  fetchDynamicMemData()
  fetchStaticMemData()
  timer = setInterval(fetchDynamicMemData, 3000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.All_information {
  flex: 1;
  padding: 30px 50px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e6e8ef;
}

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
  box-sizing: border-box;
}

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

.mem-info {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  table-layout: fixed;
}

.mem-info td {
  padding: 14px 18px;
  font-size: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  word-break: break-word;
}

.mem-info .label {
  text-align: right;
  color: #a8adbd;
  font-weight: 500;
  width: 40%;
}

.mem-info .value {
  text-align: left;
  color: #e6e8ef;
  font-weight: 600;
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
