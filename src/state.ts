import * as R from 'ramda';

// State
interface CalcState {
    storedValue: string;
    operator: string;
    displayValue: string;
    isPostCalc: boolean;
};

// interface Operands {
//     storedOperand: number;
//     currOperand: number;
// };

const initState = (calc?: CalcState): CalcState => ({
    storedValue: '0',
    operator: '',
    displayValue: '0',
    isPostCalc: false
});

let globalState: CalcState = initState();

const updateState = (globalState: CalcState) => 
    (calcState: CalcState): CalcState => {
    Object.assign(globalState, calcState);
    return globalState;
};


const dispValLens = R.lensPath<CalcState, string>(['displayValue']);
const storeValLens = R.lensPath<CalcState, string>(['storedValue']);
const isPostCalcLens = R.lensPath<CalcState, boolean>(['isPostCalc']);
const opLens = R.lensPath<CalcState, string>(['operator']);

export {CalcState, initState, updateState, dispValLens, storeValLens, isPostCalcLens, opLens, globalState};