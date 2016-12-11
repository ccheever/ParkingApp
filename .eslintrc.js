module.exports = {
  'installedESLint': true,
  'extends': [
    'recommended/esnext',
    'recommended/esnext/style-guide',
    'recommended/node',
    'recommended/node/style-guide',
    'recommended/react-native',
    'recommended/react-native/style-guide'
  ],
  'rules': {
    'indent': ['error', 2],
    'no-duplicate-imports': 'off',
    'object-property-newline': ['error', {
      allowMultiplePropertiesPerLine: true,
    }],
    'sort-imports': 'off',
    'react/jsx-indent': [2, 2],
    'react/jsx-curly-spacing': [2, 'never'],
    'react-native/no-inline-styles': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-sort-props': 'off'
  }
};