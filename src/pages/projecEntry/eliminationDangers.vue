<template>
  <section>
    <div class="hide">
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
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="city" label="市（州）"></el-table-column>
        <el-table-column prop="area" label="县(市、区）"></el-table-column>
        <el-table-column prop="proName" label="项目名称"></el-table-column>
        <el-table-column label="现有工作基础（打√）">
          <el-table-column prop="cityFile" label="方案编制审查">
            <template slot-scope="scope">
              <el-checkbox v-model="checked">{{ scope.row.name }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="IssuedCapital" label="">
            <!-- <template slot-scope="scope">
              <el-checkbox v-model="checked">{{ scope.row.name }}</el-checkbox>
            </template> -->
          </el-table-column>
          <el-table-column prop="completeInvestment" label="">
            <!-- <template slot-scope="scope">
              <el-checkbox v-model="checked">{{ scope.row.name }}</el-checkbox>
            </template> -->
          </el-table-column>
        </el-table-column>
        <el-table-column prop="gusuan" label="估算、概算及审定资金（万元）"></el-table-column>
        <el-table-column prop="money" label="本次申请资金（万元）"></el-table-column>
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
    </div>

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
              <el-checkbox v-model="popform.takan">方案编制审查</el-checkbox>
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
        <el-row :gutter="10">
        <div class="dialog-footer">
          <el-button @click="newAddproject = false">取 消</el-button>
          <el-button type="primary" @click="getCheckbox">确 定</el-button>
        </div>
        </el-row>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: "proPM",
  data() {
    return {
      formInline: {
        user: {
          name: "",
          date: "",
          proName: "",
          place: "",
          start_end_time:""
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
        auditMoney:"",
        applyMoney: "",
        remark:""
      },
      addproject: {
        popname: "新增项目",
        amend: "修改项目"
      },
      checked: true,
      tableData: [
        {
          city: "遂宁市",
          area: "船山区",
          proName: "遂宁市蓬溪县大石镇大福村3组偏马山危岩治理工程",
          proType: "工程治理",
          hazardType: "危岩",
          controlPlan: "工程治理",
          gusuan: "198.89",
          money: "198.89",
          remark: "",
          state:"1"
        },
        {
          city: "遂宁市",
          area: "船山区",
          proName: "遂宁市蓬溪县大石镇大福村3组偏马山危岩治理工程",
          proType: "工程治理",
          hazardType: "危岩",
          controlPlan: "工程治理",
          gusuan: "198.89",
          money: "198.89",
          remark: "",
          state:"0"
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
      console.log(index);
      console.log(row);
    },
    getCheckbox() {
      this.newAddproject = false;
    }
  }
};
</script>
