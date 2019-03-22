<template>
    <el-table :data="pwcxDatas" tooltip-effect="dark"
        border
        style="width:100%"
        size="mini"
      >
      <el-table-column prop="date" label="时间"></el-table-column>
      <el-table-column prop="city" label="市（州）"></el-table-column>
      <el-table-column prop="area" label="县（市、区）"></el-table-column>
      <el-table-column prop="proName" label="项目名称"></el-table-column>
      <el-table-column label="现有工作基础">
        <el-table-column prop="cityFile" label="方案编制审查">
          <template slot-scope="scope">
            <el-checkbox v-model=" scope.row.bianzhi "></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="IssuedCapital">
          <!-- <template slot-scope="scope">
            <el-checkbox v-model=" scope.row.bianzhi "></el-checkbox>
          </template> -->
        </el-table-column>
        <el-table-column prop="completeInvestment">
          <!-- <template slot-scope="scope">
            <el-checkbox v-model=" scope.row.chengguo "></el-checkbox>
          </template> -->
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
</template>

<script>
export default {
    props:['datas'],
    data(){
        return{
            pwcxDatas:this.datas
        }
    },
    watch:{
        datas(val){
            this.pwcxDatas = val;
        }
    }
}
</script>

