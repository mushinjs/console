<script setup lang="ts">
// 从路由中获取当前页面的名称 使用vueuse
const pageName = useRoute().meta.title ?? 'home'
</script>

<template>
  <div flex>
    <span>{{ pageName }}</span>
    <!-- TODO: SearchBar -->
    <div w-30 h-6 border />
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {

}
</style>
