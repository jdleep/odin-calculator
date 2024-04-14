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
        // '+': (a: number, b: number) => a + b,
        // '-': (a: number, b: number) => a - b,
        // '*': (a: number, b: number) => a * b,
    }

    operate(a: number, b: string, c: number) {
        return this.methods[b](a, c);
    }
}


export { Calculator }
