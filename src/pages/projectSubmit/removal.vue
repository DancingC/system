<template>
  <section>
    <el-table :data="tableData" tooltip-effect="dark"
        border
        @selection-change="handleSelectionChange"
        style="width:100%"
        size="mini"
      >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date" label="时间"></el-table-column>
      <el-table-column prop="city" label="市（州）"></el-table-column>
      <el-table-column prop="area" label="县（市、区）"></el-table-column>
      <el-table-column label="现有工作基础">
        <el-table-column prop="appraise" label="调查评价">
          <template slot-scope="scope">
              <el-checkbox v-model=" scope.row.dcpj "></el-checkbox>
            </template>
        </el-table-column>
        <el-table-column prop="selection" label="规划选址">
          <template slot-scope="scope">
              <el-checkbox v-model=" scope.row.ghxz "></el-checkbox>
            </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="house" label="搬迁户数"></el-table-column>
      <el-table-column prop="auditMoney" label="估算、概算及审定资金（万）"></el-table-column>
      <el-table-column prop="applyMoney" label="本次申请资金（万）"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        user: {
          name: ''
        }
      },
      tableData: [
        {
          date:'2019-03-22',
          city:'遂宁市',
          area: '船山区',
          moneyComeFrom: '川国土资发 [2017] 94号、川财投 [2017] 139号',
          dzpj: '',
          ghxz: '',
          house: '1',
          auditMoney: '1',
          applyMoney: '4',
          remark: '贫困户3户'
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let all = 0;
      val.forEach((el, index, obj) => {
        all += Number(el.applyMoney)
      })
      val.length?this.$emit('remove', all, val):this.$emit('remove', '', [])
    }
  }
}
</script>
