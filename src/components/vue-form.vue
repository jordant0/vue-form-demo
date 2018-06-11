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
        errorMsg: this.errors,
      };
    },

    provide() {
      return {
        errorMsg: this.errorMsg,
        registerField: this.registerField,
      };
    },

    methods: {
      registerField(fieldName) {
        this.$set(this.errorMsg, fieldName, null);
      },

      handleSubmit() {
        Object.assign(this.errorMsg, {
          userName: 'Test',
        });
      },

      handleCancel() {
        for (var field in this.errorMsg) {
          this.errorMsg[field] = null;
        }
      },
    },
  }
</script>

<template>
  <form class='vue-form'>
    <slot />

    <button @click.prevent='handleSubmit'>Submit</button>
    <button @click.prevent='handleCancel'>Cancel</button>
  </form>
</template>
