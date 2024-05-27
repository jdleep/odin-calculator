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

const enterDelete = (_: string) => (calcState: CalcState) => 
    R.over(dispValLens, 
        R.pipe(RE.sliceString(0,-1), zeroIfEmpty),
        calcState);

// Equals
const enterEquals = (_: string) => (calcState: CalcState) => 
    R.pipe(
        calculate,
        R.set(opLens, ''),
        copyToStoredOp
    )(calcState);

// Generic enterCharNotExist
const enterCharIfNotIn = (char: string) => (decimal: string) => 
    (calcState: CalcState) => {
    return R.view(dispValLens, calcState).includes(char) 
    ? calcState
    : enterChar(char)(calcState);
};

// Decimal
const enterDecimal = enterCharIfNotIn('.');

// Exponent
const enterExp = enterCharIfNotIn('e');

export {enterEquals, enterClear, enterDecimal, enterDelete, enterExp};