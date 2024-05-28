import * as R from 'ramda';
import {formatDispVal, getEnterFun, updateUiCalcVal} from './ui';
import {updateState, globalState} from './state';
import { handleError } from './handle-error';

let el = document.querySelector('.calculator') as HTMLElement;

el.addEventListener('click', (e) => {
    if(e.target 
        && e.target instanceof HTMLElement 
        && e.target.tagName === 'BUTTON')
    R.pipe(
        getEnterFun(e.target.innerText),
        handleError,
        updateState(globalState),
        updateUiCalcVal(el),
        calcState => {
            console.log(calcState);
        }
    )(globalState);
});

