import Big from 'big.js';
import * as R from 'ramda';
import * as RE from 'remeda';

// State
interface CalcState {
    operands: Operands;
    operator: string;
    displayStr: string;
    isPostCalc: boolean;
    decimalBuffer: string;
};

interface Operands {
    storedOperand: number;
    currOperand: number;
};

const initState = (calc?: CalcState): CalcState => ({
    operands: {
        storedOperand: 0,
        currOperand: 0
    },
    operator: '',
    displayStr: '0',
    isPostCalc: false,
    decimalBuffer: ''
});

let globalState: CalcState = initState();

const updateState = (globalState: CalcState) => 
    (calcState: CalcState): CalcState => {
    Object.assign(globalState, calcState);
    return globalState;
};


const currOpLens = R.lensPath<CalcState, number>(['operands','currOperand']);
const storedOpLens = 
    R.lensPath<CalcState, number>(['operands','storedOperand']);
const isPostCalcLens = R.lensPath<CalcState, boolean>(['isPostCalc']);
const opLens = R.lensPath<CalcState, string>(['operator']);
const dispLens = R.lensPath<CalcState, string>(['displayStr']);
const decBufferLens = R.lensPath<CalcState, string>(['decimalBuffer']);


// Digits
const appendDigit = (digit: string) => (num: number) => {
    return Number(R.concat(num.toString(), digit));
};

const postCalcReset = R.ifElse(
    R.whereEq({isPostCalc: true}),
    R.pipe(
        R.set(isPostCalcLens, false),
        R.set(currOpLens, 0)
    ),
    R.identity
);

const enterDigit = (digit: string) => (calcState: CalcState) => {
    return R.pipe(
        postCalcReset,
        R.over(currOpLens, appendDigit(getDecBuffer(calcState) + digit))
    )(calcState)
};

// Binary Operators
interface BinaryOps {
    [i: string]: (a: number, b: number) => number;
};

const binaryOps: BinaryOps = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => a - b,
    '*': (a: number, b: number) => a * b,
    '/': (a: number, b: number) => a / b
};

const applyBinFun = (fun: (a: number, b: number) => number) => 
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

const enterBinOp = (binOp: string) => (calcState: CalcState) => {
    return R.pipe(
        calculate,
        R.set(opLens, binOp),
        copyToStoredOp,
        R.set(isPostCalcLens, true)
    )(calcState);
};

// Unary Operators
interface UnaryOps {
    [i: string]: (a: number) => number;
};

const unaryOps: UnaryOps = {
    '+/-': (a: number) => -a,
    '%': (a: number) => a / 100,
};

const enterUnaryOp = (op: string) => (calcState: CalcState) => {
    return op in unaryOps 
    ? R.set(currOpLens,        
        unaryOps[op](R.view(currOpLens, calcState)),
        calcState
    )
    : calcState
};

// Clear
const enterClear = (clear: string) => (calcState: CalcState) => initState();

// Equals
const enterEquals = (eq: string) => (calcState: CalcState) => 
    R.pipe(
        calculate,
        R.set(opLens, ''),
        copyToStoredOp
    )(calcState);

// Decimal
const hasDecBuffer = (calcState: CalcState) => 
    !!R.view(decBufferLens, calcState);

const enterDecimal = (decimal: string) => (calcState: CalcState) => {
    return Number.isInteger(R.view(currOpLens, calcState)) 
    ? R.set(decBufferLens, '.', calcState)
    : calcState;
};

const getDecBuffer = (calcState: CalcState) => R.view(decBufferLens, calcState);

const resetDecBuffer = (calcState: CalcState) => {
    return !Number.isInteger(R.view(currOpLens, calcState))
    || R.view(isPostCalcLens, calcState)
    ? R.set(decBufferLens, '', calcState)
    : calcState 
};

// UI
const updDispStr = (calcState: CalcState) => 
        R.set(dispLens,
            R.view(currOpLens, calcState).toString() + getDecBuffer(calcState),
            calcState);


const getEnterFun: ((str: string) => ((c: CalcState) => CalcState)) = R.cond([
    [R.flip(R.has)(binaryOps), enterBinOp],
    [R.flip(R.has)(unaryOps), enterUnaryOp],
    [(str: string) => /^\d$/.test(str), enterDigit],
    [R.equals('='), enterEquals],
    [R.equals('A/C'), enterClear],
    [R.equals('.'), enterDecimal],
    [R.T, R.always((calcState: CalcState): CalcState => calcState)]
]);

const updateUiCalcVal = (el: Element) => (calcState: CalcState) => {

    let calculatedValue = el.querySelector('.calculated-value') as HTMLElement;
    if (calculatedValue) {
        calculatedValue.innerText = R.view(dispLens, calcState);
    }
    return calcState;
};


export {CalcState, initState, appendDigit, enterDigit, binaryOps, unaryOps, enterUnaryOp, applyBinFun, calculate, enterBinOp, updDispStr, getEnterFun, enterEquals, enterClear, updateState, updateUiCalcVal, enterDecimal, getDecBuffer, hasDecBuffer, resetDecBuffer, globalState}