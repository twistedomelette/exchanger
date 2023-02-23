<template>
  <footer class="exchange-footer">
    <div class="exchange-footer__rate">
        <div class="exchange-footer__rate-title">Курс</div>
        <div class="exchange-footer__rate-content">{{ rate }}</div>
    </div>
    <div class="exchange-footer__reserve">
      <div class="exchange-footer__reserve-title">Резерв</div>
      <div class="exchange-footer__reserve-content">{{ reserve }}</div>
    </div>
  </footer>
</template>

<script>
import {emitter} from "@/helpers/emitter";
import {EVENTS_NAME} from "@/constants/emit-constants";

export default {
  name: 'exchanger-footer',

  data() {
    return {
      rate: '',
      reserve: '',
    }
  },
  mounted() {
    emitter.on(EVENTS_NAME.sendRate, selectRate => this.rate = selectRate);
    emitter.on(EVENTS_NAME.sendReserve, selectReserve => this.reserve = selectReserve);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/app-variables";

.exchange-footer {
  display: flex;
  justify-content: space-around;
}
.exchange-footer__rate, .exchange-footer__reserve {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 30%;
  text-align: center;
  color: $exchange-footer-rate-text;
}
</style>