import defaultDecorators from './default-decorators';
import defaultStyles from './default-styles';

/**
 * @typedef {(text: string, stripAccents?: boolean) => string} StyleFunction
 */

/**
 * @typedef {object} Decorator
 * @prop {string} left
 * @prop {string} right
 * @prop {string} [preferedStyle]
 */

/**
 * @typedef {object} TextDecoratorOptions
 * @prop {string} [leftDecorator]
 * @prop {string} [rightDecorator]
 * @prop {boolean} [normalizeResult]
 * @prop {boolean} [stripAccents]
 */

/**
 * Decorates a character if it's not a combining mark.
 *
 * @param {string} char
 * @param {string} decorator
 */
export function decorateNonCombiningMark(char, decorator) {
	if ((/\p{Mark}|\s/giu).test(char)) {
		return char;
	}

	return `${char}${decorator}`;
}

/**
 * Encloses a character if it's not a combining mark.
 *
 * @param {string} char
 * @param {string} left
 * @param {string} right
 */
export function encloseNonCombiningMark(char, left, right) {
	if ((/\p{Mark}|\s/giu).test(char)) {
		return char;
	}

	return `${left}${char}${right}`;
}

/**
 * Removes the character if it is a combining mark.
 * @param {string} char
 */
export function stripCombiningMark(char) {
	if ((/\p{Mark}/giu).test(char)) {
		return '';
	}

	return char;
}

/**
 * Produces a string transformation function based on the given map.
 *
 * @param {Map<string, string>} map
 * @returns {StyleFunction}
 */
export function createMappingFunction(map) {
	return (text, stripAccents = true) => {
		let filteredText = [...text];

		if (stripAccents) {
			filteredText = filteredText.map(stripCombiningMark).filter((char) => char !== '');
		}

		return [...filteredText].map((char) => map.get(char) ?? map.get(char.toLowerCase()) ?? char).join('');
	};
}

/**
 * Produces a string transformation function based on the given function.
 * @param {(char: string, index: number, array: ThisParameterType<string[]>) => string} func
 * @returns {StyleFunction}
 */
export function createTransformationFunction(func) {
	return (text, stripAccents = true) => {
		let filteredText = [...text];

		if (stripAccents) {
			filteredText = filteredText.map(stripCombiningMark).filter((char) => char !== '');
		}

		return [...filteredText].map(func).join('');
	};
}

const DEFAULT_STYLES = {
	// Mapping functions
	...Object.entries(defaultStyles).reduce((styles, [name, map]) => {
		// @ts-expect-error
		styles[name] = createMappingFunction(map);

		return styles;
	}, /** @type {Record<keyof typeof defaultStyles, StyleFunction>} */ ({})),

	// Transformation functions
	'Parens': createTransformationFunction((char) => encloseNonCombiningMark(char, '〖', '〗')),
	'Wavy': createTransformationFunction((char) => encloseNonCombiningMark(char, '〰', '〰')),
	'Brackets': createTransformationFunction((char) => encloseNonCombiningMark(char, '〔', '〕')),
	'Angle Brackets': createTransformationFunction((char) => encloseNonCombiningMark(char, '《', '》')),
	'Enclosed': createTransformationFunction((char) => encloseNonCombiningMark(char, '『', '』')),
	'Semi Enclosed': createTransformationFunction((char) => encloseNonCombiningMark(char, '【', '】')),
	'Double Lined': createTransformationFunction((char) => decorateNonCombiningMark(char, '\u0332\u0305')),
	'Hearts': createTransformationFunction((char) => decorateNonCombiningMark(char, '♥')),
	'Striked': createTransformationFunction((char) => decorateNonCombiningMark(char, '\u0336')),
	'Deleted': createTransformationFunction((char) => decorateNonCombiningMark(char, '\u0338')),
	'Camel Case': createTransformationFunction((char, index) => {
		const EVEN = 2;

		if (index % EVEN === 0) {
			return char.toUpperCase();
		}

		return char.toLowerCase();
	}),
	'Inverted': (/** @type {string} */ text) => [...text].reverse().join(''),
	'Matrix': createTransformationFunction((char) => {
		const RANDOM_CONST = 7;
		const MATRIX_MARKS = ['\u033f', '\u0347', '\u033f\u0347', '\u0305', '\u0332', '\u0305\u0332', '\u0336', '\u0347'];
		const selectedSymbol = MATRIX_MARKS[Math.floor(Math.random() * RANDOM_CONST)] ?? '';

		return decorateNonCombiningMark(char, selectedSymbol);
	}),
	'Double Letters': createTransformationFunction((char) => decorateNonCombiningMark(char, char)),
	'Double Some Letters': createTransformationFunction((char) => {
		const RANDOM_CONST = 2;
		const repeatTimes = Math.floor(Math.random() * RANDOM_CONST);

		return decorateNonCombiningMark(char, char.repeat(repeatTimes));
	})
};

