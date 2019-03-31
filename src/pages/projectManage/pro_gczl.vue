<template>
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item label="县（市、区）">
        <el-select v-model="formInline.user.area" class="select_label">
          <el-option label="船山区" value="船山区"></el-option>
          <el-option label="蓬溪县" value="蓬溪县"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="formInline.user.proName" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item label="年份">
          <el-date-picker
            v-model="formInline.user.start_end_time"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="dateChecked"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.user.state" class="select_label">
          <el-option label="待审核" value="待审核"></el-option>
          <el-option label="待审定" value="待审定"></el-option>
          <el-option label="待批复" value="待批复"></el-option>
          <el-option label="未通过" value="未通过"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" size="mini">查询</el-button>
      <el-button type="primary" @click="newproject" size="mini" v-if="permission == 'assign'">新增</el-button>
    </el-form>

    <el-table :data="tableData" border style="width:100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="date" label="年份"></el-table-column>
      <el-table-column prop="area" label="区县"></el-table-column>
      <el-table-column prop="proName" label="项目名称"></el-table-column>
      <el-table-column prop="hazardType" label="灾种"></el-table-column>
      <el-table-column prop="overDate" label="完成时限要求"></el-table-column>
      <el-table-column prop="downCapital" label="下达资金(万)"></el-table-column>
      <el-table-column prop="capitalSource" label="工程进度"></el-table-column>
      <el-table-column prop="completeInvestment" label="完成投资(万)"></el-table-column>
      <el-table-column prop="surplusCapital" label="剩余资金(万)"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.$index, scope.row)" type="text" v-if="permission == 'assign'">编辑</el-button>
          <el-button @click="sahnchu(scope.$index, scope.row, tableData)" type="text" v-if="permission == 'assign'">删除</el-button>
          <el-button @click="edit(scope.$index, scope.row)" type="text" v-if="permission == 'report'">编辑</el-button>
          <el-button @click="edit(scope.$index, scope.row)" type="text" v-if="permission == 'audit'">审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增项目弹框 -->
    <el-dialog
      class="remove_addproject"
      :title="addproject[titlename]"
      :visible.sync="newAddproject"
      width="80%"
    >
      <el-form ref="popform" :model="popform" label-width="120px" size="small" :disabled="shenhe">
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="区县" prop="area">
              <el-select v-model="popform.area" class="resetWidth">
                <el-option label="船山区" value="船山区"></el-option>
                <el-option label="蓬溪县" value="蓬溪县"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="项目名称" prop="proName">
              <el-input v-model="popform.proName" placeholder="项目名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="灾种" prop="hazardType">
              <el-input v-model="popform.hazardType" placeholder="灾种"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="完成时限要求" prop="overDate">
              <el-date-picker
                v-model="popform.overDate"
                type="date"
                class="resetWidth"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="popform.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h2 class="h2">项目进度</h2>
        <el-steps :active="active" finish-status="success" align-center class="stepsFont">
          <el-step
            v-for="(item, index) in stepData"
            :key="index"
            :title="item"
            @click.native="clickStep(index)"
          ></el-step>
        </el-steps>

        <el-row class="remove_newproject">
          <div class="addtables">
            <h2>资金使用情况统计</h2>
          </div>
            <el-row :gutter="10">
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="下达资金(万)" prop="downCapital">
                  <el-input v-model="popform.downCapital" placeholder="下达资金(万)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="项目中标价格(万)" prop="xmzbjg">
                  <el-input v-model="popform.xmzbjg" placeholder="项目中标价格(万)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="完成投资(万)" prop="completeInvestment">
                  <el-input v-model="popform.completeInvestment" placeholder="完成投资(万)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="剩余资金(万)" prop="surplusCapital">
                  <el-input v-model="popform.surplusCapital" placeholder="剩余资金(万)" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="结余资金(万)" prop="jyzj">
                  <el-input v-model="popform.jyzj" placeholder="结余资金(万)" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
        </el-row>
      </el-form>
      <el-row>
          <div class="dialog-footer">
            <el-button @click="newAddproject = false" size="small">取 消</el-button>
            <el-button type="primary" @click="getCheckbox('popform')" size="small">确 定</el-button>
          </div>
        </el-row>
    </el-dialog>
  </section>
</template>

<script>
var d = new Date(new Date());
var times = d.getFullYear()


