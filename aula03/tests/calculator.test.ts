import calculator from "calculator";

describe("Calculator", () => {
   it ("returns 3 for 2 and 1 params", () => {
     const resultado = calculator.sum(2,1);
     expect(resultado).toEqual(3);
   });
   it("returns 0 for 4 and 4 params", () => {
      const resultado = calculator.sub(4,4);
      expect(resultado).toEqual(0);
   })
   it("returns 30 for 5 and 6 params", () => {
    const resultado = calculator.mul(5,6);
    expect(resultado).toEqual(30);
   })
   it("returns 2 for 10 and 5 params", () => {
    const resultado = calculator.div(10,5);
    expect(resultado).toEqual(2);
   })
})