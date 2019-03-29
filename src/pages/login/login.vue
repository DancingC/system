<template>
    <el-button @click="content">登录页面</el-button>
</template>

<script>
export default {
    name: 'login',
    methods:{
        content(){
            this.$router.push({name:"主页面"})
        }
    }
}
</script>