//深拷贝对象
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default {
  data() {
    return {
      formInline: {
        user: {
          area: "",
          start_end_time: "",
          state: ""
        }
      },
      permission: "assign", //权限字段，控制按钮隐藏/显示
      stepData: [
        "勘察阶段",
        "施工图设计阶段",
        "施工招投标阶段",
        "施工阶段",
        "已竣工",
        "已初验",
        "已终验"
      ],
      active: 0, //步骤条
      radio: 1,
      newAddproject: false,
      titlename: "",
      popform: {
        overDate: "",
        area: "",
        hazardType: "",
        date: "",
        downCapital: "",
        xmzbjg: "",
        capitalSource:"",
        completeInvestment: "",
        surplusCapital: "",
        jyzj: "",
        remark:""
      },
      addproject: {
        popname: "新增项目",
        amend: "修改项目"
      },
      tableData: [
        {
          date: "2019-03-20",
          area: "船山区",
          proName: "遂宁市蓬溪县大石镇大福村3组偏马山危岩治理工程",
          hazardType: "危岩",
          overDate: "2019-03-30",
          downCapital: "20",
          capitalSource: "施工阶段",
          completeInvestment: "15",
          surplusCapital: "5",
          remark: ""
        }
      ],
      addHouseForm: {
        householdName: "",
        remark: ""
      },
      tableIindex:'',    //编辑当前table的下标
      shenhe:false
    };
  },
  watch:{
    xdValue(val, oldVal){
      // 计算剩余资金
      var syzj = this.popform.completeInvestment?Number(val) - Number(this.popform.completeInvestment):Number(val);
      this.popform.surplusCapital = syzj;
      // 计算结余资金
      var jyzj = this.popform.xmzbjg?Number(val) - Number(this.popform.xmzbjg):Number(val);
      if(this.popform.xmzbjg == undefined || this.popform.xmzbjg == ''){
        this.popform.jyzj = '';
      }else{
        this.popform.jyzj = jyzj;
      }
    },
    wcValue(val, oldVal){
      var syzj = this.popform.downCapital?Number(this.popform.downCapital) - Number(val):Number(this.popform.downCapital);
      this.popform.surplusCapital = syzj;
    },
    // 计算结余资金
    jyValue(val, oldVal){
      var jyzj = this.popform.downCapital?Number(this.popform.downCapital) - Number(val):Number(this.popform.downCapital);
      if(val == undefined || this.popform.xmzbjg == ''){
        this.popform.jyzj = '';
      }else{
        this.popform.jyzj = jyzj;
      }
    }
  },
  computed: {
    // 计算剩余资金
  　　xdValue() {
  　　　　return this.popform.downCapital
  　　},
      wcValue() {
  　　　　return this.popform.completeInvestment
  　　},
    // 计算结余资金
      jyValue() {
  　　　　return this.popform.xmzbjg
  　　}
  },
  created() {
    this.popform.date = times;
    var quanxian = window.sessionStorage.getItem("quanxian");
    if(quanxian != null){
      this.permission = quanxian;
    }
  },
  methods: {
    edit(index, row) {
      this.newAddproject = true;
      this.titlename = "amend";
      this.popform = row;
      this.tableIindex = index;

      if(this.permission == "audit"){
        this.shenhe = true;
      }
    },
    newproject() {
      this.newAddproject = true;
      this.titlename = "popname";
    },
    clickStep(i) {
      // if (i > 3) {
      //   this.active = i + 1;
      // } else {
        this.active = i;
        this.popform.capitalSource = this.stepData[i];
      // }
    },
    shanchu(index, data) {
      data.splice(index, 1);
    },
    getCheckbox(formName) {
      switch(this.permission)
      {
        case "assign":
        //新增项目-确定
        if(this.titlename == "popname"){
          let newObj = deepClone(this.popform);
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.tableData.push(newObj);
              this.newAddproject = false;
              this.$refs[formName].resetFields(); //清空输入框
            } else {
              return false;
            }
          });
        }else if(this.titlename == "amend"){     //修改项目-确定
          this.tableData[this.tableIindex] = this.popform;
          this.newAddproject = false;
        }
        break;

        case "audit":
        //审核        
        this.newAddproject = false;
        this.$message({message:"审核通过！", type:"success"})
      }
    },
    sahnchu(index, rows, data){
      if(rows.completeInvestment != ""){
        this.$message({message:'该项目已完成投资，不能删除！', type:'warning'})
      }else{
          data.splice(index, 1);
      }
    }
  }
};
</script>

<style>
.el-date-editor.el-input__inner.dateChecked {
  width: 230px;
}
.el-dialog__body {
  padding: 0 20px 20px 20px;
}
.remove_addproject .h2 {
  margin-bottom: 15px;
}
.addtables {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}
.resetWidth {
  width: 100% !important;
}
.removeTable {
  margin-bottom: 22px;
}
.remove_addproject .el-form-item {
  margin-bottom: 22px;
}
.remove_newproject label {
  text-align: left;
}
.remove_addproject .checboxBottom .el-form-item {
  margin-bottom: 10px;
  margin-top: -10px;
}
.select_label {
  width: 120px;
}
.stepsFont .el-step__title {
  font-size: 14px;
}
.dialog-footer {
  text-align: center;
}
</style>
