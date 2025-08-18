<template>
  <!--整体的盒子-->
  <div class="All">
    <!--左侧目录菜单-->
    <div class="content">
      <div class="aigo">
        {{ aigo }}
      </div>
      <!--左侧四个菜单部分-->
      <button
        v-for="(buttonI,i) in buttonMenu"
        :key="buttonI.name"
        :class="{ active: buttonI.isActive }"
        class="buttonMenu"
        @click="switchbutton(buttonI,i)"
      >
        {{ buttonI.name }}
      </button>

      <!--下方设置部分-->
      <button
        class="buttonSetting"
        :class="{ active: buttonSetting.isActive }"
        @click="switchSettingbutton(buttonSetting.isActive)"
      >
        {{ buttonSetting.name }}
      </button>
    </div>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter} from 'vue-router';


const aigo=ref('aigo');
/*四个菜单部分*/
const buttonList={
  OVERVIEW: 0,
  HARDWARE_INFO: 1,
  DEVICE_INFO: 2,
  THEMES_EDIT:3
};

const buttonMenu=ref([
  { name: '状态概览', id: buttonList.OVERVIEW , path: "/overview", isActive: true},
  { name: '硬件信息', id: buttonList.HARDWARE_INFO, path: "/hardwareInfo", isActive: false},
  { name: '设备信息', id: buttonList.DEVICE_INFO, path: "/equipmentInformation", isActive: false},
  { name: '主题编辑', id: buttonList.THEMES_EDIT, path: "/themeEdit", isActive: false}
]);

const router=useRouter();
/*单独的设置部分*/
const buttonSetting=ref({name:'设置',isActive:false});
router.push("/overview");

function switchbutton(BI: { name:string, id: number, path: string, isActive: boolean}, i:number){
  for(let j=0;j<buttonMenu.value.length;j++){
    buttonMenu.value[j].isActive=false
  }
  buttonMenu.value[i].isActive=true;
  router.push(BI.path)
};

function switchSettingbutton(SI:any)
{
  buttonSetting.value.isActive = !SI
};

</script>

<style scoped>
/*左侧aigo文艺字体logo的样式*/
.aigo {
  font-size: 250%;
  color: white;
  padding: 7%;
  text-align: center;
  height: 20%;
  font-weight: 600;
}
/*整体的背景设计*/
.All {
  position: fixed;
  background-color: #000000;
  height: 100%;
  width: 100%;
  top: 0%;
  left: 0%;
  display: flex;
  flex-direction: row;
}
/*左侧整体目录的样式*/
.content {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 10%;
  background: linear-gradient(135deg, #0b0d1c, #160b34);
}

/*左侧四个菜单的样式*/
.buttonMenu {
  width: 100%;
  box-sizing: border-box; /* 包含padding和border在宽度内 */
  display: block; /* 块级元素默认横向撑满 */
  padding: 7% 30%; /* 保持内边距 */
  text-align: left;
  margin-top: 30%; /*与上一个模块的距离*/
  background: linear-gradient(135deg, #0b0d1c, #160b34);
  color: #f2f2f2;
  border: none;
}

/*按钮按下去后的颜色变化*/
button.active {
  background: #5c39df;
  font-weight: bold;
  border-radius: 0px 10px 10px 0px;
  width: 95%;
}
/*左侧设置菜单的单独样式*/
.buttonSetting {
  width: 100%;
  box-sizing: border-box; /* 包含padding和border在宽度内 */
  display: block; /* 块级元素默认横向撑满 */
  padding: 15% 35%; /* 保持内边距 */
  text-align: left;
  margin-top: 70%;
  background: linear-gradient(135deg, #0b0d1c, #160b34);

  border: none;
  color: #f2f2f2;
}
</style>
