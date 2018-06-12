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

    provide() {
      return {
        formErrors: this.formErrors,
        formOptions: this.formOptions,
        registerField: this.registerField,
      };
    },

    mounted() {
      this.$on('vue-form:input-update', this.handleInput);
    },

    methods: {
      registerField(fieldName, fieldError) {
        this.$set(this.formErrors, fieldName, fieldError);
      },

      submitForm() {
        Object.assign(this.formErrors, {
          user_name: 'Test',
        });
      },

      clearErrors() {
        for (var field in this.formErrors) {
          this.formErrors[field] = null;
        }
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

    <button @click.prevent="clearErrors">Cancel</button>
  </form>
</template>
