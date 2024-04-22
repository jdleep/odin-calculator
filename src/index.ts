interface BinaryOps {
    [i: string]: (a: number, b: number) => number;
}

interface UnaryOps {
    [i: string]: (a: number) => number;
}

type calcState = {
    stage: 'OPERAND1' | 'OPERAND2';
    operand1: string;
    operator: string;
    operand2: string;
    displayValue: string;
}

// class CalcMethods implements BinaryOps {
//     '+' = (a: number, b: number) => a + b;
//     '-' = (a: number, b: number) => a - b;
//     '*' = (a: number, b: number) => a * b;
// }

class Calculator {

    state: calcState = {
        stage: 'OPERAND1',
        operand1: '',
        operator: '',
        operand2: '',
        displayValue: ''
    }

    digits = new Set(['1','2', '3', '4', '5', '6', '7', '8', '9', '0']) 

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

    private enterDigit(digit: string, stage: string) {
        let state = this.state;
        let operand = state.operand1;
        if (operand === '0' && digit === '0') {
            return state;
        }
        operand = operand + digit;
        state.displayValue = operand;
    }

    calculate(entry: string): calcState {
        let state = this.state;
        if (state.stage === 'OPERAND1') {
            if (entry.match(/^[0-9]+$/) != null) {
                this.enterDigit(entry, state.stage);
            } else {
                state.operator = entry;
                state.stage = 'OPERAND2';
            }
        } else {
            if (entry.match(/^[0-9]+$/) != null) {
                this.enterDigit(entry, state.stage);
            } 
        }
        return state;
    }
}

export { Calculator }
