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

    watch: {
      formErrors: {
        handler() {
          console.log('Watch event trigger');
        },
        deep: true,
      },
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
          this.$emit('input', event.target.value);

          if(this.$parent && this.$parent.$options.name === 'VueForm') {
            this.$parent.$emit('vue-form:input', event, this.name);
          }
        }
      },
    }
  }
</script>

<template>
  <div :class="['form-control', fieldError ? 'form-control--error' : '']">
    <div class="form-control_input-wrapper">
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
    </div>

    <div v-if="displayErrorMsg" class="form-control_error">
      {{ fieldError }}
    </div>
  </div>
</template>

<style scoped>
  .form-control {
    padding: 12px 0;
    position: relative;
  }

  .form-control_input-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 30px; */
  }

  .form-control_label {
    font-weight: 600;
  }

  .form-control_input {
    width: 200px;
    padding: 4px 8px;
    border: 1px solid lightgray;
  }

  .form-control_error {
    /* position: absolute;
    bottom: 12px;
    right: 0; */
    margin-top: 8px;
    text-align: right;
  }

  .form-control--error {
    color: darkred;
  }

  .form-control--error .form-control_input {
    border-color: darkred;
  }
</style>
