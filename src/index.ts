import Big from 'big.js';
import * as R from 'ramda';
import * as RE from 'remeda';
import {CalcState, initState, appendDigit, enterDigit, binaryOps, unaryOps, enterUnaryOp, applyBinFun, calculate, enterBinOp, updDispStr, getEnterFun, enterEquals, enterClear, updateState, globalState, updateUiCalcVal} from './app';

let el = document.querySelector('.calculator');

if(el && el instanceof HTMLElement) {
    el.addEventListener('click', (e) => {
        if(e.target 
            && e.target instanceof HTMLElement 
            && e.target.tagName === 'BUTTON')
        R.pipe(
            getEnterFun(e.target.innerText),
            updDispStr,
            updateState(globalState),
            updateUiCalcVal(el),
            calcState => {
                console.log(calcState.operands.currOperand.toString());
                console.log(calcState.operands.storedOperand.toString());
                console.log(calcState);
            }
        )(globalState);
    });
};
