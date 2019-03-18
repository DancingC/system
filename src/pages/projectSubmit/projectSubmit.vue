<template>
  <section>
    <div class="hide">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="县（市、区）">
          <el-select v-model="formInline.user.name" class="select_label">
            <el-option label="船山区" value="船山区"></el-option>
            <el-option label="蓬溪县" value="蓬溪县"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="formInline.user.start_end_time"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="dateChecked"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="待审核">
          <el-select v-model="formInline.user.name" class="select_label">
            <el-option label="待审核" value="待审核"></el-option>
            <el-option label="待审定" value="待审定"></el-option>
            <el-option label="待批复" value="待批复"></el-option>
            <el-option label="未通过" value="未通过"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批复文件">
          <el-input v-model="formInline.user.proName" placeholder="批复文件"></el-input>
        </el-form-item>
        <el-button>查询</el-button>
        <el-button type="primary" @click="report">上报</el-button>
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

      <!-- 上报弹框 -->
      <el-dialog class="projectDetail" :title="reportFile[reportname]" :visible.sync="reportpop" width="80%">
        <p class="proTitles">选择项目</p>
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
        <el-row :gutter="20" class="addBorder">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <p>资金合计</p>
            <el-form ref="form" :model="form" label-width="80px">
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
        
        <div class="dialog-footer">
          <el-button @click="reportpop = false">取 消</el-button>
          <el-button type="primary" @click="getCheckbox">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 详细弹框 -->
      <el-dialog class="projectDetail" :title="addtitle[addFile]" :visible.sync="newAddFileVisble">
        <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20" class="addBorder">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <p>文件</p>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
              :file-list="fileList3"
            >
            <div class="flex_div">
              <el-form-item label="国土文件">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-button size="mini" type="primary">点击上传</el-button>
            </div>
            </el-upload>

            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
              :file-list="fileList3"
            >
              <div class="flex_div">
              <el-form-item label="财政拨款">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-button size="mini" type="primary">点击上传</el-button>
              </div>
              
            </el-upload>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <p>资金</p>
            <el-form ref="form" :model="form" label-width="80px">
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
        <div class="dialog-footer">
          <el-button @click="newAddFileVisble = false">取 消</el-button>
          <el-button type="primary" @click="getCheckbox">确 定</el-button>
        </div>
        </el-form>
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
  name: "proPM",
  data() {
    return {
      fileList3: [],
      newAddFileVisble: false,
      formInline: {
        user: {
          name: "",
          date: "",
          proName: "",
          place: ""
        }
      },
      form:{
        name:''
      },
      addtitle: {
        popname: "项目详情"
      },
      addFile: "",
      reportpop: false,
      reportFile: {
        popname: "上报"
      },
      reportname:"",
      activeName: "first",
      tableData: [
        {
          time: "2019-03-01",
          area: "198.89",
          proName: "198.89",
          approvalDate: "2019-03-11",
          approvaFund: "198.89",
          completeDate: "2013年12月30日",
          approvaFile: ""
        }
      ],
      form: {
        name: ""
      }
    };
  },
  methods: {
    detail() {
      this.newAddFileVisble = true;
      this.addFile = "popname";
    },
    report() {
      this.reportpop = true;
      this.reportname = "popname";
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getCheckbox() {
      this.newAddFileVisble = false;
    }
  }
};
</script>

<style>
.select_label {
  width: 120px;
}
.projectDetail .el-dialog__body {
  padding: 10px 20px;
}
.el-date-editor.el-input__inner.dateChecked {
  width: 230px;
}
.projectDetail .el-dialog {
  width: 70%;
}
.projectDetail p {
  font-size: 16px;
  font-weight: bold;
  margin: 15px 0;
}
.projectDetail p.proTitles{
  margin: 0;
}
.projectDetail .flex_div{
  display: flex;
  justify-content: space-between;
}
.projectDetail .flex_div .el-form-item{
  width: 80%;
  margin: 0;
}
.upload-demo .el-upload {
  width: 100%;
}
.dialog-footer{
  margin-top: 15px;
  text-align: center;
}
</style>

