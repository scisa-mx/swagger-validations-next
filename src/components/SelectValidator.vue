<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <select
      :ref="`${inputRef}-input`"
      v-model="localModel[modelKey].value"
      class="form-control"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <small :ref="`${inputRef}-error`" class="d-none"> ERROR </small>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    inputRef: {
      type: String,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
    value: {
      type: [Number, String],
      required: true,
    },
    modelKey: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  computed: {
    localModel: {
      get() {
        return this.model;
      },
      set(value) {
        this.$emit("update:model", value);
      },
    },
  },
};
</script>
