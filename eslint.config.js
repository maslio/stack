import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
}, {
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
    'style/max-statements-per-line': ['error', {
      max: 2,
    }],
    "arrow-body-style": ["error", "as-needed"],
    "curly": ["error", "multi-or-nest", "consistent"]
  },
})
