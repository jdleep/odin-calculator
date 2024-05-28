import * as R from 'ramda';
import {CalcState, dispValLens, isPostCalcLens} from './state';


const hasDigit = (str: string) => /\d/.test(str);

// Append or replace if zero value and entering digit
const appRepZero = (char: string) => (str: string) => 
    str === '0' && hasDigit(char)
    ? char
    : str + char;

const isAboveLimit = (limit: number) => (str:string) => 
    str.length > limit;

const isAbove19 = isAboveLimit(19);

const appendChar = (char: string) => (str: string) =>
    isAbove19(str)
    ? str
    : appRepZero(char)(str);

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
        R.over(dispValLens, appendChar(char))
    )(calcState)
};

export {enterChar};
