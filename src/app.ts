import Big from 'big.js';
import * as R from 'ramda';
import * as RE from 'remeda';

// State
interface CalcState {
    storedValue: string;
    operator: string;
    displayValue: string;
    isPostCalc: boolean;
};

// interface Operands {
//     storedOperand: number;
//     currOperand: number;
// };

const initState = (calc?: CalcState): CalcState => ({
    storedValue: '0',
    operator: '',
    displayValue: '0',
    isPostCalc: false
});

let globalState: CalcState = initState();

const updateState = (globalState: CalcState) => 
    (calcState: CalcState): CalcState => {
    Object.assign(globalState, calcState);
    return globalState;
};


const dispValLens = R.lensPath<CalcState, string>(['displayValue']);
const storeValLens = R.lensPath<CalcState, string>(['storedValue']);
const isPostCalcLens = R.lensPath<CalcState, boolean>(['isPostCalc']);
const opLens = R.lensPath<CalcState, string>(['operator']);
const dispLens = R.lensPath<CalcState, string>(['displayStr']);


// Digits

// Appepnd or replace if zero value
const appRepZero = (char: string) => (str: string) => 
    str === '0'
    ? char
    : str + char;

const postCalcReset = R.ifElse(
    R.whereEq({isPostCalc: true}),
    R.pipe(
        R.set(isPostCalcLens, false),
        R.set(dispValLens, '0')
    ),
    R.identity
);

const enterChar = (char: string) => (calcState: CalcState) => {
    return R.pipe(
        postCalcReset,
        R.over(dispValLens, appRepZero(char))
    )(calcState)
};

// Binary Operators
interface BinaryOps {
    [i: string]: (a: string, b: string) => string;
};

const binaryOps: BinaryOps = {
    '+': (a: string, b: string) => String(+a + +b),
    '-': (a: string, b: string) => String(+a - +b),
    '*': (a: string, b: string) => String(+a * +b),
    '/': (a: string, b: string) => String(+a / +b)
};

const applyBinFun = (fun: (a: string, b: string) => string) => 
    (calcState: CalcState): CalcState  => {
    return R.set(
        dispValLens,
        fun(R.view(storeValLens, calcState), R.view(dispValLens, calcState)),
        calcState
    );
};

const copyToStoredOp = (calcState: CalcState) => {
        return R.set(storeValLens, R.view(dispValLens, calcState), calcState);
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
    return /\./.test(R.view(dispValLens, calcState)) 
    ? calcState
    : enterChar('.')(calcState);
};

// UI
const updDispStr = (calcState: CalcState) => 
        R.set(dispLens,
            R.view(currOpLens, calcState).toString() + getDecBuffer(calcState),
            calcState);


const getEnterFun: ((str: string) => ((c: CalcState) => CalcState)) = R.cond([
    [R.flip(R.has)(binaryOps), enterBinOp],
    [R.flip(R.has)(unaryOps), enterUnaryOp],
    [(str: string) => /^\d$/.test(str), enterChar],
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


export {CalcState, initState, enterChar, binaryOps, unaryOps, enterUnaryOp, applyBinFun, calculate, enterBinOp, updDispStr, getEnterFun, enterEquals, enterClear, updateState, updateUiCalcVal, enterDecimal, getDecBuffer, hasDecBuffer, resetDecBuffer, globalState}