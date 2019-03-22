<template>
  <section>
    <div class="hide">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="县（市、区）">
          <el-select v-model="formInline.user.area" class="select_label">
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
        <el-form-item label="状态">
          <el-select v-model="formInline.user.state" class="select_label">
            <el-option label="待审核" value="待审核"></el-option>
            <el-option label="待审定" value="待审定"></el-option>
            <el-option label="待批复" value="待批复"></el-option>
            <el-option label="未通过" value="未通过"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批复文件">
          <el-input v-model="formInline.user.approveFile" placeholder="批复文件"></el-input>
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
        <el-table-column prop="state" label="状态" width="80">
          <template slot-scope="scope">
            <el-button
              @click="nopass(scope.$index, scope.row)"
              v-if="scope.row.state == 1"
              type="text"
              class="nopass"
            >已批复</el-button>
            <el-button type="text" v-else>待批复</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="approval" v-if="scope.row.state == 1">批复</el-button>
            <el-button type="text" @click="detail" v-else>详情</el-button>
            <el-button type="text" @click="exportexport">导出</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 上报弹框 -->
      <el-dialog
        class="projectDetail"
        :title="reportFile[reportname]"
        :visible.sync="reportpop"
        width="80%"
      >
        <p class="proTitles">选择项目</p>
        <el-tabs v-model="activeName" @tab-click="reportClick">
          <el-tab-pane label="治理工程" name="first">
            <zlgc :datas="zlgcDatas"></zlgc>
          </el-tab-pane>
          <el-tab-pane label="排危除险" name="second">
            <pwcx :datas="pwcxDatas"></pwcx>
          </el-tab-pane>
          <el-tab-pane label="搬迁避让" name="third">
            <brbq :datas="brbqDatas"></brbq>
          </el-tab-pane>
        </el-tabs>
        <div class="choosePro">
          <el-button type="primary" size="mini" @click="choosePro">选择项目</el-button>
        </div>
        <el-row class="addBorder">
          <p>资金合计</p>
          <el-form ref="form" :model="reportForm" label-width="80px" size="small">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="治理工程">
                <el-input v-model="reportForm.zhili"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="排危除险">
                <el-input v-model="reportForm.danger"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="避让搬迁">
                <el-input v-model="reportForm.remove"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div class="dialog-footer">
          <el-button @click="reportpop = false" size="small">取 消</el-button>
          <el-button type="primary" @click="getCheckbox" size="small">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 选择项目弹框 -->
      <el-dialog class="projectDetail" :visible.sync="chooseProject" width="70%">
        <governance @gover="reportGovernance" v-if="tabsStates == 'first'"></governance>
        <removeDanger @danger="reportDanger" v-else-if="tabsStates == 'second'"></removeDanger>
        <removal @remove="resettlement" v-else-if="tabsStates == 'third'"></removal>
        <div class="dialog-footer">
          <el-button @click="chooseProject = false" size="small">取 消</el-button>
          <el-button type="primary" @click="chooseProject = false" size="small">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 详细弹框 -->
      <el-dialog
        class="projectDetail"
        :title="addtitle[addFile]"
        :visible.sync="newAddFileVisble"
        width="80%"
      >
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-row class="addBorder">
            <p>批复文件</p>
            <div class="flex_div">
              <el-col :xs="21" :sm="21" :md="21" :lg="21" :xl="21">
                <el-form-item label="国土文件">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" class="col_button">
                  <el-button size="small" type="primary" @click="gtwjBtn">上传文件</el-button>
              </el-col>
            </div>
            <div class="flex_div">
              <el-col :xs="21" :sm="21" :md="21" :lg="21" :xl="21">
                <el-form-item label="财政拨款">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" class="col_button">
                  <el-button size="small" type="primary" @click="czbkBtn">上传文件</el-button>
              </el-col>
            </div>
          </el-row>
          <el-row>
            <p>批复资金</p>
            <el-form ref="form" :model="form" label-width="80px" size="small">
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="治理工程">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="排危除险">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="避让搬迁">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
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
          <el-row>
            <p>上报资金</p>
            <el-form ref="form" :model="form" label-width="80px" size="small">
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="治理工程">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="排危除险">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="避让搬迁">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <div class="dialog-footer">
            <el-button @click="newAddFileVisble = false" size="small">取 消</el-button>
            <el-button type="primary" @click="getCheckbox" size="small">确 定</el-button>
          </div>
        </el-form>
      </el-dialog>

      <!-- 上传文件弹框 -->
      <el-dialog class="projectDetail" :title="uploadFiletitle[fileName]" :visible.sync="uploadFile" width="50%">
        <uploadFile></uploadFile>
      </el-dialog>
    </div>
  </section>
