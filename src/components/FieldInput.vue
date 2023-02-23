<template>
  <div
      class="field-input"
      :class="{'field-input--invalid': isError}"
  >
    <small class="field-input__title"> {{ label }} </small>
    <input
        type="text"
           class="field-input__input"
           :value="modelValue"
           @input="updateValueModel"
    >
    <small class="field-input__error-message">
      {{ error }}
    </small>
  </div>
</template>

<script>
const EVENTS = {
  updateModelValue: 'update:modelValue',
}
export default {
  name: "field-input",
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    error: {
      type: [String, Number],
      default: '',
    },
    limit: {
      type: [String, Number],
      default: '',
    }
  },
  computed: {
    isError() {
      if (this.limit) {
        return !!(this.error || +this.limit < +this.modelValue);
      } else {
        return !!this.error;
      }
    }
  },
  methods: {
    updateValueModel(event) {
      this.$emit(EVENTS.updateModelValue, event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/app-variables";

.field-input {
  display: flex;
  flex-direction: column;
  text-align: start;
}
.field-input__title {
  font-size: 0.65rem;

  .field-input--invalid & {
    color: $field-input-invalid-text-text;
  }
}
.field-input__input {
  font-size: large;
  height: 1.5rem;
  width: 9rem;
  align-self: end;

  .field-input--invalid & {
    color: $field-input-invalid-input-text;
    border-bottom: 1px solid $field-input-invalid-input-border;
  }
}
.field-input__error-message {
  color: $field-input-invalid-text-text;
}

</style>