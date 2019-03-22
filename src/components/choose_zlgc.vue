<template>
    <el-table
        :data="zlgcDatas"
        tooltip-effect="dark"
        border
        style="width:100%"
        size="mini"
      >
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="city" label="市（州）"></el-table-column>
        <el-table-column prop="area" label="县（市、区）"></el-table-column>
        <el-table-column prop="proName" label="项目名称"></el-table-column>
        <el-table-column label="现有工作基础">
          <el-table-column prop="cityFile" label="专家踏勘">
            <template slot-scope="scope">
              <el-checkbox v-model=" scope.row.takan "></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="IssuedCapital" label="勘察成果">
            <template slot-scope="scope">
              <el-checkbox v-model=" scope.row.kancha "></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="completeInvestment" label="设计成果">
            <template slot-scope="scope">
              <el-checkbox v-model=" scope.row.sheji "></el-checkbox>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="capitalMoney" label="估算、概算及审定资金（万）"></el-table-column>
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
            zlgcDatas:this.datas
        }
    },
    watch:{
        datas(val){
            this.zlgcDatas = val
        }
    }
}
</script>

