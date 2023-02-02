<template>
  <div id="app">
<!--    <Public/>-->
      <el-main>
          <router-view/>
      </el-main>
  </div>
</template>

<style>

</style>
<script>
  import Public from "@/views/Public";

  export default {
    components: {Public,}
  }
</script>