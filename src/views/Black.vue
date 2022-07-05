<template>
  <div></div>
</template>
<script>
// 空白页，用于解决 动态路由刷新后404
  export default {
    data() {
      return {};
    },
    created() {
      const path = this.$route.query;
      this.$router.push(path);
    }
  };
</script>
<style>
</style>