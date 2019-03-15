<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="治理工程" name="first">
        <governance></governance>
    </el-tab-pane>
    <el-tab-pane label="排危除险" name="second">
        <removeDanger></removeDanger>
    </el-tab-pane>
    <el-tab-pane label="搬迁避让" name="third">
        <removal></removal>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import governance from './governance'
import removeDanger from './removeDanger'
import removal from './removal'
  export default {
    components:{
        governance,
        removeDanger,
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