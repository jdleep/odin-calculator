"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
// class CalcMethods implements BinaryOps {
//     '+' = (a: number, b: number) => a + b;
//     '-' = (a: number, b: number) => a - b;
//     '*' = (a: number, b: number) => a * b;
// }
class Calculator {
    methods = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    };
    operate(a, b, c) {
        if (this.methods[b]) {
            return this.methods[b](a, c);
        }
        else {
            throw new Error("Operator not found in calculator");
        }
    }
}
exports.Calculator = Calculator;
//# sourceMappingURL=index.js.map