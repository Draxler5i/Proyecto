module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: ['standard-with-typescript', 'eslint-config-prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json'],
	},
	rules: {
		'@typescript-eslint/no-misused-promises': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/restrict-plus-operands': 'off',
	},
}
