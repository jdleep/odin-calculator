import * as R from 'ramda';
import { dispValLens } from './state';
import { binaryOps, enterBinOp } from './binary-op';
import { enterChar } from './enter-char';
import { unaryOps, enterUnaryOp } from './unary-op';
import { enterEquals, enterClear, enterDecimal, enterDelete } from './misc';
// UI
const getEnterFun = R.cond([
    [R.flip(R.has)(binaryOps), enterBinOp],
    [R.flip(R.has)(unaryOps), enterUnaryOp],
    [(str) => /^\d$/.test(str), enterChar],
    [R.equals('='), enterEquals],
    [R.equals('A/C'), enterClear],
    [R.equals('.'), enterDecimal],
    [R.equals('delete'), enterDelete],
    [R.T, R.always((calcState) => calcState)]
]);
const updateUiCalcVal = (el) => (calcState) => {
    let calculatedValue = el.querySelector('.calculated-value');
    if (calculatedValue) {
        calculatedValue.innerText = R.view(dispValLens, calcState);
    }
    return calcState;
};
export { getEnterFun, updateUiCalcVal };
//# sourceMappingURL=ui.js.map