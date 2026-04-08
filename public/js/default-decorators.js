/** @readonly */
const defaultDecorators = {
	'Bars': {
		left: '▂▃▅▆█ ',
		right: ' █▆▅▃▂',
		preferedStyle: 'Monospaced'
	},
	'Spaced Bars': {
		left: '▂ ▃ ▄ ▅ ▆ ▇ █ ',
		right: ' █ ▇ ▆ ▅ ▄ ▃ ▂',
		preferedStyle: 'Monospaced'
	},
	'Music': {
		left: 'ılı.lıllılı.ıllı.',
		right: '.ıllı.ılıllıl.ılı',
		preferedStyle: 'Monospaced'
	},
	'Fenced': {
		left: 'ܔܢܜܔܔܢܜܔܔܢܜܔ',
		right: 'ܔܢܜܔܔܢܜܔܔܢܜܔ',
		preferedStyle: 'Stylish'
	},
	'Copyright': {
		left: '©',
		right: '©',
		preferedStyle: 'Circle'
	},
	'Trademark': {
		left: '™',
		right: '™',
		preferedStyle: 'Square'
	},
	'Registered': {
		left: '®',
		right: '®',
		preferedStyle: 'Circle'
	},
	'Curly': {
		left: '(¯`·._.·[ ',
		right: ' ]·._.·´¯)',
		preferedStyle: 'Stylish'
	},
	'Whip': {
		left: '(¯`·._) ',
		right: ' (_.·´¯)',
		preferedStyle: 'Cursive'
	},
	'Long Wave': {
		left: ',.-~*¨¯¨*·~-.¸-(_ ',
		right: ' _)-¸.-~·*¨¯¨*~-.,',
		preferedStyle: 'Punk'
	},
	'Short Wave': {
		left: '•·.·´¯`·.·• ',
		right: ' •·.·´¯`·.·•',
		preferedStyle: 'Funky'
	},
	'Wavy': {
		left: '`·.¸¸.·´´¯`··._.· ',
		right: ' ·._.··´´¯`·.¸¸.·´',
		preferedStyle: 'Edgy'
	},
	'Wavy Thick': {
		left: '°º¤ø,¸¸,ø¤º°`°º¤ø,¸ ',
		right: ' ¸,ø¤º°´°º¤ø,¸¸,ø¤º°',
		preferedStyle: 'Edgy'
	},
	'Reverse Long Wave': {
		left: '¯¨"*·~-.¸¸,.-~* ',
		right: ' *~-.,¸¸.-~·*"¨¯',
		preferedStyle: 'Cursive'
	},
	'Wave Thick': {
		left: '×º°”˜`”°º× ',
		right: ' ×º°”´˜”°º×',
		preferedStyle: 'Cursive Bold'
	},
	'Stylish Wave': {
		left: '∙∙·▫▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ ',
		right: ' ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫▫·∙∙',
		preferedStyle: 'Cursive Bold'
	},
	'Fishy': {
		left: '<º))))><.·´¯`·. ',
		right: ' .·´¯`·.><((((º>',
		preferedStyle: 'Street'
	},
	'Curly Arrow': {
		left: '.·´¯`·-> ',
		right: ' <-·´¯`·.',
		preferedStyle: 'Roman'
	},
	'Pierced': {
		left: '- -¤--^] ',
		right: ' ]^--¤- -',
		preferedStyle: 'Alien'
	},
	'Patched': {
		left: '-·=»‡«=·- ',
		right: ' -·=»‡«=·-',
		preferedStyle: 'Serif Bold'
	},
	'Straight': {
		left: '- - --^[ ',
		right: ' ]]^--¤- -',
		preferedStyle: 'Serif'
	},
	'Sewed': {
		left: '––––•(-• ',
		right: ' •-)•––––',
		preferedStyle: 'Alien'
	},
	'Sewed Thick': {
		left: '··¤(`×[¤ ',
		right: ' ¤]×´)¤··',
		preferedStyle: 'Rollercoaster'
	},
	'Bubbles In': {
		left: '¨°o.O ',
		right: ' O.o°¨',
		preferedStyle: 'Funky'
	},
	'Bubbles Out': {
		left: '•°o.O ',
		right: ' O.o°•',
		preferedStyle: 'Stylish'
	},
	'Sound': {
		left: 'Oº°‘¨ ',
		right: ' ¨‘°ºO',
		preferedStyle: 'Street'
	},
	'Heart': {
		left: '(¯`•¸·´¯) ',
		right: ' (¯`·¸•´¯)',
		preferedStyle: 'Punk'
	},
	'Arrowed Heart': {
		left: '»-(¯`v´¯)-» ',
		right: ' «-(¯`v´¯)-«',
		preferedStyle: 'Cursive'
	},
	'Arrows': {
		left: '➶➶➶➶➶ ',
		right: ' ➷➷➷➷➷',
		preferedStyle: 'Cursive Bold'
	},
	'Wrapped Arrows': {
		left: 'º° >-.¸¸.·`¯(',
		right: ')¯`·.¸¸.-> °º',
		preferedStyle: 'Gothic'
	},
	'Starry Heart': {
		left: '*•.¸♡',
		right: '♡¸.•*',
		preferedStyle: 'Gothic Bold'
	},
	'Heart Beat': {
		left: '♥ﮩ٨ـﮩﮩ٨ـﮩﮩ ',
		right: ' ﮩﮩـ٨ﮩﮩـ٨ﮩ♥',
		preferedStyle: 'Cursive'
	},
	'Siringe': {
		left: '╏╠══[𝍖𝍖𝍖𝍖 ',
		right: ' 𝍖𝍖𝍖𝍖]      💦',
		preferedStyle: 'Serif Bold'
	},
	'Desert': {
		left: 'ⲯ﹍︿﹍︿﹍ ',
		right: ' ﹍ⲯ﹍ⲯ﹍︿﹍☼',
		preferedStyle: 'Monospaced'
	},
	'Peacock': {
		left: '꧁༺ ',
		right: ' ༻꧂',
		preferedStyle: 'Cursive Bold'
	},
	'Fancy Peacock': {
		left: '☆꧁✬◦°˚°◦. ',
		right: ' .◦°˚°◦✬꧂☆',
		preferedStyle: 'Cursive'
	},
	'Fade': {
		left: '⠐⢾░▒▓██ ',
		right: ' ██▓▒­░⡷⠂',
		preferedStyle: 'Neon'
	}
};

export default defaultDecorators;
