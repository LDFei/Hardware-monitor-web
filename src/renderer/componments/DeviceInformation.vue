<script setup lang="ts">
import { ref } from 'vue'
/*小字体///young*/
const young=ref('/// YOUNG /// YOUNG //// YOUNG ////');

/*大字体YOUNG*/
const Young=ref("YOUNG");

/*我有我的YOUNG*/
const myYoung=ref('我有我的YOUNG');

/*equipmentList的字段*/
const equipmentList=ref('设备列表');


/*电脑型号字段*/
const  panelHeader_Model=ref('星璨 大岚 屏显版');

/*电脑分辨率字段*/
const  panelHeader_Timing=ref('分辨率: 1920*462');

</script>

<template>
  <!--右上方图片展示-->
  <div>
    <!--小字Young-->
    <div
      class="yong"
    >
      {{young}}
    </div>
    <!--Young字样-->
    <div
      class="Yong">
      {{Young}}
    </div>
    <!--图片标题展示盒子-->
    <div
      class="boxOftital">

      <!--三个图标-->
      <div>

      </div>

      <!--我有我的YOUNG-->
      <div
        CLASS="myYoung">
        {{myYoung}}
      </div>

      <!--图片的插入-->
      <div>

      </div>

    </div>
  </div>

  <!--设备列表-->
  <div
    class="equipmentList">
    {{equipmentList}}
  </div>

  <!--控制面板-->
  <div
    class="controlPanel">
    <!--面板表头信息-->
    <div
      class="panelHeader_Model"
    >
      {{panelHeader_Model}}
    </div>
    <div
      class="panelHeader_Timing"
    >
      {{panelHeader_Timing}}

    </div>
    <div class="white-line"></div>
  </div>

</template>

<style scoped>
/* 小字体yong */
.yong {
  position: fixed;
  transform: rotate(90deg);
  height: 6%;
  top: 17%;
  left: 2%;
  color: #7f8c8d;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  opacity: 0.8;
}

/* 大字体YOUNG */
.Yong {
  position: fixed;
  transform: rotate(90deg);
  color: #e0e0e0;
  font-size: 70px;
  left: 6%;
  top: 14%;
  font-weight: 700;
  letter-spacing: 3px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

/* 我有我的YOUNG */
.myYoung {
  color: #ffffff;
  font-size: 64px;
  font-weight: 700;
  padding: 6% 3%;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
  line-height: 1.2;
  animation: fadeInUp 1.2s ease; /* 动画效果 */
}

/* 右上角标题盒子 */
.boxOftital {
  position: fixed;
  background: linear-gradient(135deg, #6c63ff, #3a2fa0);
  width: 82.5%;
  height: 35%;
  left: 17%;
  top: 4%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

/* 设备列表 */
.equipmentList {
  position: fixed;
  color: #f9f9f9;
  font-weight: 600;
  font-size: 26px;
  left: 11.5%;
  top: 38%;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
}

/* 控制面板 */
.controlPanel {
  position: fixed;
  width: 85%;
  height: 30%;
  background: #1e2132;
  top: 44%;
  left: 12.5%;
  border-radius: 16px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.35);
  padding: 20px;
}

/* 电脑型号 */
.panelHeader_Model {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  padding: 5px 10px;
  background: linear-gradient(90deg, #3a3f5c, #2c2f45);
  border-radius: 8px;
  display: inline-block;
}

/* 分辨率 */
.panelHeader_Timing {
  position: fixed;
  color: #cfd8dc;
  top: 47%;
  left: 28%;
  font-size: 16px;
  letter-spacing: 1px;
}

/* 白线 */
.white-line {
  height: 1px;
  background: #2f3549;
  margin: 10px 0;
  border-radius: 2px;
}

/* 动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

