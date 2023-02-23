<template>
  <div class="error-path">
    <h2 class="error-path__title">Error 404</h2>
    <router-link :to="{name: routes.exchanger}" class="error-path__link">To exchanger</router-link>
  </div>
</template>

<script>
import {ROUTES_NAME} from "@/constants/path-constants";

export default {
 data() {
   return {
     routes: ROUTES_NAME,
   }
 }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/app-variables";

.error-path {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.error-path__link {
  margin-top: 1rem;
  padding: 0.2rem;
  text-decoration: none;
  border: 0.0625rem solid $error-path-link-border;
  color: $error-path-link-text;
}
</style>