<template>
  <el-container>
    <el-header>项目管理系统</el-header>
    <el-container>
      <el-aside class="nav-left" style="width:200px;">
        <el-menu
          :default-active="$router.path"
          class="mar-l el-menu-vertical-demo el-col el-menu"
          light
          router
        >
          <template v-for="item in $router.options.routes[0].children">
            <el-menu-item :index="item.path" :key="item.path">{{item.name}}</el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'App',
  watch: {
    beforeRouteUpdate (to, from) {
      console.log(to)
    }
  }
}
</script>

<style>
.el-menu {
  height: 100%;
  background: #e6e6e6;
}
</style>
