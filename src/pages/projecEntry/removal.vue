<template>
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="县（市、区）">
        <el-select v-model="formInline.user.area" class="select_label">
          <el-option label="船山区" value="船山区"></el-option>
          <el-option label="蓬溪县" value="蓬溪县"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-form-item label="时间范围">
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
      <el-table-column prop="date" label="时间"></el-table-column>
      <el-table-column prop="city" label="市(州)"></el-table-column>
      <el-table-column prop="area" label="县(市、区)"></el-table-column>
      <el-table-column label="现有工作基础">
        <el-table-column label="调查评价">
          <template slot-scope="scope">
            <el-checkbox v-model=" scope.row.dcpj "></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="规划选址">
          <template slot-scope="scope">
            <el-checkbox v-model=" scope.row.ghxz "></el-checkbox>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="removehouse" label="搬迁户数">
        <template slot-scope="scope">
          <el-button type="text" @click="household">{{scope.row.removehouse}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="taskNum" label="估算、概算及审定资金（万）"></el-table-column>
      <el-table-column prop="applyMoney" label="本次申请资金（万）"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-button
            @click="nopass(scope.$index, scope.row)"
            v-if="scope.row.state == 1"
            type="text"
            class="nopass"
          >未通过</el-button>
          <el-button type="text" v-else>待审核</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope" v-if="scope.row.state == 1">
          <el-button type="text" class="delete" @click="revocation(scope.$index, tableData)">撤销</el-button>
          <el-button @click="edit(scope.$index, scope.row)" type="text">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增项目弹框 -->
    <el-dialog
      class="remove_addproject"
      :title="addproject[titlename]"
      :visible.sync="newAddproject"
    >
      <el-form ref="popform" :rules="popformRules" :model="popform" label-width="120px" size="small">
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="市（州）" prop="city">
              <el-select v-model="popform.city">
                <el-option label="船山区" value="船山区"></el-option>
                <el-option label="蓬溪县" value="蓬溪县"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="县（市、区）" prop="area">
              <el-select v-model="popform.area">
                <el-option label="船山区" value="船山区"></el-option>
                <el-option label="蓬溪县" value="蓬溪县"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="项目名称" prop="proName">
              <el-input v-model="popform.proName" placeholder="项目名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="checboxBottom">
          <el-form-item label="现有工作基础" prop="dcpj">
              <el-checkbox v-model="popform.dcpj">调查评价</el-checkbox>
              <el-checkbox v-model="popform.ghxz">规划选址</el-checkbox>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="申请资金(万)" prop="applyMoney">
            <el-input v-model="popform.applyMoney" placeholder="申请资金(万)"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="popform.remark"></el-input>
          </el-form-item>
        </el-row>
        <el-row class="remove_newproject">
          <el-form-item label="搬迁情况">
            <div class="addtables">
              <el-button type="primary" plain @click="addHouses" size="small">添加</el-button>
            </div>
          </el-form-item>
          <el-table :data="households" border style="width: 100%" class="removeTable" size="mini">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="householdName" label="户主" width="180"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <el-button type="text" size="small" class="pop_delete" @click.native.prevent="deleteRow(scope.$index, households)">删除</el-button>
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

    <!-- 户数弹框 -->
    <el-dialog
      class="addproject"
      :title="householdsTitle[houseename]"
      :visible.sync="lookHouseholds"
    >
      <el-table :data="households" border style="width: 100%" class="removeTable">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="householdName" label="户主" width="180"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 添加户数弹框 -->
    <el-dialog
      class="addproject"
      :title="addHousesTtile[addHousesName]"
      :visible.sync="addHousesPop"
      width="30%"
    >
      <el-form ref="addHouseForm" :rules="houseRules" :model="addHouseForm" size="small">
        <el-form-item label="户主" prop="householdName">
          <el-input v-model="addHouseForm.householdName"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addHouseForm.remark"></el-input>
        </el-form-item>
        <div class="dialog-footer">
          <el-button @click="addHousesPop = false" size="small">取 消</el-button>
          <el-button type="primary" @click="addHousesOk('addHouseForm')" size="small">确 定</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 未通过弹框 -->
    <el-dialog class="addproject" :title="TimelineTitle[timeLine]" :visible.sync="TimelinePop">
      <noPassPop></noPassPop>
    </el-dialog>
  </section>
</template>

<script>
import noPassPop from "../../components/timeLine.vue";
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
    return JSON.parse(JSON.stringify(obj))
}

export default {
  components: {
    noPassPop
  },
  data() {
    return {
      formInline: {
        user: {
          area: "",
          start_end_time:"",
          state:""
        }
      },
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
      popformRules:{     //验证规则
        city: [
          { required: true, message: '请选择市（州）', trigger: 'change' }
        ],
        area: [
          { required: true, message: '请选择县（市、区）', trigger: 'change' }
        ],
        proName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        applyMoney:[
          { required: true, message: '请输入申请资金', trigger: 'blur' }
        ]
      },
      houseRules:{
        householdName:[
          { required: true, message: '请输入户主', trigger: 'blur' }
        ]
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
      households: []
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
    nopass(index, row) {
      this.TimelinePop = true;
      this.timeLine = "detailTimeLine";
    },
    revocation(index, row){      //撤销
      this.$confirm('确定删除改项目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.splice(index, 1);     //从table中删除当前数据
        
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });          
      });
    },
    addHouses() {         //打开添加户数弹框
      this.addHousesPop = true;
      this.addHousesName = "titlename";
    },
    addHousesOk(formName) {       //添加户数-确定
      let newObj = deepClone(this.addHouseForm)
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.households.push(newObj)     //将填写的户数插入到表格中
          this.$refs[formName].resetFields();    //清空输入框
          this.addHousesPop = false;
        }else{
          return false;
        }
      })
    },
    getCheckbox(formName) {       //新增项目-确定
      let newObj = deepClone(this.popform);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tableData.push(newObj)
          this.newAddproject = false;
          this.$refs[formName].resetFields();    //清空输入框
        } else {
          return false;
        }
      });
    },
    household() {
      this.lookHouseholds = true;
      this.houseename = "detailTitle";
    },
    deleteRow(index, rows) {     //删除项目弹框中的搬迁情况表格中的数据
      rows.splice(index, 1);
    }
  }
};
</script>

<style>
.el-dialog__body{
  padding: 0 20px 20px 20px;
}
.addtables {
  float: right;
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
.remove_addproject .checboxBottom .el-form-item{
  margin-bottom: 10px;
  margin-top: -10px;
}
</style>
