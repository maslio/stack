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
        max: 3,
      },
    }],
    'style/max-statements-per-line': ['error', {
      max: 2,
    }],
    // 'arrow-body-style': ['error', 'as-needed'],
    'curly': ['error', 'multi-or-nest', 'consistent'],
    'vue/attributes-order': ['error', {
      order: [
        'CONDITIONALS',
        'LIST_RENDERING',
        'RENDER_MODIFIERS',
        'GLOBAL',
        'UNIQUE',
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT',
        'DEFINITION',
        'SLOT',
      ],
      alphabetical: false,
    }],
  },
})
