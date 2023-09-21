module.exports = {
    'env': {
        'browser': true,
        'node': true,
        'es2021': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'eqeqeq': 2,
        'no-trailing-spaces': 2,
        'object-curly-spacing': [
            2, 'always'
        ],
        'arrow-spacing': [
            2, { 'before': true, 'after': true }
        ],
        'linebreak-style': [
            2,
            'windows'
        ],
        'quotes': [
            2,
            'single'
        ],
        'semi': [
            2,
            'never'
        ],
        'no-console': 0
    }
}
