<template>
  <el-form ref="form" :model="form" label-width="120px">
    <div class="tip">
      <p>基本信息</p>
    </div>
    <el-row :gutter="0">
      <el-col :span="8">
        <el-form-item label="市（州）">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
      </el-col>
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
        <el-form-item label="项目类型">
          <el-select v-model="form.proType" style="width:100%">
            <el-option label="工程治理" value="工程治理"></el-option>
            <el-option label="排危除险" value="排危除险"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="tip">
      <p>资金情况</p>
    </div>
    <el-row :gutter="0">
      <el-col :span="8">
        <el-form-item label="审定资金（万）">
          <el-input v-model="form.budget"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="申请资金（万）">
          <el-input v-model="form.requestMoney"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="tip">
      <p>现有工作基础</p>
    </div>
    <el-row :gutter="0">
      <el-col :span="8">
        <el-form-item>
          <el-checkbox v-model="checked1">专家踏勘</el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item>
        <el-checkbox v-model="checked2">勘察成果</el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item>
        <el-checkbox v-model="checked3">设计成果</el-checkbox>
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
        city: '',
        county: '',
        proName: '',
        budget: '',
        requestMoney: '',
        zjtk: '',
        kccg: '',
        sjcg: ''
      },
      checked1: false,
      checked2: false,
      checked3: false
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
