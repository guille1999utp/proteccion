function generateFibonacciSeries(seed1, seed2, count) {
  if (count < 0) {
    throw new Error("El número de elementos debe ser mayor o igual a 0.");
  }

  let fibSeries = [seed1, seed2];

  for (let i = 2; i < count + 2; i++) {
    fibSeries.push(fibSeries[i - 1] + fibSeries[i - 2]);
  }

  return fibSeries.slice(0, count + 2).reverse();
}

module.exports = generateFibonacciSeries;
