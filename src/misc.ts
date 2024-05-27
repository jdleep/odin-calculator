import * as R from 'ramda';
import * as RE from 'remeda';
import {CalcState, initState, dispValLens, opLens} from './state';
import {calculate, copyToStoredOp} from './binary-op';
import {enterChar} from './enter-char';

// Clear
const enterClear = (clear: string) => (calcState: CalcState) => initState();

// Delete
const zeroIfEmpty = (str: string) =>
    str === ''
    ? '0'
    : str;

const enterDelete = (del: string) => (calcState: CalcState) => 
    R.over(dispValLens, 
        R.pipe(RE.sliceString(0,-1), zeroIfEmpty),
        calcState);

// Equals
const enterEquals = (eq: string) => (calcState: CalcState) => 
    R.pipe(
        calculate,
        R.set(opLens, ''),
        copyToStoredOp
    )(calcState);

// Decimal
const enterDecimal = (decimal: string) => (calcState: CalcState) => {
    return /\./.test(R.view(dispValLens, calcState)) 
    ? calcState
    : enterChar('.')(calcState);
};

export {enterEquals, enterClear, enterDecimal, enterDelete};