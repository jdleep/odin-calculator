import * as calc from '../src/app'
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('Decimal', () => {
    test('Enter decimal (current value is integer)', () => {
        let initialState = calc.initState();
        initialState.displayValue = '6125';

        let resultState = R.clone(initialState);
        resultState.displayValue = '6125.';

        expect(calc.enterDecimal('.')(initialState)).toEqual(resultState);
    });
    test('Enter decimal (current value is not integer)', () => {
        let initialState = calc.initState();
        initialState.displayValue = '5.6';

        let resultState = R.clone(initialState);

        expect(calc.enterUnaryOp('.')(initialState)).toEqual(resultState);
    });
});