import Big from 'big.js';
import * as R from 'ramda';

interface CalcState {
    operands: Operands;
    operator: string;
    displayStr: string;
    postCalc: boolean;
};

interface Operands {
    storedOperand: Big;
    currOperand: Big;
};

// Initialize calc state
const initState = (calc?: CalcState): CalcState => ({
    operands: {
        storedOperand: Big('0'),
        currOperand: Big('0')
    },
    operator: '',
    displayStr: '0',
    postCalc: false
});

let calcState: CalcState = initState();

const currOpLens = R.lensPath<CalcState, Big>(['operands','currOperand']);
const storedOpLens = R.lensPath<CalcState, Big>(['operands','storedOperand']);
const postCalcLens = R.lensPath<CalcState, boolean>(['postCalc']);
const opLens = R.lensPath<CalcState, string>(['operator']);
const dispLens = R.lensPath<CalcState, string>(['displayStr']);


// Functions for entering digits
const appendDigit = R.curry((digit: string, big: Big) => {
    return Big(R.concat(big.toString(), digit));
});


const postCalcReset = R.ifElse(
    R.whereEq({postCalc: true}),
    R.pipe(
        R.set(postCalcLens, false),
        R.set(currOpLens, Big('0'))
    ),
    R.identity
);

const enterCalcDigit = R.curry((digit: string, calcState: CalcState) => {
    return R.pipe(
        postCalcReset,
        R.over(currOpLens, appendDigit(digit))
    )(calcState)
});

// Binary Operators
interface BinaryOps {
    [i: string]: (a: Big, b: Big) => Big;
};

const binaryOps: BinaryOps = {
    '+': R.curry((a: Big, b: Big) => a.plus(b)),
    '-': R.curry((a: Big, b: Big) => a.minus(b)),
    '*': R.curry((a: Big, b: Big) => a.times(b)),
    '/': R.curry((a: Big, b: Big) => a.div(b))
};

const calculate = (fun: (a: Big, b: Big) => Big, calcState: CalcState)  => {
    return R.set(currOpLens,
        fun(R.view(storedOpLens, calcState), R.view(currOpLens, calcState)),
        calcState
    );
};

// Unary Operators
interface UnaryOps {
    [i: string]: (a: Big) => Big;
};

const unaryOps: UnaryOps = {
    '+/-': (a: Big) => a.neg(),
    '%': (a:Big) => a.div(100),
};

const enterUnaryOp = R.curry((op: string, calcState: CalcState) => {
    return op in unaryOps ? 
    R.set(currOpLens,        
        unaryOps[op](R.view(currOpLens, calcState)),
        calcState
    ):
    calcState
});

export {initState, appendDigit, enterCalcDigit, binaryOps, unaryOps, enterUnaryOp, calculate}