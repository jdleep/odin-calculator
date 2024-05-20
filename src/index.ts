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

const updateState = (globalState: CalcState, calcState: CalcState) => 
    Object.assign(globalState, calcState);

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
    // Ramda pipe wasn't working with typescript so
    // went with Remeda
    ? RE.piped(
        R.set(isPostCalcLens, true),
        applyBinFun(binaryOps[R.view(opLens, calcState)]),
        copyToStoredOp
    )(calcState)
    : calcState
}

const enterBinOp = R.curry((binOp: string, calcState: CalcState) => {
    return R.pipe(
        calculate,
        R.set(opLens, binOp)
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
    (eq: string, calcState: CalcState) => calculate(calcState)
);

// UI
const updDispStr = (calcState: CalcState) => 
    R.set(dispLens, R.view(currOpLens, calcState).toString(), calcState);


// Todo: Look into using Cond instead of switch
const getEnterFun = (str: string) => {
    let fun: ((calcState: CalcState) => CalcState);
    switch (true) {
        case str in binaryOps:
            fun = enterBinOp(str);
            break;
        case str in unaryOps:
            fun = enterUnaryOp(str);
            break;
        case /^\d$/.test(str):
            fun = enterDigit(str);
            break;
        case str === '=':
            fun = enterEquals(str);
            break;
        case str === 'A/C':
            fun = enterClear(str);
            break;
        default:
            // Just return identity function if input string
            // is not digit, operator, equals, or clear
            fun = (calcState) => calcState;
    };
    return fun;
}

const updateUiCalcVal = R.curry((el: Element, calcState: CalcState) => {
    
    let calculatedValue = el.querySelector('.calculated-value') as HTMLElement;
        calculatedValue.innerText = R.view(dispLens, calcState);

    return calcState;
});

// let el = document.querySelector('.calculator');

// if(el && el instanceof HTMLElement) {
//     el.addEventListener('click', (e) => {
//         if(e.target 
//             && e.target instanceof HTMLElement 
//             && e.target.tagName === 'BUTTON')
//         R.pipe(
//             getEnterFun(e.target.innerText),
//             updDispStr,
//             updateUiCalcVal(el),
//         )(globalState);
//     });
// };

console.log('test');

export {initState, appendDigit, enterDigit, binaryOps, unaryOps, enterUnaryOp, applyBinFun, calculate, enterBinOp, updDispStr, getEnterFun, enterEquals, enterClear, updateState}