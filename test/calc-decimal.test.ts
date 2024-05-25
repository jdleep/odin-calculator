import * as calc from '../src/app'
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('Decimal', () => {
    test('Enter decimal (curr op is integer)', () => {
        let initialState = calc.initState();
        initialState.displayValue = '6125';

        let resultState = R.clone(initialState);
        resultState.displayValue = '6125.';

        expect(calc.enterDecimal('.')(initialState)).toEqual(resultState);
    });
    test('Enter decimal (curr op is not integer)', () => {
        let initialState = calc.initState();
        initialState.displayValue = '5.6';

        let resultState = R.clone(initialState);

        expect(calc.enterUnaryOp('.')(initialState)).toEqual(resultState);
    });
    test('setHasDecimal (curr opeprator is not integer)', () => {
        let state = calc.initState();
        state.hasDecimal = true;
        state.displayValue = '115.2';

        let resultState = R.clone(state);

        expect(calc.setHasDecimal(state)).toEqual(resultState);
    });
    test('setHasDecimal (curr operator is integer)', () => {
        let state = calc.initState();
        state.setHasDecimal = 'true';
        state.displayValue = '1152';

        let resultState = R.clone(state);
        resultState.hasDecimal = '';

        expect(calc.setHasDecimal(state)).toEqual(state);
    });
});