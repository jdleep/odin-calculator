import * as R from 'ramda';
import * as RE from 'remeda';
import { initState, dispValLens, opLens } from './state';
import { calculate, copyToStoredOp } from './binary-op';
import { enterChar } from './enter-char';
// Clear
const enterClear = (clear) => (calcState) => initState();
// Delete
const zeroIfEmpty = (str) => str === ''
    ? '0'
    : str;
const enterDelete = (del) => (calcState) => R.over(dispValLens, R.pipe(RE.sliceString(0, -1), zeroIfEmpty), calcState);
// Equals
const enterEquals = (eq) => (calcState) => R.pipe(calculate, R.set(opLens, ''), copyToStoredOp)(calcState);
// Decimal
const enterDecimal = (decimal) => (calcState) => {
    return /\./.test(R.view(dispValLens, calcState))
        ? calcState
        : enterChar('.')(calcState);
};
export { enterEquals, enterClear, enterDecimal, enterDelete };
//# sourceMappingURL=misc.js.map