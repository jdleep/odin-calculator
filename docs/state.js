import * as R from 'ramda';
;
// interface Operands {
//     storedOperand: number;
//     currOperand: number;
// };
const initState = (calc) => ({
    storedValue: '0',
    operator: '',
    displayValue: '0',
    isPostCalc: false
});
let globalState = initState();
const updateState = (globalState) => (calcState) => {
    Object.assign(globalState, calcState);
    return globalState;
};
const dispValLens = R.lensPath(['displayValue']);
const storeValLens = R.lensPath(['storedValue']);
const isPostCalcLens = R.lensPath(['isPostCalc']);
const opLens = R.lensPath(['operator']);
export { initState, updateState, dispValLens, storeValLens, isPostCalcLens, opLens, globalState };
//# sourceMappingURL=state.js.map