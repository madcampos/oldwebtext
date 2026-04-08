import { TextDecorator } from './lib';

document.addEventListener('DOMContentLoaded', () => {
	const textDecorator = new TextDecorator();
	const sourceText = /** @type {HTMLInputElement} */ (document.querySelector('#source-text'));
	const stylesContainer = /** @type {HTMLFieldSetElement} */ (document.querySelector('#styles'));
	const decoratorsContainer = /** @type {HTMLFieldSetElement} */ (document.querySelector('#decorators'));

	document.querySelector('#styles-loader')?.remove();

	textDecorator.listStyles().forEach((style) => {
		const input = document.createElement('input');
		const label = document.createElement('label');

		label.innerText = style;
		input.dataset['style'] = style;
		input.classList.add('style');
		input.readOnly = true;

		input.addEventListener('focus', () => {
			input.select();
		});

		stylesContainer.appendChild(label);
		stylesContainer.appendChild(input);
	});

	document.querySelector('#decorators-loader')?.remove();

	textDecorator.listDecorators().forEach((decorator) => {
		const input = document.createElement('input');
		const label = document.createElement('label');

		label.innerText = decorator;
		input.dataset['decorator'] = decorator;
		input.classList.add('decorator');
		input.readOnly = true;

		input.addEventListener('focus', () => {
			input.select();
		});

		decoratorsContainer.appendChild(label);
		decoratorsContainer.appendChild(input);
	});

	const updateStyles = () => {
		const styles = /** @type {NodeListOf<HTMLInputElement>} */ (document.querySelectorAll('.style'));
		const decorators = /** @type {NodeListOf<HTMLInputElement>} */ (document.querySelectorAll('.decorator'));
		const originalText = sourceText.value;

		styles.forEach((input) => {
			const style = input.dataset['style'];

			input.value = textDecorator.decorateText(originalText, style, {
				stripAccents: (/** @type {HTMLInputElement} */ (document.querySelector('#strip-accents')))?.checked
			});
		});

		decorators.forEach((input) => {
			const decorator = input.dataset['decorator'] ?? '';
			const { preferedStyle } = textDecorator.getDecorator(decorator) ?? { preferedStyle: 'nostyle' };

			input.value = textDecorator.decorateText(originalText, preferedStyle, {
				leftDecorator: decorator,
				rightDecorator: decorator,
				stripAccents: (/** @type {HTMLInputElement} */ (document.querySelector('#strip-accents')))?.checked
			});
		});
	};

	sourceText.addEventListener('input', updateStyles);
	sourceText.addEventListener('change', updateStyles);

	const url = new URL(window.location.toString());
	const existingText = url.searchParams.get('text') ?? '';

	if (existingText) {
		sourceText.value = existingText;
		updateStyles();
	}
});
