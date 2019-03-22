<template>
  <section>
    <el-table :data="tableData" tooltip-effect="dark"
        border
        @selection-change="handleSelectionChange"
        style="width:100%"
        size="mini"
      >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="city" label="市（州）"></el-table-column>
      <el-table-column prop="area" label="县（区、市）"></el-table-column>
      <el-table-column prop="proName" label="项目名称"></el-table-column>
      <el-table-column label="现有工作基础">
        <el-table-column prop="cityFile" label="专家踏勘">
          <template slot-scope="scope">
            <el-checkbox v-model=" scope.row.takan "></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="IssuedCapital" label="方案编制审查">
          <template slot-scope="scope">
            <el-checkbox v-model=" scope.row.bianzhi "></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="completeInvestment" label="设计成果审查">
          <template slot-scope="scope">
            <el-checkbox v-model=" scope.row.chengguo "></el-checkbox>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="gs_capital" label="估算、概算及审定资金（万）"></el-table-column>
      <el-table-column prop="sq_capital" label="本次申请资金（万）"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="remove">移除</el-button>
          </template>
        </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        user: {
          name: '',
          address: [],
          place: ''
        }
      },
      tableData: [
        {
          city: '遂宁市',
          area: '船山区',
          proName: '',
          proType: '工程治理',
          takan:'',
          bianzhi:'',
          chengguo:'',
          gs_capital: '198.89',
          sq_capital: '198.89'
        },
        {
          city: '遂宁市',
          area: '船山区',
          proName: '',
          proType: '工程治理',
          takan:'',
          bianzhi:'',
          chengguo:'',
          gs_capital: '198.89',
          sq_capital: '231.89'
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
        all += Number(el.sq_capital)
      })
      all?this.$emit('danger', all):this.$emit('danger', '')
    }
  }
}
</script>
