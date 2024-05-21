import Big from 'big.js';
import * as R from 'ramda';
import * as RE from 'remeda';

// State
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

const updateState = R.curry((globalState: CalcState, calcState: CalcState): CalcState => {
    Object.assign(globalState, calcState);
    return globalState;
});


const currOpLens = R.lensPath<CalcState, Big>(['operands','currOperand']);
const storedOpLens = R.lensPath<CalcState, Big>(['operands','storedOperand']);
const isPostCalcLens = R.lensPath<CalcState, boolean>(['isPostCalc']);
const opLens = R.lensPath<CalcState, string>(['operator']);
const dispLens = R.lensPath<CalcState, string>(['displayStr']);


// Digits
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

const applyBinFun = (fun: (a: Big, b: Big) => Big) => 
    (calcState: CalcState): CalcState  => {
    return R.set(
        currOpLens,
        fun(R.view(storedOpLens, calcState), R.view(currOpLens, calcState)),
        calcState
    );
};

const copyToStoredOp = (calcState: CalcState) => {
        return R.set(storedOpLens, R.view(currOpLens, calcState), calcState);
};

const calculate = (calcState: CalcState) => {
    return R.view(opLens, calcState) in binaryOps 
    // Ramda pipe wasn't working with typescript so
    // used Remeda instead
    ? RE.piped(
        R.set(isPostCalcLens, true),
        applyBinFun(binaryOps[R.view(opLens, calcState)]),       
    )(calcState)
    : calcState;
}

const enterBinOp = R.curry((binOp: string, calcState: CalcState) => {
    return R.pipe(
        calculate,
        R.set(opLens, binOp),
        copyToStoredOp,
        R.set(isPostCalcLens, true)
    )(calcState);
});

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
    (eq: string, calcState: CalcState) => R.pipe(
        calculate,
        R.set(opLens, ''),
        copyToStoredOp
    )(calcState)
);

// UI
const updDispStr = (calcState: CalcState) => 
    R.set(dispLens, R.view(currOpLens, calcState).toString(), calcState);

const getEnterFun: ((str: string) => ((c: CalcState) => CalcState)) = R.cond([
    [R.flip(R.has)(binaryOps), enterBinOp],
    [R.flip(R.has)(unaryOps), enterUnaryOp],
    [(str: string) => /^\d$/.test(str), enterDigit],
    [R.equals('='), enterEquals],
    [R.equals('A/C'), enterClear],
    [R.T, R.always((calcState: CalcState): CalcState => calcState)]
]);


const updateUiCalcVal = (el: Element) => (calcState: CalcState) => {

    let calculatedValue = el.querySelector('.calculated-value') as HTMLElement;
    if (calculatedValue) {
        calculatedValue.innerText = R.view(dispLens, calcState);
    }
    return calcState;
};


export {CalcState, initState, appendDigit, enterDigit, binaryOps, unaryOps, enterUnaryOp, applyBinFun, calculate, enterBinOp, updDispStr, getEnterFun, enterEquals, enterClear, updateState, updateUiCalcVal, globalState}