<template>
  <el-container>
    <div class="headerBar">
      <el-header class="header_title">项目管理系统
        <el-div class="headerBtn" v-model="isCollapse">
        <i @click="headerBtn" v-model="status" class="el-icon-menu"></i>
      </el-div>
      </el-header>
      
    </div>
    <navBar :datas="isCollapse" id="wakaka"></navBar>
    <el-main id="main_content">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import navBar from "@/components/navBar";
var set_navBar = navBar;

export default {
  name: "App",
  components: {
    navBar
  },
  data() {
    return {
      menuData: "",
      isCollapse: false,
      status:true
    };
  },
  methods: {
    headerBtn(){
      var leftBar = document.getElementById("main_content");
      this.isCollapse = this.status;

      if(this.status == false){
        this.status = true
        leftBar.style.marginLeft = '200px'
        leftBar.style.transition = '0.4s'
      }else{
        this.status = false;
        
        leftBar.style.marginLeft = '65px'
        leftBar.style.transition = '0.5s'
      }
    }
  }
};
</script>

<style>
.header_title {
  z-index: 100;
}
.headerBar .headerBtn {
  z-index: 101;
  position: relative;
}
body .el-table th.gutter {
  display: table-cell !important;
}
</style>
