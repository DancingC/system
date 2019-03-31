<template>
  <el-form
    :model="ruleForm2"
    status-icon
    :rules="rules2"
    ref="ruleForm2"
    label-width="80px"
    class="demo-ruleForm"
  >
    <el-form-item label="账号" prop="name">
      <el-input type="text" v-model="ruleForm2.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import user from '@/json/user'

export default {
  name: "login",
  data() {
    return {
      ruleForm2: {
        password: "",
        name: ""
      },
      rules2: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        name: [{ required: true, message: "请输入账号", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          user.forEach(function(index,item){
            if(_this.ruleForm2.name == index.name){
              if(_this.ruleForm2.password == index.password){
                _this.$router.push({ name: "主页面"});

                window.sessionStorage.setItem("quanxian",index.permission);
              }
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.demo-ruleForm{
  width: 300px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 30px 30px 0 0;
  border: 1px solid #ddd;
}
</style>

