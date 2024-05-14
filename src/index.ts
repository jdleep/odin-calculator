import Big from 'big.js';
import * as R from 'ramda';

interface CalculatorState {
    operands: Operands;
    operator: string;
    displayStr: string;
};

interface Operands {
    storedOperand: Big;
    currOperand: Big;
};

let calcState: CalculatorState = {
    operands: {
        storedOperand: Big('0'),
        currOperand: Big('0')
    },
    operator: '',
    displayStr: '0'
};

// Functions for entering digits
const appendDigit = R.curry((digit: string, big: Big) => {
    return Big(R.concat(big.toString(), digit));
});

const currOpLens = R.lensPath<CalculatorState>(['operands','currOperand']);

const enterCalcDigit = R.curry((digit: string, calcState: CalculatorState) => 
    R.over(currOpLens, appendDigit(digit), calcState));

// Binary Operators
interface BinaryOps {
    [i: string]: (a: Big, b: Big) => Big;
};

interface UnaryOps {
    [i: string]: (a: Big) => Big;
};

const binaryOps: BinaryOps = {
    '+': (a: Big, b: Big) => a.plus(b),
    '-': (a: Big, b: Big) => a.minus(b),
    '*': (a: Big, b: Big) => a.times(b),
    '/': (a: Big, b: Big) => a.div(b)
};

const unaryOps: UnaryOps = {
    '+/-': (a: Big) => a.neg(),
    '%': (a:Big) => a.div(100),
    '=': (a:Big) => a
};



// Reset calculator
const calcReset = (calc?: CalculatorState) => ({
    storedOperand: Big('0'),
    operator: '',
    displayOperand: Big('0'),
    displayStr: '0'
});

export {appendDigit, enterCalcDigit, binaryOps, unaryOps}