<template>
  <div>
    <h1>Hello World</h1>
    <div ref="container" class="editor"/>
  </div>
</template>

<script>
  import * as monaco from 'monaco-editor'
  export default {
    name: "home",
    props: {
      editorOptions: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        monacoEditor: null,
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initEditor();
      })
    },
    methods: {
      initEditor() {
        this.monacoEditor = monaco.editor.create(this.$refs.container, this.editorOptions)
      },
    },
    destroyed() {
      this.monacoEditor.dispose();//使用完成销毁实例
    }
  }
</script>

<style lang="less" scoped>
  .editor{
    height: 200px;
  }
</style>