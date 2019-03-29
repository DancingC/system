<template>
  <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>
</template>

<script>
export default {
  data () {
    return {
      activities: [
        {
          timestamp: '2019-03-02',
          content: '张三提交项目'
        },
        {
          timestamp: '2019-03-13',
          content: '李四审核项目，未通过'
        }
      ]
    }
  }
}
</script> 
