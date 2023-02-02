<template>
  <div class="home">
    <Public/>
    <div>
      <el-steps :space="200" :active="1" finish-status="success">
        <el-step title="已完成"></el-step>
        <el-step title="进行中"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Aside from "@/components/Aside";
import Public from "@/views/Public";

export default {
  name: 'home',
  components: {
    Public,
    Aside,
    HelloWorld
  }
}
</script>
