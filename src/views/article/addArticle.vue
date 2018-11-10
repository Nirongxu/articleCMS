<template>
  <div class="addArticle">
    <el-form ref="article" :model="article" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="标签">

        <el-select
          v-model="article.tag"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :value="item.name">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="是否置顶">
        <el-switch v-model="article.top"></el-switch>
      </el-form-item>
    </el-form>
    <Markdown :onchange="change" v-bind:initData="article.content.markdown"></Markdown>
    <el-row type="flex" class="row-bg" justify="end">
      <el-button class="subBtn" type="primary" @click="submitArticle">发布</el-button>
    </el-row>
  </div>
</template>

<script>
import Markdown from '../../components/markdown/markdown-editor'
export default {
  name: 'addArticle',
  data () {
    return {
      options: [],
      article: {
        title: '',
        tag: [],
        top: false,
        content: ''
      }
    }
  },
  components: {Markdown},
  methods: {
    change () {
      this.article.content = arguments[0]
    },
    submitArticle () {
      if (!this.article.title) {
        this.$message({
          showClose: true,
          message: '标题不能为空',
          type: 'warning'
        })
        return false
      }
      if (!this.article.content) {
        this.$message({
          showClose: true,
          message: '内容不能为空',
          type: 'warning'
        })
        return false
      }
      let that = this
      this.$axios.post('/api/addArticle', {
        articleData: this.article
      })
        .then(function (response) {
          if (response.data.status) {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: 'success'
            })
            that.article = {
              title: '',
              tag: [],
              top: false,
              content: ''
            }
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: 'error'
            })
          }
        })
        .catch(function (error) {
          that.$message({
            showClose: true,
            message: '发表失败',
            type: 'error'
          })
        })
    }
  },
  mounted () {
    let id = this.$route.query.articleId
    let that = this
    this.$axios.get('/api/setting/getNavClassify')
      .then(function (response) {
        if (response.status === 200) {
          console.log(response)
          response.data.navList.shift()
          that.options = response.data.navList
          return false
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    if (!id) return false
    this.$axios.get('/api/article/' + id + '&edit')
      .then(function (response) {
        if (response.status === 200) {
          console.log(response)
          that.article = response.data
          return false
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>
.subBtn{
  width: 100px;
  margin: 0 auto;
}
</style>
