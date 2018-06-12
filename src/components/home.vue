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
    }
  }
</script>

<template>
  <vue-form>
    <vue-input name="user_name" />

    <vue-input name="password" />

    <button type="submit" @click='submitForm'>Submit</button>
  </vue-form>
</template>
