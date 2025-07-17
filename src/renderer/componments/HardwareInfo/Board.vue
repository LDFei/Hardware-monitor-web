<template>
  <div class="All_information">
    <div class="background">
      <div class="board_name_style">
        <div class="information">
          <table class="board-info">
            <tbody>
            <tr>
              <td class="label">主板名称:</td>
              <td class="value">{{ boardData.name }}</td>
            </tr>
            <tr>
              <td class="label">主板序列号:</td>
              <td class="value">{{ boardData.sn }}</td>
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

const boardData = ref({
  name: '',
  sn: ''
})

const fetchBoardData = async () => {
  try {
    const response = await axios.get('http://127.0.0.234:8081/info?board=ture')
    console.log(response.data)
    if (response.data?.board) {
      boardData.value = response.data.board
    }
  } catch (error) {
    console.error('获取主板数据失败:', error)
    boardData.value = {
      name: '数据加载失败',
      sn: 'N/A'
    }
  }
}

let timer: number

onMounted(() => {
  fetchBoardData()
  setInterval(fetchBoardData, 3000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.board_name_style {
  color: #f2f2f2;
}

/* 复用之前的样式 */
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

.board-info {
  width: 100%;
  max-width: 400px;
  margin: 30px auto;
  background-color: black;
  border-collapse: collapse;
  color: #fff;
  font-family: sans-serif;
  font-size: 16px;
}

.board-info td {
  padding: 12px 15px;
  vertical-align: middle;
}

.board-info .label {
  font-weight: normal;
  text-align: right;
  padding-right: 30px;
  color: #4fc3f7; /* 浅蓝色标签 */
}

.board-info .value {
  width: 60%;
}

.board-info tr {
  height: 40px;
}

/* 下方白线 */
.board-info tr:not(:last-child) {
  border-bottom: 1px solid #333;
}
</style>
