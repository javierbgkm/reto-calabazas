/*
Hay que obtener el subconjunto contiguo de más valor
Los positivos y negativos tienen un comportamiento distinto en el sentido que acumular positivos puede dar valores más productivos que un valor individual pero acumular negativos nunca será más valioso que un número negativo individual.
Se deduce que en caso de que no haya números positivos, se elija el valor individual más cercano a 0.
En caso contrario, el subconjunto debería empezar por un valor positivo y comprobar el acumulado con cada aportación posterior.
Si el acumulado con el valor nuevo va a ser negativo tiene más sentido cortar ese subconjunto y empezar a partir del siguiente valor positivo del array.
Guardar el mayor valor durante el proceso de cálculo debería valer.

Una simplificación del problema sería hacer una primera pasada en la que compacto todos los números positivos contiguos en su suma y todos los negativos en su suma de valor negativa. Serían dos iteraciones en lugar de una y tengo que pasar de todas formas por cada número, así que tendrá que valer con hacerlo al vuelo, solo aportaría claridad para hacerlo manualmente, pero no va a tener sentido a nivel de código.

Paso a paso sería:
(Esto finalmente lo puedo hacer durante la iteración normal, sin calcular el máximo en una primera pasada) Compruebo el mayor valor del array. Si no es positivo, me quedo con ese valor como el mayor acumulado.
En caso contrario, me quedo con el primer valor del array como el valor máximo por parcela inicial, que se irá sobreescribiendo.
Lo añado al acumulado actual del subconjunto.

Condición al comprobar el valor acumulado actual:
Si no es positivo, corto y empiezo el siguiente subconjunto.
Si es positivo, continúo con el siguiente.

Paso a paso en una iteración:
Compruebo el valor de la parcela actual. La sumo al acumulado de parcelas contiguas hasta ahora.
Si el acumulado nuevo es mayor que el valor máximo por parcela, lo sobreescribo.
Si el acumuladoo es negativo, corto el subconjunto.
*/

const maximaGanancia = (parcelas) => {
  const longitudParcelas = parcelas?.length;
  if (!longitudParcelas) throw "Array vacío";

  let parcelaInicial = 0;
  let valorOptimoFinal = parcelas[parcelaInicial];
  let valorParcelasContiguas = parcelas[parcelaInicial];

  parcelaInicial++;

  for (let i = parcelaInicial; i < longitudParcelas; i++) {
    const valorParcelaIndividual = parcelas[i];

    valorParcelasContiguas = Math.max(valorParcelaIndividual, valorParcelasContiguas + valorParcelaIndividual);

    if (valorParcelasContiguas > valorOptimoFinal) {
      valorOptimoFinal = valorParcelasContiguas;
    }
  }

  return valorOptimoFinal;
};

if (
  maximaGanancia([1, 2, 3, 4]) === 10 &&
  maximaGanancia([-2, 1, -3, 4, -1, 2, 1, -5, 4]) === 6 &&
  maximaGanancia([-1, -2, -3, -4]) === -1 &&
  maximaGanancia([8, 1, -100, 2, 5]) === 9
) {
  console.log("success");
} else {
  console.log("Fail");
}
