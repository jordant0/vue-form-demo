<script>
  export default {
    name: 'VueForm',

    props: {
      errors: {
        type: Object,
        default() {
          return {};
        },
      }
    },

    data() {
      return {
        formErrors: this.errors,
      };
    },

    provide() {
      return {
        formErrors: this.formErrors,
        registerField: this.registerField,
      };
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
    },
  }
</script>

<template>
  <form class='vue-form' @submit.prevent='submitForm'>
    <slot />

    <button @click.prevent='clearErrors'>Cancel</button>
  </form>
</template>
