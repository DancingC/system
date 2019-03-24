<template>
  <div class="nav-left">
    <el-menu
      :default-active="activePath"
      class="mar-l el-menu-vertical-demo el-col el-menu"
      light
      router
      @open="handleOpen" 
      :default-openeds="openeds"
      @close="handleClose" 
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title">项目储备库</span>
        </template>
        <template v-for="item in $router.options.routes[1].children" v-if="!item.hidden">
          <el-menu-item :index="item.path" :key="item.path">{{item.name}}</el-menu-item>
        </template>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title">项目管理</span>
        </template>
        <template v-for="item in $router.options.routes[2].children" v-if="!item.hidden">
          <el-menu-item :index="item.path" :key="item.path">{{item.name}}</el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navBar",
  props:['datas'],
  data () {
    return{
      openeds:[],
      activePath:'',
      isCollapse: this.datas
    }
  },
  watch:{
    datas(val){
      this.isCollapse = val
    }
  },
  created() {
    this.openeds = ['1','1-1'];
    this.activePath = window.location.pathname;
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      
    },
    kaiguan(value){
      console.log(value.isCollapse = true)
      // this.isCollapse = value;
    }
  }
};
</script>

<style>
.el-menu {
  height: 100%;
  background: #fff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
