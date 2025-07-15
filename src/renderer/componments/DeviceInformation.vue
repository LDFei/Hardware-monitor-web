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

/*小字体yong的格式样式*/
.yong{
  position: fixed;
  transform: rotate(90deg);
  height: 6%;
  top: 19%;
  left: 4%;
  color: #494949;
  font-size: small;
  font-weight: 600;
}
/*大字体YONG的格式样式*/
.Yong{
  position: fixed;
  transform: rotate(90deg);
  color: #494949;
  font-size: 70px;
  left: 7%;
  top: 14%;
  font-weight: 600;
}
/*我有我的YOUNG的样式设计*/
.myYoung{
  color: #f2f2f2;
  font-size: 75px;
  padding: 5.5% 2.5%;
  text-shadow: 0 2px 4px rgb(22, 11, 52); /* 轻微阴影增加立体感 */
  text-rendering: optimizeLegibility; /* 字体渲染优化 */
}
/*右上角盒子的背景和图片设计*/
.boxOftital{
  position: fixed;
  background-color: #6953ce;
  width: 82.5%;
  height: 35%;
  left: 17%;
  top: 4%;
}
/*设备列表的格式设计*/
.equipmentList{
  position: fixed;
  color: #f2f2f2;
  font-weight: 600;
  font-size: 26px;
  left: 11.5%;
  top: 38%;
}
/*控制面板的样式设计*/
.controlPanel{
  position: fixed;
  width: 85%;
  height: 30%;
  background-color: #131521;
  top: 44%;
  left: 12.5%;

}
/*电脑型号模块设计*/
.panelHeader_Model{
  color: #f2f2f2;
  font-size: 20px;
  font-weight: 600;
  padding: 1% 1%;
  width: 13%;
  height: 10%;
}

/*电脑分辨率模块设计*/
.panelHeader_Timing{
  position: fixed;
  color: #f2f2f2;
  top: 47%;
  left: 28%;
}

/*可控白线*/
.white-line
{
  height: 0.5px;
  background: #272b37;
  margin: 1px 0; /* 控制间距 */

}
</style>
