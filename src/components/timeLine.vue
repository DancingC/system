<template>
  <light-timeline :items='items'></light-timeline>
</template>

<script>
const theme = 'red';
export default {
  data () {
    return {
      items: [
        {
          tag: '2019-03-02',
          content: '张三提交项目'
        },
        {
          tag: '2019-03-13',
          type: 'circle',
          content: '李四审核项目，未通过'
        }
      ]
    }
  }
}
</script> 

<style>
.timeline{
  margin: 15px 0 0 21px;
}
</style>
