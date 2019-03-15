<template>
  <el-form ref="form" :model="form" label-width="120px">
    <div class="tip">
      <p>基本信息</p>
    </div>
    <el-row :gutter="0">
      <el-col :span="8">
        <el-form-item label="区县">
          <el-select v-model="form.county" style="width:100%">
            <el-option label="船山区" value="船山区"></el-option>
            <el-option label="蓬溪县" value="蓬溪县"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="项目名称">
          <el-input v-model="form.proName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="灾种">
          <el-select v-model="form.disasterType" style="width:100%">
            <el-option label="危岩" value="危岩"></el-option>
            <el-option label="崩塌" value="崩塌"></el-option>
            <el-option label="滑坡" value="滑坡"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="防治措施">
          <el-input v-model="form.measure"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="完成时限要求">
          <el-date-picker v-model="form.time" type="date" style="width:100%"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="资金来源">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="tip">
      <p>资金情况</p>
    </div>
    <el-row :gutter="0">
      <el-col :span="8">
        <el-form-item label="市上文件">
          <el-input v-model="form.cityFile"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="下达资金（万）">
          <el-input v-model="form.downMoney"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="完成投资（万）">
          <el-input v-model="form.investment"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="剩余资金">
          <el-input v-model="form.surplus_funding"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="tip">
      <p>工程治理</p>
    </div>
    <el-row :gutter="0">
      <el-col :span="8">
        <el-form-item label="勘查阶段">
          <el-input v-model="form.kc_stage"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="施工图设计阶段">
          <el-input v-model="form.sj_stage"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="施工招投标阶段">
          <el-input v-model="form.zb_stage"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="施工阶段">
          <el-input v-model="form.sg_stage"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="已竣工">
          <el-input v-model="form.completed"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="已初验">
          <el-input v-model="form.check"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="以终验">
          <el-input v-model="form.checked"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="tip">
      <p>其他</p>
    </div>
    <el-row>
      <el-col :span="24">
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="btn-father">
          <el-button type="primary" @click="handleSave" class="btn-ok">确定</el-button>
          <el-button class="btn-no">取消</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        county: '',
        proName: '',
        disasterType: '',
        measure: '',
        time: '',
        money: '',
        cityFile: '',
        downMoney: '',
        investment: '',
        kc_stage: '',
        sj_stage: '',
        zb_stage: '',
        sg_stage: '',
        completed: '',
        check: '',
        checked: '',
        remark: '',
        surplus_funding: ''
      }
    }
  },
  methods: {
    handleSave () {}
  }
}
</script>

<style>
.tip {
  padding: 8px 16px;
  background-color: #ecf8ff;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
  margin: 20px 0;
}
.btn-father{
  text-align: center
}
.btn-father .el-form-item__content{
    margin-left:0 !important;
}
.btn-father .btn-ok{
  margin-right: 2em;
}
.btn-father .btn-on{
  margin-left: 2em;
}
</style>
