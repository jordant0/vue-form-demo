<script>
  import StringHelpers from '@/mixins/string-helpers.js';

  export default {
    name: 'VueInput',

    mixins: [
      StringHelpers
    ],

    inject: [
      'formErrors',
      'formOptions',
      'registerField',
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

      emitOnInput: {
        type: Boolean,
        default: undefined,
      }
    },

    created() {
      this.registerField(this.name, this.error);
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

      emitEvent() {
        if(typeof this.emitOnInput === 'undefined') {
          return this.formOptions.inputEvent;
        }
        else {
          return this.emitOnInput;
        }
      },
    },

    methods: {
      handleInput(event) {
        if(this.emitEvent) {
          this.$emit('vue-input-update', event, this.name);

          if(this.$parent && this.$parent.$options.name === 'VueForm') {
            this.$parent.$emit('vue-form:input-update', event, this.name);
          }
        }
      },
    }
  }
</script>

<template>
  <div :class="['form-control', fieldError ? 'form-control--error' : '']">
    <label :for="name" class="form-control_label">
      {{ displayLabel }}
    </label>

    <input
      :name="name"
      :type="type"
      :value="value"
      class='form-control_input'
      @input="handleInput"
    >

    <div v-if="displayErrorMsg">
      {{ fieldError }}
    </div>
  </div>
</template>
