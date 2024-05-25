import Big from 'big.js';
import * as R from 'ramda';
import * as RE from 'remeda';
import {CalcState, initState, binaryOps, unaryOps, enterUnaryOp, applyBinFun, calculate, enterBinOp, getEnterFun, enterEquals, enterClear, updateState, globalState, updateUiCalcVal} from './app';

let el = document.querySelector('.calculator');

if(el && el instanceof HTMLElement) {
    el.addEventListener('click', (e) => {
        if(e.target 
            && e.target instanceof HTMLElement 
            && e.target.tagName === 'BUTTON')
        R.pipe(
            getEnterFun(e.target.innerText),
            updateState(globalState),
            calcState => {
                console.log(calcState);
            }
        )(globalState);
    });
};
