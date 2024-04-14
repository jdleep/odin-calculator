"use strict";
// class CalcMethods implements BinaryOps {
//     '+' = (a: number, b: number) => a + b;
//     '-' = (a: number, b: number) => a - b;
//     '*' = (a: number, b: number) => a * b;
// }
class Calculator {
    constructor() {
        this.methods = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
        };
    }
    operate(a, b, c) {
        return this.methods[b](a, c);
    }
}
let calc = new Calculator();
//# sourceMappingURL=index.js.map