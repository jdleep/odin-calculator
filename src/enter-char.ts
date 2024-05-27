import * as R from 'ramda';
import {CalcState, dispValLens, isPostCalcLens} from './state';

// Append or replace if zero value
const appRepZero = (char: string) => (str: string) => 
    str === '0'
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
