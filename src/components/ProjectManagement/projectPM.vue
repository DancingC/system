<template>
  <section>
    <div class="hide">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="县区">
        <el-select v-model="formInline.user.name" style="width:140px;">
          <el-option label="船山区" value="船山区"></el-option>
          <el-option label="蓬溪县" value="蓬溪县"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-select v-model="formInline.user.address" style="width:140px;">
          <el-option label="工程治理" value="工程治理"></el-option>
          <el-option label="排危除险" value="排危除险"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="formInline.user.proName" placeholder="项目名称" style="width:140px;"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="formInline.user.date"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width:230px;"
        ></el-date-picker>

      </el-form-item>
      <el-button type="primary">查询</el-button>
      <el-dropdown trigger="click">
        <el-button type="primary">
          新增
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>工程治理</el-dropdown-item>
          <el-dropdown-item>排危除险</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-form>

    <el-table :data="tableData" border style="width:100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="area" label="县区"></el-table-column>
      <el-table-column prop="proName" label="项目名称"></el-table-column>
      <el-table-column prop="proType" label="项目类型"></el-table-column>
      <el-table-column prop="hazardType" label="灾种"></el-table-column>
      <el-table-column prop="controlPlan" label="防治措施"></el-table-column>
      <el-table-column prop="completeDate" label="完成时限要求"></el-table-column>
      <el-table-column prop="capitalSource" label="资金来源"></el-table-column>
      <el-table-column label="资金情况">
        <el-table-column prop="cityFile" label="市上文件"></el-table-column>
        <el-table-column prop="IssuedCapital" label="下达资金（万元）"></el-table-column>
        <el-table-column prop="completeInvestment" label="完成投资（万元）"></el-table-column>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope">
          <el-button @click="edit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: {
          name: "",
          date: "",
          proName: "",
          place: ""
        }
      },
      tableData: [
        {
          area: "船山区",
          proName: "永兴镇灵通村言山坡危岩",
          proType: "工程治理",
          hazardType: "危岩",
          controlPlan: "工程治理",
          completeDate: "2013年12月30日",
          capitalSource: "川国土资函 [2013] 505号、川财投 [2013] 53号",
          cityFile: "",
          IssuedCapital: "82.78",
          completeInvestment: "77.5"
        },
        {
          area: "船山区",
          proName: "永兴镇灵通村言山坡危岩",
          proType: "排危除险",
          hazardType: "危岩",
          controlPlan: "工程治理",
          completeDate: "2013年12月30日",
          capitalSource: "川国土资函 [2013] 505号、川财投 [2013] 53号",
          cityFile: "",
          IssuedCapital: "82.78",
          completeInvestment: "77.5"
        }
      ]
    };
  },
  methods: {
    edit(index, row) {
      this.$router.push({ name: "edit" });
    }
  }
};
</script>
