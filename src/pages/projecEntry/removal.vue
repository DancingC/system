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
      <el-table-column prop="area" label="市(州)"></el-table-column>
      <el-table-column prop="area" label="县(市、区)"></el-table-column>
      <el-table-column label="现有工作基础">
        <el-table-column prop="num" label="调查评价"></el-table-column>
        <el-table-column prop="money" label="规划选址"></el-table-column>
      </el-table-column>
      <el-table-column prop="removehouse" label="搬迁户数">
        <template slot-scope="scope">
          <el-button type="text" @click="household">{{scope.row.removehouse}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="taskNum" label="估算、概算及审定资金（万）"></el-table-column>
      <el-table-column prop="downMoney" label="本次申请资金（万）"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-button
            @click="nopass(scope.$index, scope.row)"
            v-if="scope.row.state == 1"
            type="text"
            size="small"
            class="nopass"
          >未通过</el-button>
          <el-button type="text" size="small" v-else>待审核</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope" v-if="scope.row.state == 1">
          <el-button type="text" size="small" class="delete">撤销</el-button>
          <el-button @click="edit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增项目弹框 -->
    <el-dialog class="addproject" :title="addproject[titlename]" :visible.sync="newAddproject">
      <el-form ref="form" :model="popform" label-width="120px">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="市（州）">
              <el-select v-model="popform.city">
                <el-option label="船山区" value="船山区"></el-option>
                <el-option label="蓬溪县" value="蓬溪县"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="县（市、区）">
              <el-select v-model="popform.county">
                <el-option label="船山区" value="船山区"></el-option>
                <el-option label="蓬溪县" value="蓬溪县"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="项目名称">
              <el-input v-model="popform.proName" placeholder="项目名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="现有工作基础">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-checkbox v-model="popform.takan">调查评价</el-checkbox>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-checkbox v-model="popform.takan">规划选址</el-checkbox>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="审定资金(万)">
              <el-input v-model="popform.auditMoney" placeholder="审定资金(万)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="本次申请资金(万)">
              <el-input v-model="popform.applyMoney" placeholder="本次申请资金(万)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="popform.remark"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="搬迁情况">
            <div class="addtables">
              <el-button type="primary" plain>添加</el-button>
            </div>
          </el-form-item>
          <el-table :data="households" border style="width: 100%" class="removeTable">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="name" label="户主" width="180"></el-table-column>
            <el-table-column prop="popremark" label="备注"></el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <el-button type="text" size="small" class="pop_delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row :gutter="10">
          <div class="dialog-footer">
            <el-button @click="newAddproject = false">取 消</el-button>
            <el-button type="primary" @click="getCheckbox">确 定</el-button>
          </div>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 户数弹框 -->
    <el-dialog class="addproject" :title="householdsTitle[houseename]" :visible.sync="lookHouseholds">
      <el-table :data="households" border style="width: 100%" class="removeTable">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="name" label="户主" width="180"></el-table-column>
            <el-table-column prop="popremark" label="备注"></el-table-column>
          </el-table>
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
          name: ""
        }
      },
      newAddproject: false,
      titlename: "",
      popform: {
        city: "",
        county: "",
        proName: "",
        takan: "",
        kancha: "",
        sheji: "",
        auditMoney: "",
        applyMoney: "",
        remark: ""
      },
      addproject: {
        popname: "新增项目",
        amend: "修改项目"
      },
      lookHouseholds: false,
      houseename: '',
      householdsTitle: {
        detailTitle:'户数'
      },
      TimelinePop: false,
      timeLine: '',
      TimelineTitle: {
        detailTimeLine:'详情'
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
      households: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    edit(index, row) {
      this.newAddproject = true;
      this.amend = "popname";
    },
    newproject() {
      this.newAddproject = true;
      this.titlename = "popname";
    },
    nopass(index, row) {
      this.TimelinePop = true;
      this.timeLine = "detailTimeLine";
    },
    getCheckbox() {
      this.newAddproject = false;
    },
    household(){
      this.lookHouseholds = true;
      this.houseename = "detailTitle";
    }
  }
};
</script>

<style>
.addtables {
  float: right;
}
.removeTable {
  margin-bottom: 22px;
}
</style>
