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
            <el-checkbox v-model="checked">{{ scope.row.name }}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="IssuedCapital" label="方案编制审查">
          <template slot-scope="scope">
            <el-checkbox v-model="checked">{{ scope.row.name }}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="completeInvestment" label="设计成果审查">
          <template slot-scope="scope">
            <el-checkbox v-model="checked">{{ scope.row.name }}</el-checkbox>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="gs_capital" label="估算、概算审定资金（万）"></el-table-column>
      <el-table-column prop="sq_capital" label="本次申请资金（万）"></el-table-column>
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
      <el-table-column label="操作" width="90">
        <template slot-scope="scope" v-if="scope.row.state == 0">
          <el-button @click="audit(scope.$index, scope.row)" type="text">审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 审核弹框 -->
    <el-dialog class="addproject" :title="addproject[titlename]" :visible.sync="newAddproject" width="30%">
      <el-form ref="form" :model="popform" size="small">
        <el-row :gutter="10">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-radio v-model="popform.radio" label="1">同意</el-radio>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-radio v-model="popform.radio" label="2">不同意</el-radio>
            </el-col>
        </el-row>
        <el-row :gutter="10" class="auditPop">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="popform.remark"></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
        <div class="dialog-footer">
          <el-button @click="newAddproject = false" size="small">取 消</el-button>
          <el-button type="primary" @click="getCheckbox" size="small">确 定</el-button>
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
import noPassPop from '../../components/timeLine.vue'

export default {
  components:{
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
      popform: {
        city: "",
        county: "",
        proName: "",
        radio: "1",
        sheji: "",
        auditMoney:"",
        applyMoney: "",
        remark:""
      },
      addproject: {
        popname: "审核"
      },
      TimelinePop: false,
      timeLine: '',
      TimelineTitle: {
        detailTimeLine:'详情'
      },
      checked: "",
      tableData: [
        {
          date: "2019-03-10",
          city: "遂宁市",
          area: "船山区",
          proName: "蓬溪县天福镇安家沟村4社庙子后坡不稳定斜坡",
          gs_capital: "198.89",
          sq_capital: "198.89",
          state: "1"
        },
        {
          date: "2019-03-10",
          city: "遂宁市",
          area: "船山区",
          proName: "蓬溪县天福镇安家沟村4社庙子后坡不稳定斜坡",
          gs_capital: "198.89",
          sq_capital: "198.89",
          state: "0"
        }
      ]
    };
  },
  methods: {
    audit(index, row) {
      this.newAddproject = true;
      this.titlename = "popname";
    },
    nopass(index, row) {
      this.TimelinePop = true;
      this.timeLine = "detailTimeLine";
    },
    getCheckbox() {
      this.newAddproject = false;
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
.auditPop {
  margin-top: 10px;
}
.auditPop textarea{
  height: 150px;
}
.dialog-footer{
  text-align: center;
}
</style>
