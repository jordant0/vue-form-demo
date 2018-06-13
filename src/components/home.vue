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
      };
    },

    methods: {
      submitForm(event) {
        if(this.disableSubmit) {
          event.stopPropagation();
          event.preventDefault();
        }
      },

      clearErrors() {
        this.errors = {};
        this.name = '';
      },
    }
  }
</script>

<template>
  <vue-form :input-event="true" :errors="errors">
    <vue-input name="user_name" v-model="name" />

    <vue-input name="password"  v-model="password" />

    <template slot="form-actions">
      <button type="submit" @click='submitForm'>Submit</button>
      <button @click.prevent="clearErrors">Cancel</button>
    </template>
  </vue-form>
</template>
