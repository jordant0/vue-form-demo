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

      submitForm(event) {
        Api.postRequest(new FormData(this.$el))
        .then(
          this.submitSuccess,
          this.submitFailure,
        );
      },

      submitSuccess(data) {
        console.log('Submit success');
        this.clearErrors;
      },

      submitFailure(data) {
        this.setErrors(data.errors);
      },

      handleInput(event, fieldName) {
        console.log(`${fieldName} input: ${event.target.value}`);
      },
    },
  }
</script>

<template>
  <form class="vue-form" @submit.prevent="submitForm">
    <slot />
  </form>
</template>
