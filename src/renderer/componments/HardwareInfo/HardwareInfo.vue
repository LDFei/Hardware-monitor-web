<template>
  <!-- 不变的目录 -->
  <div class="all">
    <div class="buttons">
      <button
        v-for="(MenuUnit,i) in Menu"
        class="buttonStyle"
        :class="{ active: MenuUnit.isActive }"
        :key="MenuUnit.name"
        @click="switchbutton(MenuUnit,i)"
      >
        {{ MenuUnit.name }}
      </button>
    </div>
    <router-view>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

let Menu = ref([
  {
    name: 'CPU',
    isActive: false,
    id: 0,
    path: "/hardwareInfo/cpu",
  },
  {
    name: 'GPU',
    isActive: false,
    id: 1,
    path: "/hardwareInfo/gpu",
  },
  {
    name: '内存',
    isActive: false,
    id: 3,
    path: "/hardwareInfo/mem",
  }
])

// 初始化激活状态
const initActiveMenu = () => {
  const currentPath = route.path
  Menu.value.forEach(item => {
    item.isActive = currentPath.startsWith(item.path)
  })

  // 如果没有任何激活项，默认激活第一个
  if (!Menu.value.some(item => item.isActive) && Menu.value.length > 0) {
    Menu.value[0].isActive = true
    router.push(Menu.value[0].path)
  }
}

const switchbutton = (menu: { name: string, isActive: boolean, path: string }, j: number) => {
  Menu.value.forEach((item, i) => {
    item.isActive = i === j
  })
  router.push(menu.path)
}

// 组件挂载时初始化
onMounted(() => {
  initActiveMenu()
})

</script>

<style scoped>
/*最外层的盒子的样式设计*/
.all {
  position: fixed;
  top: 5%;
  left: 15%;
  height: 90%;
  width: 80%;
  background-color: #1d1d25;
  display: flex;
  flex-direction: row;
}

/*按钮的风格样式和格式设计*/
.buttonStyle {
  display: block;
  width: 100%;
  height: 33.3%;
  background: linear-gradient(135deg, #0b0d1c, #160b34);
  color: #f2f2f2;
  border: none;
  transition: all 0.3s ease;
}

/*点击按钮后按钮的样式*/
.buttonStyle.active {
  background: #fb00c5;
  border-radius: 10px 10px 10px 10px;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 8%;
}
</style>
