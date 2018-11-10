<template>
  <div>
    <el-table
      :data="userData"
      style="width: 100%"
      max-height="550">
      <el-table-column
        fixed
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="articleNum"
        label="发表文章数">
      </el-table-column>
      <el-table-column
        prop="commentNum"
        label="发表评论数">
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
  name: 'userList',
  data () {
    return {
      userData: []
    }
  },
  methods: {
    deleteRow (index, row) {
      console.log(index, row)
      let that = this
      this.$axios.post('/api/user/delUser', {
        id: row._id
      })
        .then(response => {
          console.log(response)
          if (response.data.status === 1) {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: 'success'
            })
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: 'error'
            })
          }
          that.getList()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getList () {
      let that = this
      this.$axios.get('/api/user/userList')
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
            let role = response.data[i].role
            switch (Number(role)) {
              case 0:
                response.data[i].role = '超级管理员'
                break
              case 1:
                response.data[i].role = '普通用户'
                break
              default:
                response.data[i].role = '游客'
            }
          }
          console.log(response)
          that.userData = response.data
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
