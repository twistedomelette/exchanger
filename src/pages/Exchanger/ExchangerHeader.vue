<template>
  <header class="exchanger-header">
    <h1 class="exchanger-header__title">Exchanger</h1>
  </header>
</template>

<script>
  export default {
    name: 'exchanger-header',
  }
</script>

<style lang="scss" scoped>
@import "~@/styles/app-variables";

.exchanger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
  height: 4rem;
  background-color: $exchanger-header-background;
  color: $exchanger-header-text;
}
</style>
