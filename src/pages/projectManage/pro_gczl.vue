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
      <el-button type="primary" @click="newproject" size="mini">新增</el-button>
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
      <el-table-column prop="monitorTasks" label="完成投资(万)"></el-table-column>
      <el-table-column prop="sjjc_point" label="剩余资金(万)"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.$index, scope.row)" type="text">编辑</el-button>
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
      <el-form ref="popform" :model="popform" label-width="120px" size="small">
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
            <el-form-item label="灾种" prop="disasterType">
              <el-input v-model="popform.disasterType" placeholder="灾种"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="完成时限要求" prop="date">
              <el-date-picker
                v-model="popform.date"
                type="date"
                class="resetWidth"
                placeholder="选择日期"
              ></el-date-picker>
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
          <el-form ref="captialData" :model="captialData" label-width="120px" size="small">
            <el-row :gutter="10">
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="下达资金(万)" prop="xdzj">
                  <el-input v-model="captialData.xdzj" placeholder="下达资金(万)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="项目中标价格(万)" prop="xmzbjg">
                  <el-input v-model="captialData.xmzbjg" placeholder="项目中标价格(万)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="完成投资(万)" prop="wctz">
                  <el-input v-model="captialData.wctz" placeholder="完成投资(万)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="剩余资金(万)" prop="syzj">
                  <el-input v-model="captialData.syzj" placeholder="剩余资金(万)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="结余资金(万)" prop="jyzj">
                  <el-input v-model="captialData.jyzj" placeholder="结余资金(万)"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
        <el-row>
          <div class="dialog-footer">
            <el-button @click="newAddproject = false" size="small">取 消</el-button>
            <el-button type="primary" @click="getCheckbox('popform')" size="small">确 定</el-button>
          </div>
        </el-row>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
var d = new Date(new Date());
var times =
  d.getFullYear() +
  "-" +
  (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) +
  "-" +
  (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
//  + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

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
      permission: true, //权限字段，控制按钮隐藏/显示
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
        date: "",
        area: "",
        taskNum: "",
        zjly: ""
      },
      addproject: {
        popname: "新增项目",
        amend: "修改项目"
      },
      captialData: {
        xdzj: "",
        xmzbjg: "",
        wctz: "",
        syzj: "",
        jyzj: ""
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
          monitorTasks: "15",
          sjjc_point: "5",
          remark: ""
        }
      ],
      addHouseForm: {
        householdName: "",
        remark: ""
      },
      households: [
        {
          xdzj: "100",
          xmzbjg: "80",
          wctz: "50",
          syzj: "30",
          jyzj: "20"
        }
      ]
    };
  },
  created() {
    this.popform.date = times;
  },
  methods: {
    edit(index, row) {
      this.newAddproject = true;
      this.titlename = "amend";
    },
    newproject() {
      this.newAddproject = true;
      this.titlename = "popname";
    },
    clickStep(i) {
      if (i > 3) {
        this.active = i + 1;
      } else {
        this.active = i;
      }
    },
    shanchu(index, data) {
      data.splice(index, 1);
    },
    getCheckbox(formName) {
      //新增项目-确定
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
