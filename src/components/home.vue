<script>
  import VueForm from '@/components/vue-form';
  import VueInput from '@/components/vue-input';

  export default {
    name: 'Home',

    metaInfo: {
      title: 'Vue Form Demo',
      link: [
        { rel: 'shortcut icon', type: 'image/png', href: '/static/favicon.png?v=5' },
      ]
    },

    components: {
      VueForm,
      VueInput,
    },

    data() {
      return {
        errors: {},
        disableSubmit: false,
        name: '',
        password: '',
        submitting: false,
      };
    },

    methods: {
      submitForm(event) {
        if(this.disableSubmit) {
          event.stopPropagation();
          event.preventDefault();
        }
      },

      clearForm() {
        this.errors = {};
        this.name = '';
        this.password = '';
      },
    }
  }
</script>

<template>
  <vue-form
    :input-event="true"
    :errors="errors"
    @vue-form-submit="submitting = true"
    @vue-form-success="clearForm"
    @vue-form-done="submitting = false"
  >
    <vue-input name="user_name" v-model="name" />

    <vue-input name="password"  v-model="password" />

    <template slot="form-actions">
      <button type="submit" @click='submitForm' :disabled='submitting'>
        {{ submitting ? 'Submitting...' : 'Submit' }}
      </button>
      <button @click.prevent="clearForm">Cancel</button>
    </template>
  </vue-form>
</template>

<style>
  button {
    padding: 4px 8px;
    margin: 0 4px;
  }
</style>