/** @readonly */
const DEFAULT_DECORATORS = {
	...Object.entries(defaultDecorators).reduce((decorators, [name, decorator]) => {
		// @ts-expect-error
		decorators[name] = decorator;

		return decorators;
	}, /** @type {Record<keyof typeof defaultDecorators, Decorator>} */ ({})),

	'Next Year': {
		left: (new Date().getFullYear() + 1).toString(),
		right: (new Date().getFullYear() + 1).toString()
	},
	'Current Year': {
		left: new Date().getFullYear().toString(),
		right: new Date().getFullYear().toString()
	},
	'New Year': {
		left: DEFAULT_STYLES['Lower Numbers']?.(new Date().getFullYear().toString()) ?? '',
		right: DEFAULT_STYLES['Upper Numbers']?.((new Date().getFullYear() + 1).toString()) ?? ''
	}
};

export class TextDecorator {
	/** @type {Map<string, StyleFunction>} */
	#styles = new Map();
	/** @type {Map<string, Decorator>} */
	#decorators = new Map();

	/**
	 * @param {Record<string, StyleFunction>} [styles]
	 * @param {Record<string, Decorator>} [decorators]
	 */
	constructor(styles = DEFAULT_STYLES, decorators = DEFAULT_DECORATORS) {
		for (const [name, style] of Object.entries(styles)) {
			this.addStyle(name, style);
		}

		for (const [name, decorator] of Object.entries(decorators)) {
			this.addDecorator(name, decorator);
		}
	}

	/**
	 * Decorate a string with the given style.
	 *
	 * @param {string} text
	 * @param {string} [style='nostyle']
	 * @param {TextDecoratorOptions} [options={}]
	 */
	decorateText(text, style = 'nostyle', options = {}) {
		const resolvedOptions = {
			leftDecorator: '',
			rightDecorator: '',
			normalizeResult: false,
			stripAccents: true,
			...options
		};

		const leftDecorator = this.#decorators.get(resolvedOptions.leftDecorator)?.left ?? '';
		const rightDecorator = this.#decorators.get(resolvedOptions.rightDecorator)?.right ?? '';

		const normalizedText = text.normalize('NFD');
		const transformedText = this.#styles.get(style)?.(normalizedText, resolvedOptions.stripAccents) ?? normalizedText;
		let finalText = transformedText;

		if (resolvedOptions.normalizeResult) {
			finalText = transformedText.normalize('NFC');
		}

		return `${leftDecorator}${finalText}${rightDecorator}`;
	}

	/**
	 * @param {string} name
	 * @param {StyleFunction} style
	 */
	addStyle(name, style) {
		this.#styles.set(name, style);
	}

	/**
	 * @param {string} name
	 */
	removeStyle(name) {
		this.#styles.delete(name);
	}

	listStyles() {
		return [...this.#styles.keys()];
	}

	/**
	 * @param {string} name
	 */
	getStyle(name) {
		return this.#styles.get(name);
	}

	/**
	 * @param {string} name
	 * @param {Decorator} decorator
	 */
	addDecorator(name, decorator) {
		return this.#decorators.set(name, decorator);
	}

	/**
	 * @param {string} name
	 */
	removeDecorator(name) {
		this.#decorators.delete(name);
	}

	listDecorators() {
		return [...this.#decorators.keys()];
	}

	/**
	 * @param {string} name
	 */
	getDecorator(name) {
		return this.#decorators.get(name);
	}
}
