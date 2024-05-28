import * as R from 'ramda';
import * as RE from 'remeda';
import {CalcState, dispValLens, storeValLens, isPostCalcLens, opLens} 
    from './state';

interface BinaryOps {
    [i: string]: (a: string, b: string) => string;
};

const binaryOps: BinaryOps = {
    '+': (a: string, b: string) => String(parseFloat(a) + parseFloat(b)),
    '-': (a: string, b: string) => String(parseFloat(a) - parseFloat(b)),
    '*': (a: string, b: string) => String(parseFloat(a) * parseFloat(b)),
    '/': (a: string, b: string) => String(parseFloat(a) / parseFloat(b))
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

export {applyBinFun, copyToStoredOp, calculate, enterBinOp, binaryOps};