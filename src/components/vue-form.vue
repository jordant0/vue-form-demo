<script>
  export default {
    name: 'VueForm',

    props: {
      errors: {
        type: Object,
        default() {
          return {};
        },
      },

      inputEvent: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        formErrors: this.errors,
        formOptions: {
          inputEvent: this.inputEvent,
        },
        message: {
          type: 'info',
          text: '',
        },
      };
    },

    watch: {
      errors() {
        this.setErrors(this.errors);
      },
    },

    provide() {
      return {
        formErrors: this.formErrors,
        formOptions: this.formOptions,
        registerField: this.registerField,
      };
    },

    mounted() {
      this.$on('vue-form:input', this.handleInput);
    },

    methods: {
      registerField(fieldName, fieldError) {
        this.$set(this.formErrors, fieldName, fieldError);
      },

      setErrors(newErrors) {
        for(var field in this.formErrors) {
          var value = null;
          if(newErrors[field]) {
            if(typeof newErrors[field] === 'object') {
              value = newErrors[field].join(' ');
            }
            else {
              value = newErrors[field];
            }
          }
          this.$set(this.formErrors, field, value || null);
        }
      },

      clearErrors() {
        this.setErrors({});
      },

      showMessage(message, type, delay) {
        this.message.text = message;
        if(type) {
          this.message.type = type;
        }
        if(delay) {
          setTimeout(this.clearMessage, delay);
        }
      },

      clearMessage() {
        this.message.text = '';
      },

      submitForm(event) {
        this.clearErrors();
        this.clearMessage();
        Api.postRequest(new FormData(this.$el))
        .then(
          this.submitSuccess,
          this.submitFailure,
        );
      },

      submitSuccess(data) {
        this.showMessage('Form submit succeeded.', 'success', 3000);
        this.$emit('vue-form-success');
      },

      submitFailure(data) {
        this.showMessage('Form submit failed. Please check fields for errors.', 'error');
        this.setErrors(data.errors);
        this.$emit('vue-form-failure');
      },

      handleInput(event, fieldName) {
        console.log(`${fieldName} input: ${event.target.value}`);
      },
    },
  }
</script>

<template>
  <form class="vue-form" @submit.prevent="submitForm">
    <div
      v-if="message.text && message.text.length"
      :class="['vue-form_message', `vue-form_message--${message.type}`]"
    >
      {{ message.text }}
    </div>

    <div class='vue-form_content'>
      <slot />
    </div>

    <div class="vue-form_actions">
      <slot name="form-actions">
        <button type="submit">Submit</button>
      </slot>
    </div>
  </form>
</template>

<style scoped>
  .vue-form {
    width: 400px;
    margin: auto;
  }

  .vue-form_message {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #547b96;
    background-color: #e7f6fb;
  }

  .vue-form_message--success {
    border-color: #376739;
    background-color: #e7ffee;
  }

  .vue-form_message--error {
    border-color: #965454;
    background-color: #fbeded;
  }
</style>
