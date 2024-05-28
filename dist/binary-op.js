import * as R from 'ramda';
import * as RE from 'remeda';
import { dispValLens, storeValLens, isPostCalcLens, opLens } from './state';
;
const binaryOps = {
    '+': (a, b) => String(+a + +b),
    '-': (a, b) => String(+a - +b),
    '*': (a, b) => String(+a * +b),
    '/': (a, b) => String(+a / +b)
};
const applyBinFun = (fun) => (calcState) => {
    return R.set(dispValLens, fun(R.view(storeValLens, calcState), R.view(dispValLens, calcState)), calcState);
};
const copyToStoredOp = (calcState) => {
    return R.set(storeValLens, R.view(dispValLens, calcState), calcState);
};
const calculate = (calcState) => {
    return R.view(opLens, calcState) in binaryOps
        // Ramda pipe wasn't working with typescript so
        // used Remeda instead
        ? RE.piped(R.set(isPostCalcLens, true), applyBinFun(binaryOps[R.view(opLens, calcState)]))(calcState)
        : calcState;
};
const enterBinOp = (binOp) => (calcState) => {
    return R.pipe(calculate, R.set(opLens, binOp), copyToStoredOp, R.set(isPostCalcLens, true))(calcState);
};
export { applyBinFun, copyToStoredOp, calculate, enterBinOp, binaryOps };
//# sourceMappingURL=binary-op.js.map