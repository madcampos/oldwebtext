/* eslint-disable no-console*/

import { TextDecorator } from './lib';

document.addEventListener('DOMContentLoaded', async () => {
	if ('serviceWorker' in navigator) {
		try {
			await navigator.serviceWorker.register(`${import.meta.env.PUBLIC_URL}sw.js`);
		} catch (err) {
			console.error(err);
		}
	}

	const textDecorator = new TextDecorator();
	const sourceText = document.querySelector('#source-text') as HTMLInputElement;
	const stylesContainer = document.querySelector('#styles') as HTMLFieldSetElement;
	const decoratorsContainer = document.querySelector('#decorators') as HTMLFieldSetElement;

	document.querySelector('#styles-loader')?.remove();

	textDecorator.listStyles().forEach((style) => {
		const input = document.createElement('input');
		const label = document.createElement('label');

		label.innerText = style;
		input.dataset.style = style;
		input.classList.add('style');
		input.readOnly = true;

		stylesContainer.appendChild(label);
		stylesContainer.appendChild(input);
	});

	document.querySelector('#decorators-loader')?.remove();

	textDecorator.listDecorators().forEach((decorator) => {
		const input = document.createElement('input');
		const label = document.createElement('label');

		label.innerText = decorator;
		input.dataset.decorator = decorator;
		input.classList.add('decorator');
		input.readOnly = true;

		decoratorsContainer.appendChild(label);
		decoratorsContainer.appendChild(input);
	});

	sourceText.addEventListener('input', () => {
		const styles = document.querySelectorAll<HTMLInputElement>('.style');
		const decorators = document.querySelectorAll<HTMLInputElement>('.decorator');
		const originalText = sourceText.value;

		styles.forEach((input) => {
			const style = input.dataset.style as string;

			input.value = textDecorator.decorateText(originalText, style);
		});

		decorators.forEach((input) => {
			const decorator = input.dataset.decorator as string;

			input.value = textDecorator.decorateText(originalText, 'nostyle', {
				leftDecorator: decorator,
				rightDecorator: decorator
			});
		});
	});
});
