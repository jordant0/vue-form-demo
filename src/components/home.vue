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
  }
</script>

<template>
  <vue-form>
    <vue-input name="userName" />
  </vue-form>
</template>
