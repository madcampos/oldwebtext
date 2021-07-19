/* eslint-disable @typescript-eslint/naming-convention */

import defaultStyles from './default-styles.json';
import defaultDecorators from './default-decorators.json';

type CharacterMap = Map<string, string>;
type StyledText = string;
export type StyleFunction = (text: string, isCaseInsensitive?: boolean) => StyledText;
export type CharacterMappingFunction = (map: CharacterMap) => StyleFunction;

/**
 * Produces a string transformation function based on the given map.
 */
export function createMappingFunction(map: Map<string, string>): StyleFunction {
	return (text: string) => [...text].map((char) => map.get(char) ?? map.get(char.toLowerCase()) ?? char).join('');
}

/**
 * Decorates a character if it's not a combining mark.
 */
export function decorateNonCombiningMark(char: string, decorator: string) {
	if ((/\p{Mark}/giu).test(char)) {
		return char;
	}

	return `${char}${decorator}`;
}

/**
 * Encloses a character if it's not a combining mark.
 */
export function encloseNonCombiningMark(char: string, left: string, right: string) {
	if ((/\p{Mark}/giu).test(char)) {
		return char;
	}

	return `${left}${char}${right}`;
}

type TransformationFunctionParameter = (char: string, index: number, array: ThisParameterType<string[]>) => string;
export type TransformationFunction = (text: string) => string;

/**
 * Produces a string transformation function based on the given function.
 */
export function createTransformationFunction(func: TransformationFunctionParameter): TransformationFunction {
	return (text: string) => [...text].map(func).join('');
}

export interface Decorator {
	left: string,
	right: string
}
export type DecoratorList = Record<string, Decorator>;
type DecoratorsMap = Map<string, Decorator>;

const DEFAULT_DECORATORS: DecoratorList = {
	...Object.entries(defaultDecorators as Record<string, Decorator>).reduce((decorators, [name, decorator]) => {
		decorators[name] = decorator;

		return decorators;
	}, {}),

	'Next Year': {
		left: (new Date().getFullYear() + 1).toString(),
		right: (new Date().getFullYear() + 1).toString()
	},
	'Current Year': {
		left: new Date().getFullYear().toString(),
		right: new Date().getFullYear().toString()
	}
};

type TextStyleList = Record<string, StyleFunction>;
type StylesMap = Map<string, StyleFunction>;

const DEFAULT_STYLES: TextStyleList = {
	//Mapping functions
	...Object.entries(defaultStyles as unknown as Record<string, [string, string][]>).reduce((styles, [name, map]) => {
		styles[name] = createMappingFunction(new Map(map));

		return styles;
	}, {}),

	//Transformation functions
	Parens: createTransformationFunction((char: string) => encloseNonCombiningMark(char, '〖', '〗')),
	Wavy: createTransformationFunction((char: string) => encloseNonCombiningMark(char, '〰', '〰')),
	Brackets: createTransformationFunction((char: string) => encloseNonCombiningMark(char, '〔', '〕')),
	'Angle Brackets': createTransformationFunction((char: string) => encloseNonCombiningMark(char, '《', '》')),
	Enclosed: createTransformationFunction((char: string) => encloseNonCombiningMark(char, '『', '』')),
	'Semi Enclosed': createTransformationFunction((char: string) => encloseNonCombiningMark(char, '【', '】')),
	'Double Lined': createTransformationFunction((char: string) => decorateNonCombiningMark(char, '\u0332\u0305')),
	Hearts: createTransformationFunction((char: string) => decorateNonCombiningMark(char, '♥')),
	Striked: createTransformationFunction((char: string) => decorateNonCombiningMark(char, '\u0336')),
	Deleted: createTransformationFunction((char: string) => decorateNonCombiningMark(char, '\u0338')),
	'Camel Case': createTransformationFunction((char: string, index: number) => {
		const EVEN = 2;

		if (index % EVEN === 0) {
			return char.toUpperCase();
		}

		return char.toLowerCase();
	}),
	Inverted: (text) => [...text].reverse().join(''),
	Matrix: createTransformationFunction((char: string) => {
		const RANDOM_CONST = 7;
		const MATRIX_MARKS = ['\u033f', '\u0347', '\u033f\u0347', '\u0305', '\u0332', '\u0305\u0332', '\u0336', '\u0347'];
		const selectedSymbol = MATRIX_MARKS[Math.floor(Math.random() * RANDOM_CONST)];

		return decorateNonCombiningMark(char, selectedSymbol);
	}),
	'Double Letters': createTransformationFunction((char: string) => decorateNonCombiningMark(char, char)),
	'Double Some Letters': createTransformationFunction((char: string) => {
		const RANDOM_CONST = 2;
		const repeatTimes = Math.floor(Math.random() * RANDOM_CONST);

		return decorateNonCombiningMark(char, char.repeat(repeatTimes));
	}),
	'New Year': (text) => {
		/* eslint-disable new-cap */
		const left = DEFAULT_STYLES['Lower Numbers'](DEFAULT_DECORATORS['Current Year'].left);
		const right = DEFAULT_STYLES['Upper Numbers'](DEFAULT_DECORATORS['Next Year'].right);
		/* eslint-enable new-cap */

		return `~${left}~ ${text} ~${right}~`;
	}
};

export interface TextDecoratorOptions {
	leftDecorator?: string,
	rightDecorator?: string
}

export class TextDecorator {
	#styles: StylesMap = new Map();
	#decorators: DecoratorsMap = new Map();

	constructor(styles: TextStyleList = DEFAULT_STYLES, decorators: DecoratorList = DEFAULT_DECORATORS) {
		for (const [name, style] of Object.entries(styles)) {
			this.addStyle(name, style);
		}

		for (const [name, decorator] of Object.entries(decorators)) {
			this.addDecorator(name, decorator);
		}
	}

	/**
	 * Decorate a string with the given style.
	 */
	decorateText(text: string, style = 'leet', options: TextDecoratorOptions = {}) {
		const resolvedOptions = {
			leftDecorator: '',
			rightDecorator: '',
			...options
		};

		const leftDecorator = this.#decorators.get(resolvedOptions.leftDecorator)?.left ?? '';
		const rightDecorator = this.#decorators.get(resolvedOptions.rightDecorator)?.right ?? '';

		const normalizedText = text.normalize('NFD');
		const transformedText = this.#styles.get(style)?.(normalizedText) ?? normalizedText;
		const finalText = transformedText.normalize('NFC');

		return `${leftDecorator}${finalText}${rightDecorator}`;
	}


	addStyle = (name: string, style: StyleFunction) => this.#styles.set(name, style);
	removeStyle = (name: string) => this.#styles.delete(name);
	listStyles = () => [...this.#styles.keys()];

	addDecorator = (name: string, decorator: Decorator) => this.#decorators.set(name, decorator);
	removeDecorator = (name: string) => this.#decorators.delete(name);
	listDecorators = () => [...this.#decorators.keys()];
}