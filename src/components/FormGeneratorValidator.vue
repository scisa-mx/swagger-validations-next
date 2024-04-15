<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="row m-1 rounded mx-0">
        <div v-for="(value, key) in filteredModel" :key="key" class="col-sm-6">
          <input-validator
            v-if="value.type === 'input'"
            :model="model"
            :model-key="key"
            :input-ref="key"
            :label="value.label"
            :value="model[key].value"
            @input="model[key].value = $event"
          />
          <num-input-validator
            v-else-if="value.type === 'numInput'"
            :model="model"
            :model-key="key"
            :input-ref="key"
            :label="value.label"
            :value="model[key].value"
            @input="model[key].value = $event"
          />
          <checkbox-validator
            v-else-if="value.type === 'checkbox'"
            :model="model"
            :model-key="key"
            :input-ref="key"
            :label="value.label"
            :value="model[key].value"
            @input="model[key].value = $event"
          />
        </div>
        <div class="col-sm-12 d-flex justify-content-end">
          <button type="submit" class="btn btn-primary text-white">
            {{ "save" }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputValidator from "./InputValidator.vue";
import CheckboxValidator from "./CheckboxValidator.vue";
import NumInputValidator from "./NumInputValidator.vue";
import {
  getModelValues,
  handleSwaggerValidationErrorMessages,
} from "../helpers.ts";
import { validateForm } from "../formValidations.ts";

export default defineComponent({
  name: "FormGeneratorValidator",
  components: {
    InputValidator,
    CheckboxValidator,
    NumInputValidator,
  },
  props: {
    model: {
      type: Object as () => Record<string, any>,
      default: () => ({}),
    },
    spec: {
      type: String as () => string,
      default: () => "",
    },
    refs: {
      type: Object as () => Record<string, any>,
      default: () => ({}),
    },
    ifValid: {
      // @ts-ignore
      type: Function as () => () => void,
      default: () => () => {},
    },
    validate: {
      type: Boolean as () => boolean,
      default: () => false,
    },
  },
  computed: {
    filteredModel(): Record<string, any> {
      return Object.entries(this.model)
        .filter(([_, value]) => value.display)
        .reduce((obj, [key, value]) => {
          // @ts-ignore
          obj[key] = value;
          return obj;
        }, {});
    },
  },
  watch: {
    validate() {
      this.handleSubmit();
    },
  },
  methods: {
    handleSubmit() {
      // remove previous validation classes and errors
      let refs: Record<string, any> = {};
      // @ts-ignore
      for (const children in this.$children) {
        // @ts-ignore
        refs = { ...refs, ...this.$children[children].$refs };
      }
      for (const refKey in refs) {
        if (refKey.endsWith("-input")) {
          refs[refKey].$el.classList.remove("is-invalid");
        }
        if (refKey.endsWith("-error")) {
          refs[`${refKey}`].classList.remove("d-flex");
          refs[`${refKey}`].classList.add("d-none");
        }
      }
      // validate form with swagger spects
      validateForm({ model: getModelValues(this.model), spec: this.spec })
        .then(() => {
          this.ifValid();
        })
        .catch((errors: any) => {
          handleSwaggerValidationErrorMessages(errors, refs);
        });
    },
  },
});
</script>
