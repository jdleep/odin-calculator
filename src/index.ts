interface BinaryOps {
    [i: string]: (a: number, b: number) => number;
}

// class CalcMethods implements BinaryOps {
//     '+' = (a: number, b: number) => a + b;
//     '-' = (a: number, b: number) => a - b;
//     '*' = (a: number, b: number) => a * b;
// }

class Calculator {
    methods: BinaryOps = {
        '+': (a: number, b: number) => a + b,
        '-': (a: number, b: number) => a - b,
        '*': (a: number, b: number) => a * b,
        '/': (a: number, b: number) => a / b
    }

    operate(a: number, b: string, c: number) {
        if (this.methods[b]) {
            return this.methods[b](a, c);
        } else {
            throw new Error("Operator not found in calculator");
        }
    }
}

export { Calculator }
