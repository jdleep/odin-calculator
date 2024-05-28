import { initState } from '../src/state';
import { enterDecimal } from '../src/misc';
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('Decimal', () => {
    test('Enter decimal (current value is integer)', () => {
        let initialState = initState();
        initialState.displayValue = '6125';

        let resultState = R.clone(initialState);
        resultState.displayValue = '6125.';

        expect(enterDecimal('.')(initialState)).toEqual(resultState);
    });
    test('Enter decimal (current value is not integer)', () => {
        let initialState = initState();
        initialState.displayValue = '5.6';

        let resultState = R.clone(initialState);

        expect(enterDecimal('.')(initialState)).toEqual(resultState);
    });
    test('Enter decimal when displayValue = 0', () => {
        let initialState = initState();
        initialState.displayValue = '0';

        let resultState = R.clone(initialState);
        resultState.displayValue = '0.';

        expect(enterDecimal('.')(initialState)).toEqual(resultState);
    });
});