<template>
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="newproject">新增</el-button>
    </el-form>

    <el-table :data="tableData" border style="width:100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="date" label="年份"></el-table-column>
      <el-table-column prop="area" label="区县"></el-table-column>
      <el-table-column prop="proName" label="项目名称"></el-table-column>
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
      <el-form
        ref="popform"
        :model="popform"
        label-width="120px"
        size="small"
      >
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="区县" prop="city">
              <el-select v-model="popform.city" class="resetWidth">
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
            <el-form-item label="灾种" prop="proName">
              <el-input v-model="popform.proName" placeholder="灾种"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="完成时限要求" prop="area">
              <el-date-picker v-model="popform.date" type="date" class="resetWidth" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <h2 class="h2">项目进度</h2>
        <el-row class="addPadding">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-radio v-model="radio" label="1">勘查阶段</el-radio>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-radio v-model="radio" label="2">施工图设计阶段</el-radio>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-radio v-model="radio" label="3">施工招投标阶段</el-radio>
          </el-col>
        </el-row>
        <el-row class="addPadding">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-radio v-model="radio" label="4">施工阶段</el-radio>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-radio v-model="radio" label="5">已竣工</el-radio>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-radio v-model="radio" label="6">已初验</el-radio>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-radio v-model="radio" label="7">以终验</el-radio>
          </el-col>
        </el-row>
        
        <el-row class="remove_newproject">
            <div class="addtables">
                <h2>资金使用情况统计</h2>
              <el-button type="primary" plain @click="addHouses" size="small">下达</el-button>
            </div>
          <el-table :data="households" show-summary border style="width: 100%" class="removeTable" size="mini">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="householdName" label="资金来源"></el-table-column>
            <el-table-column prop="householdName" label="下达文件"></el-table-column>
            <el-table-column prop="householdName" label="下达资金(万)"></el-table-column>
            <el-table-column prop="householdName" label="项目中标价格(万)"></el-table-column>
            <el-table-column prop="householdName" label="完成投资(万)"></el-table-column>
            <el-table-column prop="householdName" label="剩余资金(万)"></el-table-column>
            <el-table-column prop="householdName" label="结余资金(万)"></el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  class="pop_delete"
                  @click="bianji(scope.$index, households)"
                >编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
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
      radio:1,
      newAddproject: false,
      titlename: "",
      popform: {
        date: "",
        city: "",
        county: "",
        proName: "",
        type: [],
        applyMoney: "",
        remark: ""
      },
      addproject: {
        popname: "新增项目",
        amend: "修改项目"
      },
      lookHouseholds: false,
      houseename: "",
      householdsTitle: {
        detailTitle: "户数"
      },
      TimelinePop: false,
      timeLine: "",
      TimelineTitle: {
        detailTimeLine: "详情"
      },
      addHousesPop: false,
      addHousesName: "",
      addHousesTtile: {
        titlename: "添加户数"
      },
      tableData: [
        {
          area: "船山区",
          removehouse: "1",
          taskNum: "17",
          downMoney: "61",
          hushu: "1",
          num: "1",
          money: "4",
          remark: "贫困户3户",
          state: "0"
        },
        {
          area: "船山区",
          removehouse: "1",
          taskNum: "30",
          downMoney: "105",
          hushu: "15",
          num: "10",
          money: "35",
          remark: "新房未修建完成未验收",
          state: "1"
        }
      ],
      addHouseForm: {
        householdName: "",
        remark: ""
      },
      households: [
          {
              householdName:'1'
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
    addHouses() {
      //打开添加户数弹框
      this.addHousesPop = true;
      this.addHousesName = "titlename";
    },
    addHousesOk(formName) {
      //添加户数-确定
      let newObj = deepClone(this.addHouseForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.households.push(newObj); //将填写的户数插入到表格中
          this.$refs[formName].resetFields(); //清空输入框
          this.addHousesPop = false;
        } else {
          return false;
        }
      });
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
.remove_addproject .h2{
    margin-bottom: 15px;
}
.addtables {
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.resetWidth{
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
.addPadding{
    padding: 8px;
}
</style>
