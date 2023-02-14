<script setup lang="ts">
const version = ref('0.0.1')

const navList = ref([])
</script>

<template>
  <div flex-col w-25 min-h-screen>
    <div>Mushin</div>
    <nav>
      <NavItem v-for="(item, i) in navList" :key="i" :item="item" />
      <!-- <div>首页</div>
      <div>机器人</div>
      <div>插件市场</div>
      <div>日志</div>
      <div>设置</div> -->
    </nav>
    <hr>
    <nav text-xl mt-6 flex-col gap-2>
      <button icon-btn @click="toggleDark()">
        <div i-carbon-sun dark:i-carbon-moon />
      </button>

      <div>version: {{ version }}</div>
      <!-- <a
        icon-btn i-carbon-logo-github
        rel="noreferrer"
        href="https://github.com/antfu/vitesse-lite"
        target="_blank"
        title="GitHub"
      /> -->
    </nav>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {

}
</style>
