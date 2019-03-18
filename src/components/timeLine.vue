<template>
  <div class="block">
    <el-timeline :reverse="reverse" class="timeline">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
      >{{activity.content}}</el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        reverse: true,
        activities: [
        {
          content: '李四审核项目，未通过',
          timestamp: '2019-03-13'
        }, {
          content: '张三提交项目',
          timestamp: '2019-03-11'
        }]
      };
    }
  };
</script>

<style>
.timeline{
  margin: 15px 0 0 21px;
}
</style>
