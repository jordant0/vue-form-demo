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
      },
    }
  }
</script>

<template>
  <vue-form :input-event="true" :errors="errors">
    <vue-input name="user_name" />

    <vue-input name="password" />

    <button type="submit" @click='submitForm'>Submit</button>
    <button @click.prevent="clearErrors">Cancel</button>
  </vue-form>
</template>
