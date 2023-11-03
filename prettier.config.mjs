export default {
	plugins: ['@ianvs/prettier-plugin-sort-imports'],
	trailingComma: 'all',
	tabWidth: 2,
	semi: false,
	singleQuote: true,
	useTabs: true,
	jsxSingleQuote: true,
	importOrder: [
		'react/*',
		// '@/components/*',
		'^[./]',
	],
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
}
