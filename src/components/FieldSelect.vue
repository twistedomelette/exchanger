<template>
  <div class="field-select">
    <small class="field-select__title">Отдайте</small>
    <select class="field-select__select"
            :value="modelValue"
            @input="updateValueModel"
    >
      <slot></slot>
    </select>
  </div>
</template>

<script>
const EVENTS = {
  updateModelValue: 'update:modelValue',
}

export default {
  name: "field-select",

  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    }
  },
  methods: {
    updateValueModel(event) {
      this.$emit(EVENTS.updateModelValue, event.target.value)
    }
  }
}

</script>

<style scoped>
.field-select {
  display: flex;
  flex-direction: column;
  text-align: start;
}
.field-select__title {
  font-size: 0.65rem;
}
.field-select__select {
  font-size: large;
  height: 1.5rem;
  width: 5.5rem;
}
</style>