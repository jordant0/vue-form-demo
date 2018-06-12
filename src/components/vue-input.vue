<script>
  import StringHelpers from '@/mixins/string-helpers.js';

  export default {
    name: 'VueInput',

    mixins: [
      StringHelpers
    ],

    inject: [
      'formErrors',
      'registerField'
    ],

    props: {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'text',
      },
      value: {
        type: [ String, Number ],
        default: null,
      },
      label: {
        type: String,
        default: null,
      },
      error: {
        type: [ String, Boolean ],
        default: null,
      },
    },

    computed: {
      displayLabel() {
        return this.label || this.titleize(this.name);
      },

      fieldError() {
        return this.formErrors[this.name];
      },

      displayErrorMsg() {
        return typeof this.fieldError === 'string' && this.fieldError.length;
      },
    },

    created() {
      this.registerField(this.name, this.error);
    },
  }
</script>

<template>
  <div :class='["form-control", fieldError ? "form-control--error" : ""]'>
    <label :for='name' class='form-control_label'>
      {{ displayLabel }}
    </label>

    <input
      :name="name"
      :type="type"
      :value="value"
      class='form-control_input'
      @input="$emit('input-value', $event.target.value)"
    >

    <div v-if='displayErrorMsg'>
      {{ fieldError }}
    </div>
  </div>
</template>
