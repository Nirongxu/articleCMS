<template>
  <div>
    <el-table
      :data="commentData"
      style="width: 100%"
      max-height="250">
      <el-table-column
        fixed
        prop="created"
        label="评论时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="article.title"
        label="被评文章">
      </el-table-column>
      <el-table-column
        prop="content.text"
        label="评论内容"
        width="300">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteRow(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'comment',
  data () {
    return {
      commentData: []
    }
  },
  methods: {
    deleteRow (index, rows) {
      console.log(index, rows)
      let that = this
      this.$axios.post('/api/delComment', {
        id: rows._id,
        articleId: rows.article._id
      })
        .then(response => {
          console.log(response)
          if (response.data.status === 1) {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: 'success'
            })
            that.getList()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getList () {
      let that = this
      this.$axios.get('/api/user/comments')
        .then(function (response) {
          if (response.data.status === 0) {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: 'error'
            })
            return false
          }
          for (let i = 0; i < response.data.length; i++) {
            let d = new Date(response.data[i].created)
            let moth = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
            let date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
            let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
            let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
            let seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
            response.data[i].created = d.getFullYear() + '-' + moth + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
          }
          console.log(response)
          that.commentData = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped>

</style>
