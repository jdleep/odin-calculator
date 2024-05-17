import Big from 'big.js';
import * as R from 'ramda';

interface CalcState {
    operands: Operands;
    operator: string;
    displayStr: string;
    isPostCalc: boolean;
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
    isPostCalc: false
});

let globalState: CalcState = initState();

const currOpLens = R.lensPath<CalcState, Big>(['operands','currOperand']);
const storedOpLens = R.lensPath<CalcState, Big>(['operands','storedOperand']);
const isPostCalcLens = R.lensPath<CalcState, boolean>(['isPostCalc']);
const opLens = R.lensPath<CalcState, string>(['operator']);
const dispLens = R.lensPath<CalcState, string>(['displayStr']);


// Functions for entering digits
const appendDigit = R.curry((digit: string, big: Big) => {
    return Big(R.concat(big.toString(), digit));
});


const isPostCalcReset = R.ifElse(
    R.whereEq({isPostCalc: true}),
    R.pipe(
        R.set(isPostCalcLens, false),
        R.set(currOpLens, Big('0'))
    ),
    R.identity
);

const enterDigit = R.curry((digit: string, calcState: CalcState) => {
    return R.pipe(
        isPostCalcReset,
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

const applyBinFun = R.curry(
    (fun: (a: Big, b: Big) => Big, calcState: CalcState): CalcState  => {
    return R.set(
        currOpLens,
        fun(R.view(storedOpLens, calcState), R.view(currOpLens, calcState)),
        calcState
    );
});

const copyToStoredOp = (calcState: CalcState) => {
        return R.set(storedOpLens, R.view(currOpLens, calcState), calcState);
};

const calculate = (calcState: CalcState) => {
    return R.view(opLens, calcState) in binaryOps 
    // Couldn't get type to work, so manually set to "any"
    ? R.pipe<any, CalcState, CalcState, CalcState>(
        R.set(isPostCalcLens, true),
        applyBinFun(binaryOps[R.view(opLens, calcState)]),
        copyToStoredOp
    )(calcState)
    : calcState
}

const enterBinOp = (binOp: string, calcState: CalcState) => {
    return R.pipe(
        calculate,
        R.set(opLens, binOp)
    )(calcState);
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
    return op in unaryOps 
    ? R.set(currOpLens,        
        unaryOps[op](R.view(currOpLens, calcState)),
        calcState
    )
    : calcState
});

// Misc
const enterClear = R.curry(
    (clear: string, calcState: CalcState) => initState()
);

const enterEquals = R.curry(
    (eq: string, calcState: CalcState) => calculate(calcState)
);

// UI
const updDispStr = (calcState: CalcState) => 
    R.set(dispLens, R.view(currOpLens, calcState).toString(), calcState);


// Todo: Look into using Cond instead of switch
const getEnterFun = (str: string) => {
    let fun: ((str: string, calcState: CalcState) => CalcState);
    switch (true) {
        case str in binaryOps:
            fun = enterBinOp;
            break;
        case str in unaryOps:
            fun = enterUnaryOp;
            break;
        case /^d$/.test(str):
            fun = enterDigit;
            break;
        case str === '=':
            fun = enterEquals;
            break;
        case str === 'A/C':
            fun = enterClear;
        default:
            // Just return identity function if input string
            // is not digit, operator, equals, or
            // clear
            fun = (str , calcState) => calcState;
    };
    return fun;
}

export {initState, appendDigit, enterDigit, binaryOps, unaryOps, enterUnaryOp, applyBinFun, calculate, enterBinOp, updDispStr, getEnterFun, enterEquals, enterClear}