<template>
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="县（市、区）">
        <el-select v-model="formInline.user.name" class="select_label">
          <el-option label="船山区" value="船山区"></el-option>
          <el-option label="蓬溪县" value="蓬溪县"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="formInline.user.proName" placeholder="项目名称"></el-input>
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
      <el-form-item label="待审核">
        <el-select v-model="formInline.user.name" class="select_label">
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
      <el-table-column prop="city" label="市（州）"></el-table-column>
      <el-table-column prop="area" label="县(市、区)"></el-table-column>
      <el-table-column prop="proName" label="项目名称"></el-table-column>
      <el-table-column label="现有工作基础">
        <el-table-column prop="cityFile" label="专家踏勘">
          <template slot-scope="scope">
            <el-checkbox v-model=" scope.row.takan "></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="IssuedCapital" label="勘察成果">
          <template slot-scope="scope">
            <el-checkbox v-model=" scope.row.kancha "></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="completeInvestment" label="设计成果">
          <template slot-scope="scope">
            <el-checkbox v-model=" scope.row.sheji "></el-checkbox>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="gs_capital" label="估算、概算审定资金（万）"></el-table-column>
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
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope" v-if="scope.row.state == 1">
          <el-button type="text" class="delete" @click="revocation(scope.$index, tableData)">撤销</el-button>
          <el-button @click="edit(scope.$index, scope.row)" type="text">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增项目弹框 -->
    <el-dialog class="addproject" :title="addproject[titlename]" :visible.sync="newAddproject">
      <el-form ref="popform" :rules="popformRules" :model="popform" label-width="120px" size="small">
        <el-row :gutter="10">
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
        <el-row :gutter="10" class="checboxBottom">
          <el-form-item label="现有工作基础">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-checkbox v-model="popform.takan">专家踏勘</el-checkbox>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-checkbox v-model="popform.kancha">勘查成果</el-checkbox>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-checkbox v-model="popform.sheji">设计成果</el-checkbox>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item label="申请资金(万)" prop="applyMoney">
          <el-input v-model="popform.applyMoney" placeholder="本次申请资金(万)"></el-input>
        </el-form-item>
        <el-row :gutter="10" class="textarea">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="popform.remark"></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <div class="dialog-footer">
            <el-button @click="newAddproject = false" size="small">取 消</el-button>
            <el-button type="primary" @click="getCheckbox('popform')" size="small">确 定</el-button>
          </div>
        </el-row>
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
var times = d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDate() < 10 ? "0" + (d.getDate()) : d.getDate())
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
          name: "",
          address: [],
          place: "",
          start_end_time: ""
        }
      },
      newAddproject: false,
      titlename: "",
      popform: {     //添加新项目字段集合
        date: "",
        city: "",
        county: "",
        proName: "",
        takan: "",
        kancha: "",
        sheji: "",
        applyMoney: "",
        remark: "",
        state:"0"
      },
      popformRules:{
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
      addproject: {
        popname: "新增项目",
        amend: "修改项目"
      },
      TimelinePop: false,
      timeLine: "",
      TimelineTitle: {
        detailTimeLine: "详情"
      },
      dialogVisible: false,
      tableData: [
        {
          date: "2019-03-10",
          city: "遂宁市",
          area: "船山区",
          proName: "蓬溪县天福镇安家沟村4社庙子后坡不稳定斜坡",
          gs_capital: "198.89",
          applyMoney: "198.89",
          takan: false,
          kancha: false,
          sheji: false,
          state: "1"
        },
        {
          date: "2019-03-10",
          city: "遂宁市",
          area: "船山区",
          proName: "蓬溪县天福镇安家沟村4社庙子后坡不稳定斜坡",
          gs_capital: "198.89",
          applyMoney: "198.89",
          takan: "",
          kancha: "",
          sheji: "",
          state: "0"
        }
      ]
    };
  },
  created(){
    this.popform.date = times
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
    getCheckbox(formName) {
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
    }
  }
};
</script>

<style>
.select_label {
  width: 120px;
}
.el-date-editor.el-input__inner.dateChecked {
  width: 230px;
}
.nopass {
  color: #f60;
}
.delete {
  color: #e6a23c;
}
.dialog-footer {
  text-align: center;
}
.addproject .textarea {
  margin: 0 !important;
}
.addproject .checboxBottom .el-form-item{
  margin-bottom: 10px;
  margin-top: -10px;
}
</style>
