<template>
  <section>
    <div class="hide">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="县（市、区）">
        <el-select v-model="formInline.user.name">
          <el-option label="船山区" value="船山区"></el-option>
          <el-option label="蓬溪县" value="蓬溪县"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="formInline.user.proName" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-button type="primary">查询</el-button>
    </el-form>

    <el-table :data="tableData" border style="width:100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
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
      <el-table-column fixed="right" label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </section>
</template>

<script>
export default {
  name: 'projectWorks',
  data () {
    return {
      formInline: {
        user: {
          name: '',
          date: '',
          proName: '',
          place: ''
        }
      },
      tableData: [
        {
          city: '遂宁市',
          area: '船山区',
          proName: '遂宁市蓬溪县大石镇大福村3组偏马山危岩治理工程',
          completeDate: '2013年12月30日',
          capitalSource: '川国土资函 [2013] 505号、川财投 [2013] 53号',
          gusuan: '198.89',
          money:'198.89'
        }
      ]
    }
  },
  methods: {

  }
}
</script>
