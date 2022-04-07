<template>
  <div>
    <monaco :editorOptions="editorOptions"/>
  </div>
</template>
<script>
  import monaco from './views/home.vue'

  export default {
    components: { monaco },
    data () {
      return {
        editorOptions: {
          language: 'yaml',
          value: `config:\n    info: from nacos 1.4.0.1\n\naccess-control:\n  own_client_id: 60\n                \n`,
          contextmenu: false, // 右键菜单
          scrollBeyondLastLine: false,
          theme: "vs-dark",
          minimap: {
            enabled: false,
          },
        },
      }
    }
  }
</script>
<style>

</style>