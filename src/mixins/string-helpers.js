export default {
  filters: {
    pluralize(count, string) {
      if(count === 1) {
        return string;
      }

      return `${string}s`;
    },
  },

  methods: {
    kebabCase(string) {
      return string.toLowerCase().replace(/[^a-z0-9]/g, '-');
    },

    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    titleize(string) {
      let self = this;

      return string.split(/[\s_-]/).map((word) => self.capitalize(word))
        .join(' ');
    },

    pascalCase(string) {
      return this.titleize(string).replace(/[^a-zA-Z0-9]/g, '');
    },
  },
};
