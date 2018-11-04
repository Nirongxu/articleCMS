<template>
  <div>
    <Markdown :onchange="change"></Markdown>
  </div>
</template>

<script>
import Markdown from '../../components/markdown/markdown-editor'
export default {
  name: 'markdownView',
  components: {Markdown},
  methods: {
    change () {
      console.log(arguments)
    }
  }
}
</script>

<style scoped>

</style>
