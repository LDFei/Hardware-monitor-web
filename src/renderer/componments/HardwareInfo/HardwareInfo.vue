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
/* 整体布局容器 */
.all {
  position: fixed;
  left: 10%;
  height: 100%;
  width: 90%;
  background: linear-gradient(135deg, #1d1d25, #0f0f17);
  display: flex;
  flex-direction: row;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
}

/* 左侧按钮区域 */
.buttons {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 12%;
  background: #141421;
  padding: 10px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

/* 按钮默认样式 */
.buttonStyle {
  display: block;
  width: 100%;
  height: 80px;
  background: transparent;
  color: #d0d0d0;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

/* hover 效果 */
.buttonStyle:hover {
  background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0));
  color: #ffffff;
}

/* 激活状态 */
.buttonStyle.active {
  background: linear-gradient(135deg, #ff00cc, #7928ca);
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(255, 0, 204, 0.4);
  margin: 5px 8px;
}

/* 右侧内容区 router-view */
.all :deep(.router-view) {
  flex: 1;
  padding: 30px 90px;
  overflow-y: auto;
}
</style>

