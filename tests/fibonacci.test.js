const generateFibonacciSeries = require("../src/utils/fibonacci");

describe("Fibonacci Series Generator", () => {
  test("Genera correctamente una serie Fibonacci con semillas positivas", () => {
    const series = generateFibonacciSeries(2, 3, 4);
    expect(series).toEqual([21, 13, 8, 5, 3, 2]);
  });

  test("Maneja correctamente la entrada 0 como count", () => {
    const series = generateFibonacciSeries(2, 3, 0);
    expect(series).toEqual([3, 2]);
  });

  test("Lanza un error si el count es negativo", () => {
    expect(() => {
      generateFibonacciSeries(2, 3, -1);
    }).toThrow("El número de elementos debe ser mayor o igual a 0.");
  });

  test("Genera correctamente una serie Fibonacci con grandes valores de N", () => {
    const series = generateFibonacciSeries(1, 1, 10);
    expect(series.length).toBe(12); // 10 + 2 semillas
  });
});
