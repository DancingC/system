<template>
    <el-table :data="brbqDatas" tooltip-effect="dark"
        border
        style="width:100%"
        size="mini"
      >
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
      <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="remove">移除</el-button>
          </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props:['datas'],
    data(){
        return{
            brbqDatas:this.datas
        }
    },
    watch:{
        datas(val){
            this.brbqDatas = val
        }
    }
}
</script>

