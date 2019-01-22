<template>
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="县区">
        <el-select v-model="formInline.user.name" style="width:140px;">
          <el-option label="船山区" value="船山区"></el-option>
          <el-option label="蓬溪县" value="蓬溪县"></el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary">查询</el-button>
      <el-button type="primary">新增</el-button>
    </el-form>

    <el-table :data="tableData" border style="width:100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="area" label="县区"></el-table-column>
      <el-table-column prop="moneyComeFrom" label="资金来源"></el-table-column>
      <el-table-column prop="taskNum" label="任务数"></el-table-column>
      <el-table-column prop="downMoney" label="下达资金（万）"></el-table-column>
      <el-table-column prop="hushu" label="已完成搬迁户数"></el-table-column>

      <el-table-column label="已拨付资金">
        <el-table-column prop="num" label="户数"></el-table-column>
        <el-table-column prop="money" label="资金（万元）"></el-table-column>
      </el-table-column>

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
          name: ''
        }
      },
      tableData: [
        {
          area: '船山区',
          moneyComeFrom: '川国土资发 [2017] 94号、川财投 [2017] 139号',
          taskNum: '17',
          downMoney: '61',
          hushu: '1',
          num: '1',
          money: '4',
          remark: '贫困户3户'
        },
        {
          area: '安居区',
          moneyComeFrom: '川国土资发 [2017] 94号、川财投 [2017] 139号',
          taskNum: '30',
          downMoney: '105',
          hushu: '15',
          num: '10',
          money: '35',
          remark: '新房未修建完成未验收'
        }
      ]
    }
  },
  methods: {
    edit (index, row) {
      this.$router.push({ path: '/Removal/remEdit' })
    }
  }
}
</script>
