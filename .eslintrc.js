module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': [
        `eslint:recommended`,
        `plugin:@typescript-eslint/recommended`
    ],
    'overrides': [
    ],
    'parser': `@typescript-eslint/parser`,
    'parserOptions': {
        'ecmaVersion': `latest`
    },
    'plugins': [
        `@typescript-eslint`
    ],
    'rules': {
        '@typescript-eslint/no-var-requires': 0,
        'indent': [
            `error`,
            4
        ],
        /*'indent': [
            'error',
            'tab'
        ],*/
        'linebreak-style': 0,
        /*'linebreak-style': [
            'error',
            'windows'
        ],*/
        'quotes': [
            `error`,
            `backtick`,
            `single`
        ],
        'semi': [
            `error`,
            `never`
        ]
    }
}
