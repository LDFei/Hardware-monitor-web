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
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useRouter } from 'vue-router'
const router=useRouter();
let Menu = ref([
  {
    name: 'CPU',
    isActive : true,
    id:0,
    path:"/hardwareInfo/cpu",
  },
  {
    name: 'GPU',
    isActive : false,
    id:1,
    path:"",
  },
  {
    name: '主板',
    isActive : false,
    id:2,
    path:"",
  },
  {
    name: '内存',
    isActive : false,
    id:3,
    path:"",
  },
  {
    name: '硬盘',
    isActive : false,
    id:4,
    path:"",
  },
  {
    name:'显示器',
    isActive : false,
    id:5,
    path:"",
  }
])
function switchbutton(menu:{
  name: string,isActive: boolean,path:string},j : number)
  {
      for(let i=0;i<Menu.value.length;i++)
      {
        Menu.value[i].isActive = false;
      }
      Menu.value[j].isActive = true;
      router.push(menu.path);
  }


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
  height: 16.67%;
  background: linear-gradient(135deg, #0b0d1c, #160b34);
  color: #f2f2f2;

  border: none;
}
/*点击按钮后按钮的样式*/
.buttonStyle.active{
  background: #fb00c5;
  border-radius: 10px 10px 10px 10px;
}
.buttons{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 8%;
}
</style>
