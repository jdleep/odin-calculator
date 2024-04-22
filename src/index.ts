interface BinaryOps {
    [i: string]: (a: number, b: number) => number;
}

interface UnaryOps {
    [i: string]: (a: number) => number;
}

type calcState = {
    operand1: string;
    operator: string;
    operand2: string;
    calculatedValue: string;
}

// class CalcMethods implements BinaryOps {
//     '+' = (a: number, b: number) => a + b;
//     '-' = (a: number, b: number) => a - b;
//     '*' = (a: number, b: number) => a * b;
// }

class Calculator {

    state: calcState = {
        operand1: '0',
        operator: '',
        operand2: '',
        calculatedValue: '0'
    }

    binaryOps: BinaryOps = {
        '+': (a: number, b: number) => a + b,
        '-': (a: number, b: number) => a - b,
        '*': (a: number, b: number) => a * b,
        '/': (a: number, b: number) => a / b
    };

    unaryOps: UnaryOps = {
        '+/-': (a: number) => a === 0 ? 0 : -a,
        '%': (a:number) => a / 100,
        '=': (a:number) => a
    };

    binaryOperate(a: number, b: string, c: number) {
        if (this.binaryOps[b]) {
            return this.binaryOps[b](a, c);
        } else {
            throw new Error("Operator not found in calculator");
        }
    };

    unaryOperate(a: number, b: string) {
        if (this.unaryOps[b]) {
            return this.unaryOps[b](a);
        } else {
            throw new Error("Operator not found in calculator");
        }
    };

    private enterDigit(digit: string): void {
        let state = this.state;

        //enter digit for operand1
        const operand = !state.operator ? 'operand1' : 'operand2' as const;

        // don't push 0s if already 0
        if (state[operand] === '0') {
            if (digit === '0') {
                state.calculatedValue = state[operand];
            } else {
                // Clear default value of 0
                state[operand] = digit;
            }
        } else {
            state[operand] = state[operand] + digit;
            state.calculatedValue = state[operand];
        }
    }

    private enterUnaryOp(operator: string): void {
        let state = this.state;
        const operand = !state.operator ? 'operand1' : 'operand2' as const;

        state[operand] = this.unaryOperate(+state[operand],operator)
                             .toString();
        state.calculatedValue = state[operand];
    }

    calculate(entry: string): calcState {
        let state = this.state;

        // If there is an operator, the user is entering operand2

        // User is entering operand1
        if (!state.operator) {
            if (entry.match(/^[0-9]+$/) != null) {
                this.enterDigit(entry);
            } else {
                if (this.unaryOps[entry]) {
                    this.enterUnaryOp(entry);
                }
                if (this.binaryOps[entry]) {
                    state.operator = entry;
                }
            }
        // User is entering operand2
        } else {
            if (entry.match(/^[0-9]+$/) != null) {
                this.enterDigit(entry);
            } 
        }
        return state;
    }
}

export { Calculator }
