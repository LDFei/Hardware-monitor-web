import { createRouter, createWebHistory } from 'vue-router'
import HardwareInfo from '../componments/HardwareInfo/HardwareInfo.vue'
import DeviceInformation from '../componments/DeviceInformation.vue'
import OverviewOfStatus from '../componments/OverviewOfStatus.vue'
import ThemeEditing from '../componments/ThemeEditing.vue'
import Cpu from '../componments/HardwareInfo/Cpu.vue'
import Gpu from '../componments/HardwareInfo/Gpu.vue'
import Mem from '../componments/HardwareInfo/Mem.vue'
import Board from '../componments/HardwareInfo/Board.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/hardwareInfo",
      component: HardwareInfo,
      children: [
        {
          path: "/hardwareInfo/cpu",
          component:Cpu,

        },
        {
          path: "/hardwareInfo/gpu",
          component:Gpu,
        },
        {
          path: "/hardwareInfo/mem",
          component:Mem,
        },
        {
          path: "/hardwareInfo/board",
          component:Board,
        }
      ]
    },
    {
      path:"/equipmentInformation",
      component:DeviceInformation
    },
    {
      path:"/overview",
      component: OverviewOfStatus
    },
    {
      path: "/themeEdit",
      component: ThemeEditing
    }
  ],
})

export default router
