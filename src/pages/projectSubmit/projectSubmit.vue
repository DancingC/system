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
      <el-form-item label="批复文件">
        <el-input v-model="formInline.user.proName" placeholder="批复文件"></el-input>
      </el-form-item>
      <el-button type="primary">查询</el-button>
    </el-form>

    <el-table :data="tableData" border style="width:100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="time" label="上报日期"></el-table-column>
      <el-table-column prop="area" label="估算、概算及审定资金（万元）"></el-table-column>
      <el-table-column prop="proName" label="申请资金（万元）"></el-table-column>
      <el-table-column prop="approvalDate" label="批复日期"></el-table-column>
      <el-table-column prop="approvaFund" label="批复资金"></el-table-column>
      <el-table-column prop="approvaFile" label="批复文件"></el-table-column>
      <el-table-column fixed="right" label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detail">详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 详细弹框 -->
    <el-dialog class="projectDetail" :title="addtitle[addFile]" :visible.sync="newAddFileVisble">
      <el-row :gutter="20" class="addBorder">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <p>文件</p>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList3">
            <div class="pop_flex">
              <span>国土文件</span>
              <el-button size="mini" type="primary">点击上传</el-button>
            </div>
          </el-upload>
        <!-- </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"> -->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList3">
            <div class="pop_flex">
              <span>财政拨款</span>
              <el-button size="mini" type="primary">点击上传</el-button>
            </div>
          </el-upload>
        </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <p>资金</p>
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-form-item label="治理工程">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排危除险">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="避让搬迁">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="治理工程" name="first">
        <governance></governance>
      </el-tab-pane>
      <el-tab-pane label="排危除险" name="second">
        <removeDanger></removeDanger>
      </el-tab-pane>
      <el-tab-pane label="搬迁避让" name="third">
        <removal></removal>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
        <el-button @click="newAddFileVisble = false">取 消</el-button>
        <el-button type="primary" @click="getCheckbox">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </section>
</template>

<script>
import governance from "./governance";
import removeDanger from "./removeDanger";
import removal from "./removal";

export default {
  components: {
    governance,
    removeDanger,
    removal
  },
  name: 'proPM',
  data () {
    return {
      fileList3: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      newAddFileVisble: false,
      formInline: {
        user: {
          name: '',
          date: '',
          proName: '',
          place: ''
        }
      },
      addtitle: {
        popname: "项目详情"
      },
      addFile:"",
      activeName: "first",
      tableData: [
        {
          time: '2019-03-01',
          area: '198.89',
          proName: '198.89',
          approvalDate: '2019-03-11',
          approvaFund: '198.89',
          completeDate: '2013年12月30日',
          approvaFile: ''
        }
      ],
      form:{
        name:''
      },
    }
  },
  methods: {
    detail() {
      this.newAddFileVisble = true;
      this.addFile = "popname";
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getCheckbox(){
      this.newAddFileVisble = false;
    }
  }
}
</script>

<style>
.projectDetail .el-dialog__body{
  padding:10px 20px;
}
.projectDetail .el-dialog{
  width: 70%;
}
.projectDetail p{
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}
.upload-demo .el-upload{
  width: 100%;
}
.pop_flex{
  display:flex;
  justify-content:space-between;
  align-items:center;
  background: #F5F7FA;
  padding: 5px;
}
.pop_flex span{
  vertical-align: middle;
}
</style>

