<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input
      :ref="`${inputRef}-input`"
      v-model="localModel[modelKey].value"
      type="checkbox"
      class="form-check-input"
    />
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
      type: Boolean,
      required: true,
    },
    modelKey: {
      type: String,
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
