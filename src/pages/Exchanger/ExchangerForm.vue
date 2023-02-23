<template>
  <form class="exchanger-form" @submit.prevent="">
    <div class="exchanger-form__controls">
      <div class="exchanger-form__control">
        <field-select v-model="state.givenSum.select">
          <option v-for="cur in currencies" :key="cur">
            {{ cur.toUpperCase() }}
          </option>
        </field-select>
        <field-input
            :label="`Сумма в ${state.givenSum.select}`"
            :error="errorGivenMessage"
            v-model="state.givenSum.value"
            @input="enterGivenInput"
        />
      </div>

      <img src="@/../img/exchange.png" class="exchanger-form__img">

      <div class="exchanger-form__control">
        <field-select v-model="state.receivedSum.select">
          <option v-for="cur in currencies" :key="cur">
            {{ cur.toUpperCase() }}
          </option>
        </field-select>
        <field-input
            :label="`Сумма в ${state.receivedSum.select}`"
            :error="errorReceivedMessage || errorReceivedMessageLimit"
            :limit="reserved[curReceived]"
            v-model="state.receivedSum.value"
            @input="enterReceivedInput"
        />
      </div>
    </div>

    <button class="exchanger-form__button" disabled v-if="v$.$invalid" >УКАЖИТЕ СУММУ</button>
    <router-link
        :to="{name: routes.congratulation}"
        class="exchanger-form__button exchanger-form__button-link" v-else
    >ОБМЕНЯТЬ</router-link>
  </form>
</template>

<script>
import {reserve} from "@/helpers/reserve";
import {DEFAULT_CURRENCY} from "@/constants/currency-constant";
import {emitter} from "@/helpers/emitter";
import { required, numeric, minValue } from "@vuelidate/validators";
import { reactive } from 'vue'
import useVuelidate from "@vuelidate/core";
import FieldSelect from "@/components/FieldSelect";
import {ROUTES_NAME} from "@/constants/path-constants";
import FieldInput from "@/components/FieldInput";
import isLimitedValue from "@/mixins/validation.mixin";
import {EVENTS_NAME} from "@/constants/emit-constants";

export default {
  components: {FieldInput, FieldSelect },
  mixins: [isLimitedValue],
  name: 'exchanger-form',

  setup() {
    const state = reactive({
      givenSum: {
        value: '',
        select: '',
      },
      receivedSum: {
        value: '',
        select: '',
      }
    })

    const rules = {
      givenSum: {
        value: {required, numeric, minValue: minValue(0)},
        select: {required},
      },
      receivedSum: {
        value: {required, numeric, minValue: minValue(0)},
        select: {required},
      }
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },
  data() {
    return {
      reserved: reserve,
      routes: ROUTES_NAME,
      currencies: Object.keys(DEFAULT_CURRENCY),
    }
  },
  methods: {
    enterGivenInput() {
      !isNaN(this.conventTo) ?
      this.state.receivedSum.value = this.conventTo : this.state.receivedSum.value = 'Error';
      this.v$.givenSum.value.$touch();
      this.v$.receivedSum.value.$touch();
    },
    enterReceivedInput() {
      !isNaN(this.conventFrom) ?
      this.state.givenSum.value = this.conventFrom : this.state.givenSum.value = 'Error';
      this.v$.givenSum.value.$touch();
      this.v$.receivedSum.value.$touch();
    },
    findRate() {
      return DEFAULT_CURRENCY[this.curGiven] / DEFAULT_CURRENCY[this.curReceived];
    },
    findReserve() {
      const curReceived = this.state.receivedSum.select.toLowerCase();
      for (let cur in this.reserved) {
        if (cur === curReceived) {
          return `${this.reserved[cur]} ${cur.toUpperCase()}`;
        }
      }
    },
    selectCurrency() {
      if (this.state.givenSum.select && this.state.receivedSum.select) {
        const rate = `1 ${this.state.givenSum.select} = ${this.findRate()} ${this.state.receivedSum.select}`;
        emitter.emit(EVENTS_NAME.sendRate, rate);
        if (isNaN(this.state.givenSum.value)) this.enterReceivedInput(this.state.receivedSum.value);
        if (isNaN(this.state.receivedSum.value)) this.enterGivenInput(this.state.givenSum.value);
      }
      if (this.state.receivedSum.select) {
        const reserve = this.findReserve();
        emitter.emit(EVENTS_NAME.sendReserve, reserve);
      }
    }
  },
  computed: {
    curGiven() {
      return this.state.givenSum.select.toLowerCase();
    },
    curReceived() {
      return this.state.receivedSum.select.toLowerCase();
    },
    errorReceivedMessage() {
      return this.v$.receivedSum.value.$errors[0]?.$message;
    },
    errorGivenMessage() {
      return this.v$.givenSum.value.$errors[0]?.$message;
    },
    errorReceivedMessageLimit() {
      return this.isLimitedValue(this.state.receivedSum.value, this.reserved[this.curReceived]);
    },
    conventTo() {
      return this.state.givenSum.value * this.findRate();
    },
    conventFrom() {
      return this.state.receivedSum.value / this.findRate();
    }
  },
  updated() {
    this.selectCurrency()
  }
}
</script>

<style lang="scss" scoped>

@import "~@/styles/app-variables";

.exchanger-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  margin: 1rem 0 2rem;
}
.exchanger-form__controls {
  display: flex;
}
.exchanger-form__control {
  display: flex;
  height: 3.125rem;
  margin: 0 3rem;
  gap: 1rem;
}
.exchanger-form__button {
  border: 0.0625rem solid $exchanger-form-button-border;
  width: 9rem;
  height: 2rem;
  align-self: center;
}
.exchanger-form__button-link {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $exchanger-form-button-link-text;
  background-color: $exchanger-form-button-link-background;
  text-decoration: none;
}
.exchanger-form__img {
  width: 0.8rem;
  height: 0.8rem;
  align-self: center;
}

</style>
