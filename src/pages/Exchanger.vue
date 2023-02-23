<template>
  <div class="exchanger">
    <exchanger-header class="exchanger__header"/>
    <div class="exchanger__content">
      <h1 class="exchanger__content-title">Обменник</h1>
      <exchanger-form class="exchanger__content-form"/>
    </div>
    <exchanger-footer class="exchanger__footer"/>
  </div>
</template>

<script>
import ExchangerForm from "@/pages/Exchanger/ExchangerForm";
import ExchangerHeader from "@/pages/Exchanger/ExchangerHeader";
import ExchangerFooter from "@/pages/Exchanger/ExchangerFooter";

export default {
  components: {
    ExchangerFooter,
    ExchangerHeader,
    ExchangerForm
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/app-variables";

.exchanger__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: auto;
  padding-top: 5rem;
  text-align: center;
}
.exchanger__content-title {
  color: $exchanger-content-title-text;
}

</style>