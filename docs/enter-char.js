import * as R from 'ramda';
import { dispValLens, isPostCalcLens } from './state';
// Append or replace if zero value
const appRepZero = (char) => (str) => str === '0'
    ? char
    : str + char;
const postCalcReset = R.ifElse(R.whereEq({ isPostCalc: true }), R.pipe(R.set(isPostCalcLens, false), R.set(dispValLens, '0')), R.identity);
const enterChar = (char) => (calcState) => {
    return R.pipe(postCalcReset, R.over(dispValLens, appRepZero(char)))(calcState);
};
export { enterChar };
//# sourceMappingURL=enter-char.js.map