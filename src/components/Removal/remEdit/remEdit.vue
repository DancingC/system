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
            <el-option label="安居区" value="安居区"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="任务数">
          <el-input v-model="form.taskNum"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="下达资金（万）">
          <el-input v-model="form.downMoney"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="已完成搬迁户数">
          <el-input v-model="form.bqNum"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="tip">
      <p>已拨付资金</p>
    </div>
    <el-row :gutter="0">
      <el-col :span="8">
        <el-form-item label="户数">
          <el-input v-model="form.Num"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="资金（万）">
          <el-input v-model="form.monry"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="tip">
      <p>资金来源</p>
    </div>
    <el-row :gutter="0">
      <el-col :span="8">
        <el-form-item label="附件名称">
          <el-input v-model="form.fileName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="上传附件">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  methods: {
    handleSave () {

    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
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
.btn-father {
  text-align: center;
}
.btn-father .el-form-item__content {
  margin-left: 0 !important;
}
.btn-father .btn-ok {
  margin-right: 2em;
}
.btn-father .btn-on {
  margin-left: 2em;
}
</style>
