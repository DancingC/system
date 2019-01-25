<template>
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="县区">
        <el-select v-model="formInline.user.name" style="width:140px;">
          <el-option label="船山区" value="船山区"></el-option>
          <el-option label="蓬溪县" value="蓬溪县"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-select v-model="formInline.user.address" style="width:140px;">
          <el-option label="工程治理" value="工程治理"></el-option>
          <el-option label="排危除险" value="排危除险"></el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary">查询</el-button>
      <el-button type="primary">新增</el-button>
    </el-form>

    <el-table :data="tableData" border style="width:100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="city" label="市（州）"></el-table-column>
      <el-table-column prop="area" label="县区"></el-table-column>
      <el-table-column prop="proName" label="项目名称"></el-table-column>
      <el-table-column prop="proType" label="项目类型"></el-table-column>

      <el-table-column label="现有工作基础（打√）">
        <el-table-column prop="cityFile" label="专家踏勘"></el-table-column>
        <el-table-column prop="IssuedCapital" label="勘查结果"></el-table-column>
        <el-table-column prop="completeInvestment" label="设计成果"></el-table-column>
      </el-table-column>
      <el-table-column prop="gs_capital" label="审定资金（万）"></el-table-column>
      <el-table-column prop="sq_capital" label="申请资金（万）"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope">
          <el-button @click="edit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
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
          proName: '永兴镇灵通村言山坡危岩',
          proType: '工程治理',
          hazardType: '危岩',
          controlPlan: '工程治理',
          cityFile: '√',
          IssuedCapital: '√',
          completeInvestment: '√',
          gs_capital: '198.89',
          sq_capital: '198.89'
        },
        {
          city: '遂宁市',
          area: '船山区',
          proName: '永兴镇灵通村言山坡危岩',
          proType: '排危除险',
          hazardType: '危岩',
          controlPlan: '工程治理',
          cityFile: '√',
          IssuedCapital: '√',
          completeInvestment: '√',
          gs_capital: '198.89',
          sq_capital: '198.89'
        }
      ]
    }
  },
  methods: {
    edit (index, row) {
      this.$router.push({ path: '/discharge/disEdit' })
    }
  }
}
</script>
