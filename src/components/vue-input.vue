<script>
  export default {
    name: 'VueInput',

    inject: [
      'errorMsg',
      'registerField'
    ],

    props: {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'text',
      },
      value: {
        type: [ String, Number ],
        default: null,
      }
    },

    created() {
      this.registerField(this.name);
    },
  }
</script>

<template>
  <div>
    <div v-if='errorMsg[name]'>
      {{ errorMsg[name] }}
    </div>
    <input :name="name" :type="type" :value="value" @input="$emit('input-value', $event.target.value)">
  </div>
</template>
