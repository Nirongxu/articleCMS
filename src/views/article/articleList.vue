<template>
  <div>
    <el-table
      :data="commentData"
      style="width: 100%"
      max-height="250">
      <el-table-column
        fixed
        prop="date"
        label="发布时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="文章标题">
      </el-table-column>
      <el-table-column
        prop="address"
        label="评论数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="address"
        label="点赞数"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'articleList',
  data () {
    return {
      commentData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({path: '/addArticle?url=' + this.$route.path});
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  mounted () {
    this.$axios.get('/api/user/comments')
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
