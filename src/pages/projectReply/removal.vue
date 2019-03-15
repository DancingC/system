<template>
  <section>
    <el-table :data="tableData" :span-method="objectSpanMethod" tooltip-effect="dark"
        border
        style="width:100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
      <!-- <el-table-column type="index" label="序号" width="50"></el-table-column> -->
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
    </el-table>
  </section>
</template>

<script>
export default {
  data () {
    return {
      multipleSelection: [],
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
          area: '船山区',
          moneyComeFrom: '川国土资发 [2017] 94号、川财投 [2017] 139号',
          taskNum: '30',
          downMoney: '105',
          hushu: '15',
          num: '10',
          money: '35',
          remark: '新房未修建完成未验收'
        },
        {
          area: '安居区',
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
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if(columnIndex === 0){
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>
