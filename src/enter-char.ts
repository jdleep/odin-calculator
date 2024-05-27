import * as R from 'ramda';
import {CalcState, dispValLens, isPostCalcLens} from './state';

// Append or replace if zero value and entering digit
const hasDigit = (str: string) => /\d/.test(str);

const appRepZero = (char: string) => (str: string) => 
    str === '0' && hasDigit(char)
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

export {enterChar};
