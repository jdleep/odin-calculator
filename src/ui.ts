import * as R from 'ramda';
import {CalcState, dispValLens} from './state';
import {binaryOps, enterBinOp} from './binary-op';
import {enterChar} from './enter-char';
import {unaryOps, enterUnaryOp} from './unary-op';
import {enterEquals, enterClear, enterDecimal, enterDelete, enterExp}
    from './misc';

// UI
const getEnterFun: ((str: string) => ((c: CalcState) => CalcState)) = R.cond([
    [R.flip(R.has)(binaryOps), enterBinOp],
    [R.flip(R.has)(unaryOps), enterUnaryOp],
    [(str: string) => /^\d$/.test(str), enterChar],
    [R.equals('='), enterEquals],
    [R.equals('A/C'), enterClear],
    [R.equals('.'), enterDecimal],
    [R.equals('exp'), enterExp],
    [R.equals('delete'), enterDelete],
    [R.T, R.always((calcState: CalcState): CalcState => calcState)]
]);

const updateUiCalcVal = (el: Element) => (calcState: CalcState) => {
    let calculatedValue = el.querySelector('.calculated-value') as HTMLElement;
    if (calculatedValue) {
        calculatedValue.innerText = R.view(dispValLens, calcState);
    }
    return calcState;
};


export { getEnterFun, updateUiCalcVal };