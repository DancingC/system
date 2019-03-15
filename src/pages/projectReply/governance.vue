<template>
  <section>
    <div class="hide">
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width:100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column type="index" label="序号" width="50"></el-table-column> -->
        <el-table-column prop="city" label="市（州）"></el-table-column>
        <el-table-column prop="area" label="县（市、区）"></el-table-column>
        <el-table-column prop="proName" label="项目名称"></el-table-column>
        <el-table-column label="现有工作基础（打√）">
          <el-table-column prop="cityFile" label="专家踏勘">
            <template slot-scope="scope">
              <el-checkbox>{{ scope.row.name }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="IssuedCapital" label="勘察成果">
            <template slot-scope="scope">
              <el-checkbox>{{ scope.row.name }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="completeInvestment" label="设计成果">
            <template slot-scope="scope">
              <el-checkbox>{{ scope.row.name }}</el-checkbox>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="gusuan" label="估算、概算及审定资金（万元）"></el-table-column>
        <el-table-column prop="money" label="本次申请资金（万元）"></el-table-column>
        <el-table-column prop="proName" label="备注"></el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  name: "projectWorks",
  data() {
    return {
      multipleSelection: [],
      formInline: {
        user: {
          name: "",
          date: "",
          proName: "",
          place: ""
        }
      },
      tableData: [
        {
          city: '遂宁市',
          area: "船山区",
          proName: "遂宁市蓬溪县大石镇大福村3组偏马山危岩治理工程",
          capitalSource: '川国土资函 [2013] 505号、川财投 [2013] 53号',
          gusuan: '198.89',
          money:'198.89'
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
