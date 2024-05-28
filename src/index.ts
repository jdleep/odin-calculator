import * as R from 'ramda';
import {formatDispVal, getEnterFun, updateUiCalcVal} from './ui';
import {updateState, globalState, initState} from './state';
import { handleError, hasError } from './handle-error';

let el = document.querySelector('.calculator') as HTMLElement;

el.addEventListener('click', (e) => {
    if(e.target 
        && e.target instanceof HTMLElement 
        && e.target.tagName === 'BUTTON')
    R.pipe(
        R.cond([
            [hasError, initState],
            [R.T, R.pipe(
                getEnterFun(e.target.innerText),
                handleError)]
        ]),
        updateState(globalState),
        updateUiCalcVal(el),
    )(globalState);
});

