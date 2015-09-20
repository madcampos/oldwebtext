# Old Web text
Lembra aqueles geradores de nick do MSN? Essa é uma pequena biblioteca que faz isso com qualquer texto!

## API
### `textTransformation.styles`
Lista de estilos de texto que podem ser aplicados, basta usar o nome e passar como parametro o texto que se deseja transformar.

**Exemplo:**
```javascript
	var wow = textTransformation.styles.funky('wow, so interwebs, much 90\'s!');
	//-> 'ω๏ω, ร๏ เи†эяωэвร, мµ¢ђ 90'ร!'
```
### `textTransformation.decorators`
Lista de decoradores que podem ser usados em ambos os lados do texto pela função `textTransformations.decorate`.

**Exemplo:**
```javascript
	var interwebs = textTransformation.decorators.wavyThick;
	//-> '°º¤ø,¸¸,ø¤º°`°º¤ø,¸ '
```

### `textTransformation.decorate(t, l, r, ir, il)`
Função de decoração do texto.
`t`: Texto a ser decorado.
`l`: Decorador a esquerda.
`r`: Decorador a direita.
`ir`: Inverte o decorador a direita?
`il`: Inverte o decorador a esquerda?

**Exemplo:**
```javascript
	textTransformation.decorate(wow, interwebs);
	//-> '°º¤ø,¸¸,ø¤º°`°º¤ø,¸ ω๏ω, ร๏ เи†эяωэвร, мµ¢ђ 90'ร! ¸,ø¤º°`°º¤ø,¸¸,ø¤º°'
```

## Notas:
Alguns recursos ES6 foram usados:
- Arrow functions
- Map
- Template strings
