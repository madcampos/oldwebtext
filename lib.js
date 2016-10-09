/**
 * Transforms text with the given style.
 * @namespace
 */
let decorate = (() => {
	'use strict';
	const DIACRITICS = /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/;

	/**
	 * Produces a string transformation function based on the given map.
	 * @private
	 * @param {Map} map The transformation map.
	 * @return {Function} The transformation function.
	 */
	function mapTransform(map){
		return (text, caseInsensitive) => [...text].map((char) => map.get(caseInsensitive ? char.toLowerCase() : char) || char).join('');
	}

	/**
	 * Decorates a character if it's not a combining mark.
	 * @private
	 * @param {String} char The character to be decorated.
	 * @param {String} decorator The decorator to apply to the character.
	 * @return {String} The decorated string or the combining mark.
	 */
	function decorateNCM(char, decorator){
		if (DIACRITICS.test(char)) {
			return char;
		}

		return `${char}${decorator}`;
	}

	/**
	 * Produces a string transformation function based on the given function.
	 * @private
	 * @param {Function} func The transformation function.
	 * @return {Function} The transformation function.
	 */
	function funcTransform(func){
		return (text) => [...text].map(func).join('');
	}

	let decorators = new Map([
		['bars', '▂▃▅▆█'],
		['spacedBars', '▂ ▃ ▄ ▅ ▆ ▇ █ '],
		['music', 'ılı.lıllılı.ıllı.'],
		['fenced', 'ܔܢܜܔܔܢܜܔܔܢܜܔ'],
		['copyright', '©'],
		['trademark', '™'],
		['registered', '®'],
		['curly', '(¯`·._.·[ '],
		['whip', '(¯`·._) '],
		['longWave', ',.-~*¨¯¨*·~-.¸-(_ '],
		['shortWave', '•·.·´¯`·.·• '],
		['wavy', '`·.¸¸.·´´¯`··._.· '],
		['wavyThick', '°º¤ø,¸¸,ø¤º°`°º¤ø,¸ '],
		['reverseLongWave', '¯¨\'*·~-.¸¸,.-~* '],
		['waveThick', '×º°”˜`”°º× '],
		['fishy', '<º))))><.·´¯`·. '],
		['curlyArrow', '.·´¯`·-> '],
		['pierced', '- -¤--^] '],
		['patched', '-·=»‡«=·- '],
		['straight', '- - --^[ '],
		['sewed', '––––•(-• '],
		['sewedThick', '··¤(`×[¤ '],
		['bubblesIn', '¨°o.O '],
		['bubblesOut', '•°o.O '],
		['sound', 'Oº°‘¨ '],
		['heart', '(¯`•¸·´¯) '],
		['arrowedHeart', '»-(¯`v´¯)-» '],
		['nextYear', (() => (new Date().getFullYear() + 1).toString())()],
		['currentYear', (() => new Date().getFullYear().toString())()]
	]);

	let styles = new Map([
		['funky', mapTransform(new Map([
			['a', 'ล'],
			['b', 'в'],
			['c', '¢'],
			['d', '∂'],
			['e', 'э'],
			['f', 'ƒ'],
			['g', 'φ'],
			['h', 'ђ'],
			['i', 'เ'],
			['j', 'נ'],
			['k', 'к'],
			['l', 'ℓ'],
			['m', 'м'],
			['n', 'и'],
			['o', '๏'],
			['p', 'ק'],
			['q', 'ợ'],
			['r', 'я'],
			['s', 'ร'],
			['t', '†'],
			['u', 'µ'],
			['v', '√'],
			['w', 'ω'],
			['x', 'җ'],
			['y', 'ý'],
			['z', 'ž']
		]))],
		['stylish', mapTransform(new Map([
			['a', 'α'],
			['e', 'є'],
			['h', 'н'],
			['m', 'м'],
			['n', 'и'],
			['o', 'σ'],
			['p', 'ρ'],
			['r', 'я'],
			['s', 'ร'],
			['t', 'т'],
			['u', 'υ']
		]))],
		['punk', mapTransform(new Map([
			['a', 'α'],
			['e', 'є'],
			['h', 'Ћ'],
			['l', 'ł'],
			['m', 'м'],
			['n', 'η'],
			['o', 'ø'],
			['p', 'ρ'],
			['s', 's'],
			['t', 'ŧ']
		]))],
		['arabic', mapTransform(new Map([
			['a', 'آ'],
			['b', 'أ'],
			['c', 'ؤ'],
			['d', 'إ'],
			['e', 'ئ'],
			['f', 'ئ'],
			['g', 'ا'],
			['h', 'ب'],
			['i', 'ة'],
			['j', 'ت'],
			['k', 'ث'],
			['l', 'ج'],
			['m', 'خ'],
			['n', 'د'],
			['o', 'ذ'],
			['p', 'ر'],
			['q', 'ز'],
			['r', 'س'],
			['s', 'آ'],
			['t', 'ص'],
			['u', 'ض'],
			['v', 'ط'],
			['x', 'ع'],
			['w', 'ظ'],
			['y', 'غ'],
			['z', 'ב']
		]))],
		['leet', mapTransform(new Map([
			['a', '4'],
			['e', '3'],
			['i', '1'],
			['o', '0'],
			['s', '5'],
			['t', '7']
		]))],
		['future', mapTransform(new Map([
			['a', 'α'],
			['b', 'в'],
			['c', '૮'],
			['d', 'đ'],
			['e', '૯'],
			['f', 'Բ'],
			['h', 'ђ'],
			['k', 'ઝ'],
			['l', 'ℓ'],
			['m', 'ʍ'],
			['n', 'ท'],
			['o', 'ѳ'],
			['p', 'ρ'],
			['q', '૧'],
			['r', '૨'],
			['s', 'ઽ'],
			['t', 'Ƭ'],
			['u', 'ષ'],
			['v', '√'],
			['x', '×'],
			['w', 'ખ']
		]))],
		['upsidedown', mapTransform(new Map([
			['a', 'ɐ'],
			['d', 'p'],
			['e', 'ǝ'],
			['h', 'ɥ'],
			['m', 'ɯ'],
			['n', 'u'],
			['o', 'o'],
			['p', 'd'],
			['r', 'ɹ'],
			['s', 's'],
			['t', 'ʇ'],
			['u', 'n'],
			['w', 'm']
		]))],
		['circle', mapTransform(new Map([
			['a', 'ⓐ'],
			['b', 'ⓑ'],
			['c', 'ⓒ'],
			['d', 'ⓓ'],
			['e', 'ⓔ'],
			['f', 'ⓕ'],
			['g', 'ⓖ'],
			['h', 'ⓗ'],
			['i', 'ⓘ'],
			['j', 'ⓙ'],
			['k', 'ⓚ'],
			['l', 'ⓛ'],
			['m', 'ⓜ'],
			['n', 'ⓝ'],
			['o', 'ⓞ'],
			['p', 'ⓟ'],
			['q', 'ⓠ'],
			['r', 'ⓡ'],
			['s', 'ⓢ'],
			['t', 'ⓣ'],
			['u', 'ⓤ'],
			['v', 'ⓥ'],
			['x', 'ⓧ'],
			['w', 'ⓦ'],
			['y', 'ⓨ'],
			['z', 'ⓩ']
		]))],
		['simple', mapTransform(new Map([
			['a', 'Α'],
			['e', 'э'],
			['h', 'н'],
			['m', 'м'],
			['n', 'И'],
			['o', 'Ø'],
			['p', 'p'],
			['r', 'Я'],
			['t', 'Ŧ'],
			['u', 'u']
		]))],
		['alien', mapTransform(new Map([
			['a', 'ค'],
			['b', '๒'],
			['d', '๔'],
			['e', 'є'],
			['f', 'Ŧ'],
			['h', 'ђ'],
			['i', 'เ'],
			['j', 'ן'],
			['k', 'к'],
			['l', 'l'],
			['m', 'м'],
			['n', 'ภ'],
			['o', '๏'],
			['r', 'ภ'],
			['s', 'ร'],
			['t', 'т'],
			['u', 'ย']
		]))],
		['street', mapTransform(new Map([
			['a', 'Ǻ'],
			['b', 'в'],
			['e', '€'],
			['f', 'ƒ'],
			['h', 'Ћ'],
			['m', 'м'],
			['n', 'п'],
			['o', 'Ø'],
			['p', 'ρ'],
			['r', 'Я'],
			['s', 'ک'],
			['t', 'T'],
			['u', 'Ü'],
			['x', '×'],
			['w', 'ω'],
			['y', '¥'],
			['z', 'ƶ']
		]))],
		['greek', mapTransform(new Map([
			['a', 'Δ'],
			['b', 'β'],
			['c', 'Ć'],
			['d', 'Đ'],
			['e', '€'],
			['f', '₣'],
			['g', 'Ǥ'],
			['h', 'Ħ'],
			['i', 'Ξ'],
			['j', 'Ĵ'],
			['k', 'Ҝ'],
			['l', 'Ł'],
			['m', 'Μ'],
			['n', 'Ň'],
			['o', 'Ø'],
			['p', 'Р'],
			['q', 'Ω'],
			['r', 'Ř'],
			['s', 'Ş'],
			['t', 'Ŧ'],
			['u', 'Ữ'],
			['v', 'V'],
			['x', 'Ж'],
			['w', 'Ŵ'],
			['y', '¥'],
			['z', 'Ž']
		]))],
		['egiptian', mapTransform(new Map([
			['a', 'ɑ'],
			['b', 'ɓ'],
			['d', 'ɗ'],
			['e', 'ɛ'],
			['f', 'Բ'],
			['h', 'ɦ'],
			['j', 'ʝ'],
			['l', 'ʆ'],
			['m', 'ɱ'],
			['n', 'ɳ'],
			['o', 'ѳ'],
			['r', 'ʀ'],
			['s', 'ร'],
			['v', 'ѵ']
		]))],
		['french', mapTransform(new Map([
			['a', 'á'],
			['e', 'è'],
			['i', 'í'],
			['o', 'õ'],
			['u', 'û']
		]))],
		['swedish', mapTransform(new Map([
			['a', 'ắ'],
			['b', 'ß'],
			['c', 'ç'],
			['e', 'æ'],
			['i', 'i̋'],
			['k', 'k̆'],
			['l', 'ł'],
			['o', 'ø'],
			['p', 'þ'],
			['s', 'ş'],
			['t', 'ẗ'],
			['u', 'ų'],
			['y', 'ý']
		]))],
		['japanese', mapTransform(new Map([
			['a', 'ﾑ'],
			['b', 'ら'],
			['c', 'こ'],
			['d', 'さ'],
			['e', '乇'],
			['f', 'ｷ'],
			['g', 'ゐ'],
			['h', 'ん'],
			['i', 'ﾉ'],
			['j', 'ﾌ'],
			['k', 'ズ'],
			['l', 'ﾚ'],
			['m', 'ﾶ'],
			['n', '刀'],
			['o', 'の'],
			['p', 'ｱ'],
			['q', 'ふ'],
			['r', '尺'],
			['s', '丂'],
			['t', 'て'],
			['u', 'ひ'],
			['v', '√'],
			['w', '川'],
			['x', 'ﾒ'],
			['y', 'ﾘ'],
			['z', '乙']
		]))],
		['fatty', mapTransform(new Map([
			['a', 'ᗩ'],
			['b', 'ᙖ'],
			['c', 'ᑕ'],
			['d', 'Ð'],
			['e', 'ᕮ'],
			['f', '₣'],
			['g', 'Ǥ'],
			['h', 'ᕼ'],
			['i', 'Ɨ'],
			['j', 'ᒎ'],
			['k', 'Ḱ'],
			['l', 'ᒪ'],
			['m', 'ᗰ'],
			['n', 'ᘉ'],
			['o', '〇'],
			['p', 'ᑭ'],
			['q', 'Ⴓ'],
			['r', 'ᖇ'],
			['s', 'ᔕ'],
			['t', 'Ƭ'],
			['u', 'ᑌ'],
			['v', 'Ⅴ'],
			['w', 'ᗯ'],
			['x', '᙭'],
			['y', 'ϒ'],
			['z', '乙']
		]))],
		['rollercoaster', mapTransform(new Map([
			['a', 'ₐ'],
			['b', 'ᴮ'],
			['c', 'ᶜ'],
			['d', 'ᴰ'],
			['e', 'ₑ'],
			['f', 'ᶠ'],
			['g', 'ᵍ'],
			['h', 'ₕ'],
			['i', 'ᴵ'],
			['j', 'ⱼ'],
			['k', 'ₖ'],
			['l', 'ᴸ'],
			['m', 'ₘ'],
			['n', 'ⁿ'],
			['o', 'ᴼ'],
			['p', 'ᵖ'],
			['q', 'ᵨ'],
			['r', 'ᵣ'],
			['s', 'ˢ'],
			['t', 'ₜ'],
			['u', 'ᵁ'],
			['v', 'ᵥ'],
			['w', 'ʷ'],
			['x', 'ₓ'],
			['y', 'ʸ'],
			['z', 'ᶻ']
		]))],
		['lowerNumbers', mapTransform(new Map([
			['0', '₀'],
			['1', '₁'],
			['2', '₂'],
			['3', '₃'],
			['4', '₄'],
			['5', '₅'],
			['6', '₆'],
			['7', '₇'],
			['8', '₈'],
			['9', '₉']
		]))],
		['upperNumbers', mapTransform(new Map([
			['0', '⁰'],
			['1', '¹'],
			['2', '²'],
			['3', '³'],
			['4', '⁴'],
			['5', '⁵'],
			['6', '⁶'],
			['7', '⁷'],
			['8', '⁸'],
			['9', '⁹']
		]))],
		['boxed', funcTransform((char) => decorateNCM(char, '\u0332\u0305'))],
		['striked', funcTransform((char) => decorateNCM(char, '\u0336'))],
		['deleted', funcTransform((char) => decorateNCM(char, '\u0338'))],
		['camelCase', funcTransform((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())],
		['inverted', (text) => [...text].reverse().join('')],
		['matrix', funcTransform((char) => decorateNCM(char, ['\u033f', '\u0347', '\u033f\u0347', '\u0305', '\u0332', '\u0305\u0332', '\u0336', '\u0347'][Math.floor(Math.random() * 7)]))],
		['doubleLetters', funcTransform((char) => decorateNCM(char, char))],
		['doubleSomeLetters', funcTransform((char) => decorateNCM(char, char.repeat(Math.floor(Math.random() * 2))))],
		['newYear', (text) => `~${styles.get('lowerNumbers')(decorators.get('currentYear'))}~ ${text} ~${styles.get('upperNumbers')(decorators.get('nextYear'))}~`]
	]);

	/**
	 * Decorate a string with the given style.
	 * @param {String} text The text to decorate.
	 * @param {String} [style='leet'] The style to apply to the string.
	 * @param {Object} options The decoration options.
	 * @param {String} [options.leftDecorator=''] The left decorator to add to the text.
	 * @param {String} [options.rightDecorator=''] The right decorator to add to the text.
	 * @param {Boolean} [options.invertLeft=false] If the left decorator is to be inverted.
	 * @param {Boolean} [options.invertRight=false] If the right decorator is to be inverted.
	 * @param {Boolean} [options.caseInsensitive=true] Sets the transformation to be case insensitive.
	 * @param {Boolean} [options.splitDiacritics=true] Splits the character from it's diacritics.
	 * @return {String} The decorated string.
	 */
	function decorateText(text, style = 'leet', options = {leftDecorator: '', rightDecorator: '', invertRight: false, invertLeft: false, caseInsensitive: true, splitDiacritics: true}){
		if (options.leftDecorator) {
			options.leftDecorator = decorators.get(options.leftDecorator);
		}

		if (options.rightDecorator) {
			options.rightDecorator = decorators.get(options.rightDecorator);
		}

		if (options.invertLeft) {
			options.leftDecorator = styles.get('inverted')(options.leftDecorator);
		}

		if (options.invertRight) {
			options.rightDecorator = styles.get('inverted')(options.rightDecorator);
		}

		if (options.splitDiacritics) {
			text = text.normalize('NFD');
		}

		return `${options.leftDecorator}${styles.get(style)(text, options.caseInsensitive)}${options.rightDecorator}`;
	}

	//TODO: rework this methods!
	//style as getter to return a style by it's name, as setter to update the style or create a new style if none exists and to remove if nothing but the name is given.
	decorateText.addStyle = (name, style) => styles.set(name, style);
	decorateText.removeStyle = (name) => styles.delete(name);
	decorateText.listStyles = () => [...styles.keys()];

	decorateText.addDecorator = (name, decorator) => decorators.set(name, decorator);
	decorateText.removeDecorator = (name) => decorators.delete(name);
	decorateText.listDecorators = () => [...decorators.keys()];

	return decorateText;
})();