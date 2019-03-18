<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="治理工程" name="first">
        <projectManagement></projectManagement>
    </el-tab-pane>
    <el-tab-pane label="排危除险" name="second">
        <eliminationDangers></eliminationDangers>
    </el-tab-pane>
    <el-tab-pane label="搬迁避让" name="third">
        <removal></removal>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import projectManagement from './projectManagement'
import eliminationDangers from './eliminationDangers'
import removal from './removal'
  export default {
    components:{
        projectManagement,
        eliminationDangers,
        removal
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>