</template>

<script>
import governance from "./governance";
import removeDanger from "./removeDanger";
import removal from "./removal";
import zlgc from "../../components/choose_zlgc"; //上报-治理工程
import pwcx from "../../components/choose_pwcx"; //上报-排危除险
import brbq from "../../components/choose_brbq"; //上报-避让搬迁
import uploadFile from "../../components/uploadFile";

export default {
  components: {
    governance,
    removeDanger,
    removal,
    zlgc,
    pwcx,
    brbq,
    uploadFile
  },
  name: "proPM",
  data() {
    return {
      gtwjFileList: [],
      czbkFileList: [],
      newAddFileVisble: false,
      formInline: {
        user: {
          area: "",
          date: "",
          state: "",
          approveFile: ""
        }
      },
      form: {
        name: ""
      },
      reportForm: {
        //上报数据
        zhili: "",
        danger: "",
        remove: ""
      },
      addtitle: {
        pifuname: "项目批复",
        popname: "项目详情"
      },
      addFile: "",
      reportpop: false,
      reportFile: {
        popname: "上报"
      },
      reportname: "",
      activeName: "first",
      chooseProject: false,
      tableData: [
        {
          time: "2019-03-01",
          area: "198.89",
          proName: "198.89",
          approvalDate: "2019-03-11",
          approvaFund: "198.89",
          completeDate: "2013年12月30日",
          approvaFile: "",
          state: "1"
        },
        {
          time: "2019-03-01",
          area: "198.89",
          proName: "198.89",
          approvalDate: "2019-03-11",
          approvaFund: "198.89",
          completeDate: "2013年12月30日",
          approvaFile: "",
          state: "0"
        }
      ],
      form: {
        name: ""
      },
      tabsStates: "first",
      zlgcDatas: [], //治理工程table组件的值
      pwcxDatas: [], //排危除险table组件的值
      brbqDatas: [], //避让搬迁table组件的值
      uploadFile:false,
      uploadFiletitle:{
        gtwjname:'国土文件',
        czbkname:'财政拨款'
      },
      fileName:""
    };
  },
  methods: {
    approval() {
      this.newAddFileVisble = true;
      this.addFile = "pifuname";
    },
    detail() {
      this.newAddFileVisble = true;
      this.addFile = "popname";
    },
    exportexport() {      //导出数据

    },
    report() {
      this.reportpop = true;
      this.reportname = "popname";
    },
    gtwjUpload(file, fileList) {
      //国土文件上传
      this.gtwjFileList = fileList.slice(-3);
    },
    czbkUpload(file, fileList) {
      //财政拨款上传
      this.czbkFileList = fileList.slice(-3);
    },
    reportClick(tab, event) {
      console.log(tab.name);
      this.tabsStates = tab.name;
    },
    handleClick() {
      //详细弹框tab切换事件
    },
    getCheckbox() {
      this.newAddFileVisble = false;
    },
    reportGovernance(num, data) {
      //选择项目-治理工程
      this.zlgcDatas = data;
      this.reportForm.zhili = num;
    },
    reportDanger(num, data) {
      //选择项目-排危除险
      this.pwcxDatas = data;
      this.reportForm.danger = num;
    },
    resettlement(num, data) {
      //选择项目-避让搬迁
      this.brbqDatas = data;
      this.reportForm.remove = num;
    },
    choosePro() {
      this.chooseProject = true;
    },
    gtwjBtn() {
      this.uploadFile = true;
      this.fileName = 'gtwjname';
    },
    czbkBtn() {
      this.uploadFile = true;
      this.fileName = 'czbkname';
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
  position: relative;
}
.projectDetail .choosePro {
  position: absolute;
  top: 35px;
  right: 22px;
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
.projectDetail p.proTitles {
  margin: 0;
}
.projectDetail .flex_div .col_button{
  text-align: center;
}
.upload-demo .el-upload {
  width: 100%;
}
.dialog-footer {
  margin-top: 15px;
  text-align: center;
}
</style>

